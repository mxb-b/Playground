// Shots 6 and 7: the leap with a speed remap, and the beat-synced dance floor.
import { W, H, C, E, clamp, lerp, seg, text, rng } from './engine.js';
import { drawFront, drawProfile } from './penguin.js';
import { burst, ripple, chrome } from './fx.js';

const WATER = 740;
const LEAP_START = 1.0; // local time of the launch (t = 28.8)
const LEAP_END = 4.2; // local time of the entry (t = 32.0)
const LEAP_S = 0.85; // penguin scale for the leap

// Time remap: slow through the apex (q = 0.5), fast at launch and entry.
// Speed is 1 + 0.6 cos(2 pi q): 160% at launch, 40% at the apex.
const remap = (q) => q + (0.6 / (2 * Math.PI)) * Math.sin(2 * Math.PI * q);
const remapSpeed = (q) => 1 + 0.6 * Math.cos(2 * Math.PI * q);

// Physical path, parametrised by s in [0, 1]. Apex at s = 0.5.
const pathX = (s) => lerp(700, 1220, s);
const pathY = (s) => WATER - 4 * 330 * s * (1 - s);
const pathRot = (s) => lerp(-0.7, 1.4, s);

// Draw the leaping penguin at clip position q. Stretches along the velocity direction.
function drawLeapPenguin(ctx, q, alpha = 1) {
  const s = remap(q);
  const s2 = remap(Math.min(1, q + 0.01));
  const cx = pathX(s);
  const cy = pathY(s);
  const vx = pathX(s2) - cx;
  const vy = pathY(s2) - cy;
  const speed = Math.hypot(vx, vy) / 0.01;
  const ang = Math.atan2(vy, vx);
  const st = clamp(speed / 900);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(ang);
  ctx.scale(1 + 0.22 * st, 1 - 0.16 * st);
  ctx.rotate(-ang);
  drawProfile(ctx, {
    x: 0, y: 200 * LEAP_S, s: LEAP_S, rot: pathRot(s), pivotX: 0, pivotY: -200,
    flip: -0.9 + 0.5 * st, footLift: 0.6, look: 1, alpha, species: 'emperor',
  });
  ctx.restore();
}

function drawAurora(ctx, u) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const cols = ['rgba(61,255,181,0.20)', 'rgba(123,92,255,0.22)', 'rgba(61,255,181,0.14)'];
  for (let k = 0; k < 3; k++) {
    const grad = ctx.createLinearGradient(0, 80, 0, 560);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.5, cols[k]);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 80 + k * 50);
    for (let x = 0; x <= W; x += 20) {
      ctx.lineTo(x, 240 + k * 50 + Math.sin(x * 0.004 + u * 0.6 + k * 2.1) * 80 + Math.sin(x * 0.012 - u * 0.5) * 26);
    }
    ctx.lineTo(W, 560);
    ctx.lineTo(0, 560);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

const STARS = (() => {
  const r = rng(314);
  return Array.from({ length: 150 }, () => ({ x: r() * W, y: r() * 560, p: r() * 6.28, z: 0.6 + r() * 1.8 }));
})();

// Shot 6: the leap.
function drawLeap(ctx, t, s) {
  const u = t - s.start;
  const sky = ctx.createLinearGradient(0, 0, 0, WATER);
  sky.addColorStop(0, '#03060d');
  sky.addColorStop(1, '#0d2c40');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  for (const st of STARS) {
    ctx.globalAlpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(u * 3 + st.p));
    ctx.fillStyle = C.ice;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.z, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  drawAurora(ctx, u);

  // Water: a deep teal plane with a bright horizon.
  const water = ctx.createLinearGradient(0, WATER, 0, H);
  water.addColorStop(0, '#0b3144');
  water.addColorStop(1, '#020a12');
  ctx.fillStyle = water;
  ctx.fillRect(0, WATER, W, H - WATER);
  ctx.fillStyle = 'rgba(143,211,255,0.5)';
  ctx.fillRect(0, WATER - 1, W, 2);

  // Penguin reflection, mirrored across the waterline.
  const q = seg(u, LEAP_START, LEAP_END);
  if (q > 0 && q < 1) {
    ctx.save();
    ctx.translate(0, 2 * WATER);
    ctx.scale(1, -1);
    drawLeapPenguin(ctx, q, 0.16);
    ctx.restore();
    // Motion trail: copies at earlier clip positions, fading.
    for (let k = 1; k <= 4; k++) {
      const qk = q - k * 0.03;
      if (qk > 0) drawLeapPenguin(ctx, qk, 0.13 * (1 - k / 5));
    }
    drawLeapPenguin(ctx, q, 1);
  }

  // Splashes and ripples at launch and entry.
  const sx0 = pathX(0);
  const sx1 = pathX(1);
  burst(ctx, t, { x: sx0, y: WATER, t0: LEAP_START, n: 70, seed: 91, speed: 700, spread: Math.PI * 0.9, angle: -Math.PI / 2, g: 1300, life: 1.0, color: C.ice, size: 4 });
  burst(ctx, t, { x: sx1, y: WATER, t0: LEAP_END, n: 90, seed: 92, speed: 820, spread: Math.PI * 0.9, angle: -Math.PI / 2, g: 1300, life: 1.2, color: C.ice, size: 5 });
  ripple(ctx, { x: sx0, y: WATER, t: u, t0: LEAP_START, dur: 1.5, maxR: 300, color: C.frost, width: 5 });
  ripple(ctx, { x: sx1, y: WATER, t: u, t0: LEAP_END, dur: 1.8, maxR: 420, color: C.frost, width: 6 });
  ripple(ctx, { x: sx1, y: WATER, t: u, t0: LEAP_END + 0.35, dur: 1.8, maxR: 260, color: C.aurora1, width: 4 });

  // Speed readout tied to the remap.
  const inLeap = q > 0 && q < 1;
  const speedNow = inLeap ? remapSpeed(q) : 1;
  text(ctx, 'LEAP', 84, 300, { font: "400 200px 'Anton'", color: C.snow, alpha: clamp(u * 3) });
  text(ctx, 'TIME REMAP', 1440, 300, { font: "700 22px 'JetBrains Mono'", color: C.frost, tracking: 3, alpha: clamp(u * 2) });
  text(ctx, `SPEED ${String(Math.round(speedNow * 100)).padStart(3, '0')}%`, 1440, 360, {
    font: "700 56px 'JetBrains Mono'", color: inLeap && speedNow < 0.6 ? C.beak : C.snow, alpha: clamp(u * 2),
  });
  ctx.fillStyle = 'rgba(143,211,255,0.2)';
  ctx.fillRect(1440, 392, 400, 14);
  ctx.fillStyle = inLeap && speedNow < 0.6 ? C.beak : C.frost;
  ctx.fillRect(1440, 392, 400 * clamp(speedNow / 1.6), 14);
  text(ctx, 'slow at the apex, fast in and out', 1440, 452, {
    font: "italic 400 32px 'Instrument Serif'", color: C.ice, alpha: clamp(u * 2),
  });
  chrome(ctx, t, { label: 'LEAP', shot: 6 });
}

