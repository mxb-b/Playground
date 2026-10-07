// Shots 1 to 3: title, waddle cycle with graph editor, belly-slide toboggan.
import { W, H, C, E, clamp, lerp, seg, spring, text } from './engine.js';
import { drawFront, drawProfile, drawShadow } from './penguin.js';
import { snowfield, iceLayer, burst, chrome, graphPanel } from './fx.js';

// Waddle gait: one full cycle per second (two steps), one step per beat at 120 BPM.
export function gait(t) {
  const ph = Math.PI * 2 * t;
  const s = Math.sin(ph);
  return {
    rock: -s * 0.085,
    bob: -Math.abs(s) * 14,
    footL: Math.max(0, s),
    footR: Math.max(0, -s),
    flipL: 0.3 + 0.22 * Math.sin(ph + Math.PI),
    flipR: 0.3 + 0.22 * Math.sin(ph),
  };
}

// Kinetic type: each glyph springs up from below on its own delay.
function kinetic(ctx, str, cx, y, { font, color, tracking = 0, t, t0 = 0, stagger = 0.05, rise = 120, align = 'center' }) {
  ctx.save();
  ctx.font = font;
  ctx.letterSpacing = '0px';
  const chars = [...str];
  const widths = chars.map((ch) => ctx.measureText(ch).width + tracking);
  const total = widths.reduce((a, b) => a + b, 0) - tracking;
  let x = align === 'left' ? cx : cx - total / 2;
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  chars.forEach((ch, i) => {
    const p = spring(t - t0 - i * stagger, 2.6, 0.45);
    ctx.globalAlpha = clamp(p * 1.3);
    ctx.fillText(ch, x, y + (1 - p) * rise);
    x += widths[i];
  });
  ctx.restore();
}

// Shot 1: title.
function drawTitle(ctx, t, s) {
  const u = t - s.start;
  const bg = ctx.createRadialGradient(W / 2, H * 0.42, 60, W / 2, H / 2, W * 0.7);
  bg.addColorStop(0, '#13264a');
  bg.addColorStop(1, '#03050b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  iceLayer(ctx, { y: 900, amp: 26, freq: 0.0022, seed: 7, offset: u * 40, top: '#15294a', alpha: 0.9 });
  snowfield(ctx, t, { count: 520, seed: 9, speed: 0.6, alpha: 0.9 });

  kinetic(ctx, 'BLACK TIE', W / 2, 500, { font: "400 270px 'Anton'", color: C.snow, tracking: 6, t: u, t0: 0.35, stagger: 0.05 });

  const rule = spring(u - 1.2, 2.2, 0.8);
  ctx.save();
  ctx.strokeStyle = C.beak;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 380 * rule, 572);
  ctx.lineTo(W / 2 + 380 * rule, 572);
  ctx.stroke();
  ctx.restore();

  const wipe = E.outExpo(seg(u, 1.5, 2.6));
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 580, W * wipe, 260);
  ctx.clip();
  text(ctx, 'ON ICE', W / 2, 740, { font: "italic 400 170px 'Instrument Serif'", color: C.frost, align: 'center' });
  ctx.restore();

  text(ctx, 'a motion reel about penguins, in black tie', W / 2, 860, {
    font: "700 22px 'JetBrains Mono'", color: C.snow, align: 'center', tracking: 3, alpha: clamp((u - 2.4) * 2),
  });
  chrome(ctx, t, { label: 'TITLE', shot: 1 });
}

const WADDLE_X = 560;
const WADDLE_FEET = 938;
const VEL = 120; // camera travel speed in px per second

