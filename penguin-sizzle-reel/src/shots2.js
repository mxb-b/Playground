// Shots 4 and 5: the species cast montage and the emperor huddle.
import { W, H, C, E, clamp, text, drawTransition } from './engine.js';
import { drawFront, drawShadow } from './penguin.js';
import { iceLayer, chrome } from './fx.js';

const CAST = [
  { key: 'emperor', label: 'EMPEROR', latin: 'Aptenodytes forsteri', note: 'The tallest of all. Breeds through the Antarctic winter.', bg: ['#0c2442', '#2a5c8f'] },
  { key: 'king', label: 'KING', latin: 'Aptenodytes patagonicus', note: 'Second largest. Gold ear patches and a bright neck.', bg: ['#2a1a3d', '#6a3f7a'] },
  { key: 'adelie', label: 'ADÉLIE', latin: 'Pygoscelis adeliae', note: 'A white eye ring. Nests on stony ground.', bg: ['#0b3434', '#1f7a6e'] },
  { key: 'gentoo', label: 'GENTOO', latin: 'Pygoscelis papua', note: 'A white head band. Among the fastest swimmers.', bg: ['#3a2610', '#8a5a22'] },
  { key: 'chinstrap', label: 'CHINSTRAP', latin: 'Pygoscelis antarcticus', note: 'One thin black line under the chin.', bg: ['#1a2446', '#3a4f8f'] },
  { key: 'macaroni', label: 'MACARONI', latin: 'Eudyptes chrysolophus', note: 'Golden plumes and a bold brow.', bg: ['#3a1220', '#8a2e44'] },
  { key: 'rockhopper', label: 'ROCKHOPPER', latin: 'Eudyptes chrysocome', note: 'A spiky yellow crest and red eyes.', bg: ['#0f2f45', '#21708f'] },
];

// One transition per cut, cycling through the engine's transition set.
const KINDS = ['whip', 'slice', 'zoom', 'wipe', 'iris', 'slice'];
const CUT_HALF = 0.125; // transition length is 0.25 s, centred on each cut
const CUT0 = 0.2; // first cut lands 0.2 s into the shot

function makeLayer() {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  return c;
}
const layerA = makeLayer();
const layerB = makeLayer();
const ctxA = layerA.getContext('2d');
const ctxB = layerB.getContext('2d');

// One species card: background, a springing penguin, and the name and notes.
function drawCard(ctx, card, idx, age) {
  const g = ctx.createRadialGradient(1380, 520, 60, 1200, 540, 1200);
  g.addColorStop(0, card.bg[1]);
  g.addColorStop(1, card.bg[0]);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  const spot = ctx.createRadialGradient(1380, 300, 10, 1380, 300, 700);
  spot.addColorStop(0, 'rgba(255,255,255,0.22)');
  spot.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, W, H);

  const enter = E.outBack(clamp(age / 0.5));
  const a = clamp(age * 8);
  const cycle = Math.PI * 2 * age;
  drawShadow(ctx, 1380, 960, 300, 0.5 * a);
  drawFront(ctx, {
    x: 1380, y: 960 + (1 - enter) * 160, s: 1.32, species: card.key, alpha: a,
    rock: Math.sin(age * 5.2) * 0.035,
    footL: Math.max(0, Math.sin(cycle)) * 0.6,
    footR: Math.max(0, -Math.sin(cycle)) * 0.6,
    flipL: 0.35 + 0.22 * Math.sin(cycle + Math.PI),
    flipR: 0.35 + 0.22 * Math.sin(cycle),
    blink: age % 3.4 < 0.12 ? 1 : 0,
    look: 0.8 * Math.sin(age * 1.1),
  });

  // Fit long names (ROCKHOPPER) so they never run into the penguin.
  ctx.font = "400 180px 'Anton'";
  const nameSize = Math.min(180, (180 * 860) / ctx.measureText(card.label).width);
  text(ctx, card.label, 96, 560, { font: `400 ${nameSize}px 'Anton'`, color: C.snow, alpha: a });
  text(ctx, card.latin, 100, 640, { font: "italic 400 58px 'Instrument Serif'", color: C.frost, alpha: a });
  text(ctx, card.note, 100, 716, { font: "600 30px 'Inter'", color: C.ice, alpha: clamp((age - 0.2) * 3) });
  text(ctx, `${String(idx + 1).padStart(2, '0')} / 07`, 100, 868, { font: "700 24px 'JetBrains Mono'", color: C.gold, tracking: 3, alpha: a });
}