// Shot 7: dance floor. Every hop is locked to the global beat (120 BPM, a beat every 0.5 s).
const DANCERS = [
  { species: 'emperor', bow: true },
  { species: 'king' },
  { species: 'adelie' },
  { species: 'gentoo' },
  { species: 'rockhopper' },
];

function drawDance(ctx, t, s) {
  const u = t - s.start;
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#060b18');
  bg.addColorStop(0.55, '#0c1d36');
  bg.addColorStop(1, '#14335a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Perspective floor grid, scrolling toward the viewer on every beat.
  const horizon = 640;
  ctx.save();
  ctx.strokeStyle = 'rgba(143,211,255,0.28)';
  ctx.lineWidth = 2;
  const beatScroll = (2 * t) % 1;
  for (let k = 0; k < 10; k++) {
    const f = (k * 0.1 + beatScroll * 0.1) % 1;
    const y = horizon + (H - horizon) * f * f;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  for (let j = -6; j <= 18; j++) {
    const xb = W / 2 + (j - 6) * 260;
    ctx.beginPath();
    ctx.moveTo(W / 2 + (j - 6) * 20, horizon);
    ctx.lineTo(xb, H);
    ctx.stroke();
  }
  ctx.restore();

  // Beat flash: a bright pulse on each downbeat that decays within the beat.
  const beatFrac = (2 * t) % 1;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = `rgba(143,211,255,${0.22 * Math.pow(1 - beatFrac, 4)})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Five penguins, each offset by 1/8 beat from its neighbour: a canon of hops.
  DANCERS.forEach((d, i) => {
    const phase = 2 * t + i * 0.125;
    const hop = Math.abs(Math.sin(Math.PI * phase));
    const sway = 0.12 * Math.sin(Math.PI * phase);
    const x = 330 + i * 320;
    const feetY = 880 - hop * 70;
    drawFront(ctx, {
      x, y: feetY, s: 0.9, species: d.species, bow: !!d.bow,
      sx: 1 + 0.06 * (1 - hop), sy: 1 - 0.06 * (1 - hop), rock: sway,
      flipL: 0.2 + 0.7 * hop, flipR: 0.2 + 0.7 * (1 - hop),
      footL: 0.5 * hop, footR: 0.5 * (1 - hop), look: 0.6 * Math.sin(Math.PI * phase),
    });
  });

  // Beat counter in the corner.
  const beatNum = (Math.floor(2 * t) % 4) + 1;
  for (let b = 1; b <= 4; b++) {
    text(ctx, String(b), 1500 + (b - 1) * 90, 180, {
      font: "400 120px 'Anton'", color: b === beatNum ? C.gold : 'rgba(143,211,255,0.25)', align: 'center',
    });
  }
  text(ctx, 'DANCE FLOOR', 84, 300, { font: "400 170px 'Anton'", color: C.snow, alpha: clamp(u * 3) });
  text(ctx, '120 bpm  ·  one hop per beat  ·  each penguin offset by 1/8 beat', 88, 356, {
    font: "700 21px 'JetBrains Mono'", color: C.frost, tracking: 2, alpha: clamp((u - 0.3) * 2),
  });
  chrome(ctx, t, { label: 'DANCE', shot: 7 });
}

export const SHOTS_C = [
  { id: 'leap', start: 27.8, end: 34.0, draw: drawLeap, tIn: 'slice' },
  { id: 'dance', start: 33.7, end: 40.0, draw: drawDance, tIn: 'wipe' },
];