// Shot 2: waddle cycle with a live graph editor.
function drawWaddle(ctx, t, s) {
  const u = t - s.start;
  const sky = ctx.createLinearGradient(0, 0, 0, 760);
  sky.addColorStop(0, '#e7f6ff');
  sky.addColorStop(1, '#a9d9f5');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  const sun = ctx.createRadialGradient(1440, 220, 10, 1440, 220, 560);
  sun.addColorStop(0, 'rgba(255,255,255,0.95)');
  sun.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, W, H);

  iceLayer(ctx, { y: 700, amp: 26, freq: 0.003, seed: 11, offset: -u * VEL * 0.22, top: '#c5e7fb' });
  iceLayer(ctx, { y: 800, amp: 34, freq: 0.0021, seed: 23, offset: -u * VEL * 0.55, top: '#98cdf0' });
  iceLayer(ctx, { y: 935, amp: 22, freq: 0.0016, seed: 37, offset: -u * VEL, top: '#6aa8dc' });

  // Footprints trail behind the penguin: world position = tau * VEL, screen = camera-relative.
  ctx.save();
  ctx.fillStyle = 'rgba(30,80,125,0.5)';
  for (let i = 0; i * 0.5 < u; i++) {
    const tau = i * 0.5;
    const sx = WADDLE_X + (tau - u) * VEL;
    if (sx < -40) continue;
    const side = i % 2 === 0 ? -38 : 38;
    ctx.beginPath();
    ctx.ellipse(sx + side * 0.2, WADDLE_FEET + 6, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  snowfield(ctx, t, { count: 260, seed: 5, speed: 0.5, alpha: 0.8 });

  const g = gait(u);
  drawShadow(ctx, WADDLE_X, WADDLE_FEET + 4, 170, 0.45);
  drawFront(ctx, {
    x: WADDLE_X, y: WADDLE_FEET + g.bob * 0.6, s: 1.05, species: 'emperor', bow: true,
    rock: g.rock, footL: g.footL, footR: g.footR, flipL: g.flipL, flipR: g.flipR, look: 0.25,
  });

  text(ctx, 'WADDLE', 84, 240, { font: "400 170px 'Anton'", color: C.tux });
  text(ctx, 'one step per beat  ·  rock ±5°  ·  bob 14 px  ·  ease in-out sine', 88, 300, {
    font: "700 21px 'JetBrains Mono'", color: '#17406a', tracking: 1, alpha: clamp(u * 2),
  });

  const curves = [
    { label: 'ROTATE', color: C.frost, fn: (tt) => gait(tt).rock / 0.085, readout: (v) => `${(v * 4.9).toFixed(1)}°`, keys: { period: 0.5, phase: 0.25 } },
    { label: 'BOUNCE', color: C.gold, fn: (tt) => (gait(tt).bob / 14) * 2 + 1, readout: (v) => `${Math.abs((v - 1) * 7).toFixed(1)} px` },
  ];
  graphPanel(ctx, u, { x: 1270, y: 150, w: 580, h: 600, span: 3.0, curves, alpha: clamp(u * 3) });
  chrome(ctx, t, { label: 'WADDLE CYCLE', shot: 2, color: '#17406a' });
}

// Shot 3: belly-slide toboggan down a slope.
const SLOPE = 0.33;
const slopeY = (x) => 330 + (x + 80) * SLOPE;
const SLOPE_ANGLE = Math.atan(SLOPE);

function drawSlide(ctx, t, s) {
  const u = t - s.start;
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#071426');
  sky.addColorStop(0.5, '#183e66');
  sky.addColorStop(1, '#2d6b9c');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Camera shake on impact.
  const shake = u > 2.9 ? Math.sin(u * 90) * 14 * Math.exp(-(u - 2.9) * 6) : 0;
  ctx.save();
  ctx.translate(shake, shake * 0.4);

  ctx.beginPath();
  ctx.moveTo(-60, slopeY(-60));
  ctx.lineTo(W + 60, slopeY(W + 60));
  ctx.lineTo(W + 60, H + 60);
  ctx.lineTo(-60, H + 60);
  ctx.closePath();
  const ice = ctx.createLinearGradient(0, 330, 0, H);
  ice.addColorStop(0, '#f2fbff');
  ice.addColorStop(0.25, '#bfe4fb');
  ice.addColorStop(1, '#2d6aa0');
  ctx.fillStyle = ice;
  ctx.fill();

  snowfield(ctx, t, { count: 380, seed: 21, speed: 1.6, wind: 0.6, alpha: 0.9 });

  // Penguin path: accelerates down the slope (ease in), impacts at u = 2.9.
  const k = E.inCubic(seg(u, 0.25, 2.9));
  const xs = lerp(-160, 1480, k);
  const surf = slopeY(xs);
  const nx = Math.sin(SLOPE_ANGLE);
  const ny = -Math.cos(SLOPE_ANGLE);
  const slideRot = Math.PI / 2 + SLOPE_ANGLE;
  // Belly contact sits at the chest, which is 124 units from the body pivot along the normal.
  const slidePivot = { x: xs + nx * 124, y: surf + ny * 124 };

  // Speed lines, parallel to the slope.
  ctx.save();
  ctx.translate(xs, surf);
  ctx.rotate(SLOPE_ANGLE);
  ctx.strokeStyle = C.frost;
  ctx.lineCap = 'round';
  for (let i = 0; i < 26 && u < 2.9; i++) {
    const lane = -180 + ((i * 97) % 260);
    const len = 160 + (i % 5) * 70;
    const x0 = 1100 - ((u * 900 + i * 210) % 1500);
    ctx.globalAlpha = 0.45 * clamp(u * 3) * (1 - u / 3);
    ctx.lineWidth = 2 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(x0, lane);
    ctx.lineTo(x0 + len, lane);
    ctx.stroke();
  }
  ctx.restore();

  // Spray from the belly while sliding.
  if (u < 3.0) {
    for (let j = 0; j * 0.05 < u; j++) {
      burst(ctx, t, {
        x: slidePivot.x - nx * 40, y: slidePivot.y - ny * 40, t0: j * 0.05, n: 6, seed: 40 + j,
        speed: 240, spread: 1.4, angle: -Math.PI / 2 - SLOPE_ANGLE + Math.PI, g: 900, life: 0.55, color: C.snow, size: 3,
      });
    }
  }

  // Impact: radial cracks and a big spray.
  if (u > 2.9) {
    const ix = 1480;
    const iy = slopeY(ix);
    const grow = E.outCubic(seg(u, 2.9, 3.5));
    ctx.save();
    ctx.strokeStyle = C.snow;
    ctx.lineWidth = 3;
    ctx.globalAlpha = clamp(1 - (u - 3.5) * 1.5, 0, 1);
    for (let i = 0; i < 14; i++) {
      const a = -Math.PI + (i / 13) * Math.PI;
      const L = (120 + (i % 3) * 80) * grow;
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.lineTo(ix + Math.cos(a) * L, iy + Math.sin(a) * L * 0.5);
      ctx.stroke();
    }
    ctx.restore();
    burst(ctx, t, { x: ix, y: iy, t0: 2.92, n: 90, seed: 77, speed: 820, spread: Math.PI, angle: -Math.PI / 2, g: 1400, life: 1.1, color: C.snow, size: 5 });
  }

  // Penguin: slide pose until impact, then a tumble that settles upright on its feet.
  let pose;
  if (u <= 2.9) {
    pose = { x: slidePivot.x, y: slidePivot.y + 200, rot: slideRot, pivotX: 0, pivotY: -200, flip: 1.25, footLift: 0.3, look: 1.2, species: 'emperor' };
  } else {
    const r = E.outBack(seg(u, 3.0, 4.0));
    const landX = 1480;
    const landY = slopeY(landX) - 200;
    const px = lerp(slidePivot.x, landX, r);
    const py = lerp(slidePivot.y, landY, r);
    const rot = lerp(slideRot, 0, r) + Math.sin(u * 14) * 0.3 * (1 - r);
    pose = { x: px, y: py + 200, rot, pivotX: 0, pivotY: -200, flip: lerp(1.25, 0.3, r), footLift: 0, look: 1.2, species: 'emperor' };
  }
  drawProfile(ctx, pose);
  ctx.restore();

  kinetic(ctx, 'BELLY SLIDE', 84, 236, { font: "400 150px 'Anton'", color: C.snow, t: u, t0: 0.1, stagger: 0.035, rise: 60, align: 'left' });
  text(ctx, 'anticipation  ·  launch  ·  impact  ·  recovery', 88, 292, {
    font: "700 22px 'JetBrains Mono'", color: C.frost, tracking: 2, alpha: clamp((u - 0.4) * 2),
  });
  chrome(ctx, t, { label: 'TOBOGGAN', shot: 3 });
}

export const SHOTS_A = [
  { id: 'title', start: 0.0, end: 4.0, draw: drawTitle, tIn: 'cut' },
  { id: 'waddle', start: 3.7, end: 10.0, draw: drawWaddle, tIn: 'wipe' },
  { id: 'slide', start: 9.7, end: 14.0, draw: drawSlide, tIn: 'whip' },
];