// Shot 4: cast montage. One species per beat pair (1 s), cut on the beat.
function drawCast(ctx, t, s) {
  const u = t - s.start;
  let cut = -1;
  for (let k = 1; k < CAST.length; k++) {
    if (Math.abs(u - (CUT0 + k)) < CUT_HALF) cut = k;
  }
  if (cut > 0) {
    const p = clamp((u - (CUT0 + cut - CUT_HALF)) / (2 * CUT_HALF));
    drawCard(ctxA, CAST[cut - 1], cut - 1, u - (CUT0 + cut - 1));
    // The incoming card starts its entrance just before the cut, so it is already visible mid-transition.
    drawCard(ctxB, CAST[cut], cut, Math.max(0, u - (CUT0 + cut) + 0.2));
    drawTransition(ctx, layerA, layerB, p, KINDS[cut - 1]);
  } else {
    const idx = clamp(Math.floor(u - CUT0), 0, CAST.length - 1);
    // The first card springs in from the shot's opening frame, so the zoom lands on a penguin, not an empty card.
    drawCard(ctx, CAST[idx], idx, idx === 0 ? u : u - (CUT0 + idx));
  }

  // Names accumulate along the bottom as each species is introduced.
  const idxNow = clamp(Math.floor(u - CUT0), 0, CAST.length - 1);
  const names = CAST.slice(0, idxNow + 1).map((c) => c.label).join('   ·   ');
  text(ctx, names, 100, 1000, { font: "800 26px 'Inter'", color: C.frost, tracking: 2, alpha: clamp(u * 2) });
  chrome(ctx, t, { label: 'CAST', shot: 4 });
}

// Huddle: 64 emperors on a Vogel spiral. The flipper wave ripples outward from the centre.
const HUDDLE = (() => {
  const out = [];
  const N = 64;
  for (let i = 0; i < N; i++) {
    const rr = Math.sqrt((i + 0.5) / N);
    const th = i * 2.39996;
    const x = rr * Math.cos(th) * 720;
    const y = rr * Math.sin(th) * 260;
    const depth = (y / 260 + 1) / 2;
    out.push({ x, y, phase: rr * 2.4, s: 0.34 + 0.16 * depth });
  }
  return out.sort((a, b) => a.y - b.y);
})();

function drawHuddle(ctx, t, s) {
  const u = t - s.start;
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#060d1c');
  bg.addColorStop(0.6, '#143257');
  bg.addColorStop(1, '#2d6393');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Aurora ribbons, additive.
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) {
    const grad = ctx.createLinearGradient(0, 120, 0, 520);
    grad.addColorStop(0, 'rgba(61,255,181,0)');
    grad.addColorStop(0.5, k === 1 ? 'rgba(123,92,255,0.24)' : 'rgba(61,255,181,0.18)');
    grad.addColorStop(1, 'rgba(61,255,181,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 120 + k * 40);
    for (let x = 0; x <= W; x += 20) {
      ctx.lineTo(x, 260 + k * 40 + Math.sin(x * 0.0045 + u * 0.7 + k * 1.7) * 70 + Math.sin(x * 0.011 - u * 0.4) * 25);
    }
    ctx.lineTo(W, 520);
    ctx.lineTo(0, 520);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  const z = 1 + 0.07 * (u / 7);
  ctx.translate(W / 2, 640);
  ctx.scale(z, z);
  ctx.translate(-W / 2, -640);
  iceLayer(ctx, { y: 790, amp: 16, freq: 0.002, seed: 4, offset: 0, top: '#2c5f8e', alpha: 0.9 });
  for (const p of HUDDLE) {
    const fx = W / 2 + p.x;
    const fy = 820 + p.y * 0.62;
    const w = Math.max(0, Math.sin(2 * Math.PI * 0.9 * u - p.phase));
    drawFront(ctx, {
      x: fx, y: fy - w * 6, s: p.s * 1.25, species: 'emperor',
      flipL: 0.2 + 0.5 * w, flipR: 0.2 + 0.5 * w,
      rock: 0.03 * Math.sin(2 * Math.PI * 0.9 * u - p.phase),
      look: 0.2 * Math.sin(u + p.phase),
    });
  }
  ctx.restore();

  text(ctx, 'HUDDLE', 84, 300, { font: "400 200px 'Anton'", color: C.snow, alpha: clamp(u * 2) });
  text(ctx, '64 emperors  ·  one wave  ·  ripples out from the centre', 88, 362, {
    font: "700 21px 'JetBrains Mono'", color: C.frost, tracking: 2, alpha: clamp((u - 0.3) * 2),
  });
  chrome(ctx, t, { label: 'HUDDLE', shot: 5 });
}

export const SHOTS_B = [
  { id: 'cast', start: 13.8, end: 21.0, draw: drawCast, tIn: 'zoom' },
  { id: 'huddle', start: 20.8, end: 28.0, draw: drawHuddle, tIn: 'iris' },
];
