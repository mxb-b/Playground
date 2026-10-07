// Shots 8 and 9: the edit (a timeline meta card) and the finale (the bow, the lockup and credits).
import { W, H, C, E, clamp, lerp, seg, spring, text, rng } from './engine.js';
import { drawFront, drawShadow } from './penguin.js';
import { snowfield, chrome } from './fx.js';

const CLIPS = [
  { name: 'TITLE', a: 0, b: 4, col: C.snow },
  { name: 'WADDLE', a: 3.7, b: 10, col: C.frost },
  { name: 'TOBOGGAN', a: 9.7, b: 14, col: C.gold },
  { name: 'CAST', a: 13.8, b: 21, col: C.beak },
  { name: 'HUDDLE', a: 20.8, b: 28, col: C.frost },
  { name: 'LEAP', a: 27.8, b: 34, col: C.aurora1 },
  { name: 'DANCE', a: 33.7, b: 40, col: C.gold },
  { name: 'EDIT', a: 39.7, b: 44, col: C.beak },
  { name: 'FINALE', a: 43.7, b: 52, col: C.snow },
];
const WIN = 12; // seconds visible on the timeline
const TL_X = 84;
const TL_W = 1752;

// Shot 8: the edit. A scrolling NLE timeline with the reel's own clips and a waveform that pulses on the beat.
function drawEdit(ctx, t, s) {
  const u = t - s.start;
  ctx.fillStyle = '#101318';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.75, 260, 40, W * 0.75, 260, 780);
  glow.addColorStop(0, 'rgba(255,154,60,0.10)');
  glow.addColorStop(1, 'rgba(255,154,60,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  text(ctx, 'THE EDIT', 84, 240, { font: "400 150px 'Anton'", color: C.snow, alpha: clamp(u * 3) });
  const lines = [
    '60 fps  ·  1920 × 1080  ·  4 sub-samples per frame, 360° shutter',
    'every frame is a pure function of time t, rendered out of order',
    'eases: outExpo · outBack · inOutCubic · spring 2.4 Hz, ζ 0.5',
  ];
  lines.forEach((l, i) => {
    text(ctx, l, 88, 300 + i * 40, { font: "700 21px 'JetBrains Mono'", color: C.frost, tracking: 1, alpha: clamp((u - 0.2 - i * 0.15) * 3) });
  });

  // Ease curve with a live dot.
  const ex = 1380;
  const ey = 170;
  const ew = 420;
  const eh = 200;
  ctx.strokeStyle = 'rgba(143,211,255,0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(ex, ey, ew, eh);
  ctx.strokeStyle = C.beak;
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let k = 0; k <= 80; k++) {
    const p = k / 80;
    const x = ex + p * ew;
    const y = ey + eh - E.outExpo(p) * eh;
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  const pp = seg(u, 0, 3.6);
  text(ctx, 'EASE  outExpo', ex, ey - 16, { font: "700 18px 'JetBrains Mono'", color: C.frost, tracking: 2 });
  ctx.fillStyle = C.gold;
  ctx.beginPath();
  ctx.arc(ex + pp * ew, ey + eh - E.outExpo(pp) * eh, 9, 0, Math.PI * 2);
  ctx.fill();

  // Timeline panel with a window of WIN seconds centred on the playhead.
  const top = 560;
  const winStart = t - WIN / 2;
  const px = (x) => TL_X + ((x - winStart) / WIN) * TL_W;
  ctx.fillStyle = '#171b22';
  ctx.fillRect(TL_X - 20, top - 30, TL_W + 40, 440);
  ctx.strokeStyle = 'rgba(143,211,255,0.2)';
  ctx.lineWidth = 1;
  for (let sec = Math.ceil(winStart); sec <= winStart + WIN; sec++) {
    const x = px(sec);
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, top + 14);
    ctx.stroke();
    if (sec % 4 === 0) {
      const mm = Math.floor(sec / 60);
      const ss = String(sec % 60).padStart(2, '0');
      text(ctx, `00:${String(mm).padStart(2, '0')}:${ss}:00`, x + 6, top + 4, { font: "600 16px 'JetBrains Mono'", color: 'rgba(143,211,255,0.65)' });
    }
  }
  for (const c of CLIPS) {
    const x0 = px(c.a);
    const x1 = px(c.b);
    if (x1 < TL_X - 10 || x0 > TL_X + TL_W + 10) continue;
    const grow = clamp((u - (c.a - 39.7)) / 0.4);
    ctx.save();
    ctx.globalAlpha = 0.9 * grow;
    ctx.fillStyle = c.col;
    ctx.beginPath();
    ctx.roundRect(x0, top + 30, x1 - x0 - 4, 70, 8);
    ctx.fill();
    ctx.restore();
    text(ctx, c.name, Math.max(x0, TL_X) + 12, top + 72, { font: "700 19px 'JetBrains Mono'", color: '#0b0d12', tracking: 2, alpha: grow });
  }

  // Audio track: bars pulse on each beat (120 BPM).
  const audioTop = top + 124;
  for (let k = 0; k < 292; k++) {
    const tt = winStart + (k / 292) * WIN;
    const beatFrac = (tt * 2) % 1;
    const h = 14 + 80 * (0.25 + 0.75 * Math.exp(-beatFrac * 7)) * (0.6 + 0.4 * Math.abs(Math.sin(tt * 13.1)));
    ctx.fillStyle = 'rgba(143,211,255,0.55)';
    ctx.fillRect(TL_X + (k / 292) * TL_W, audioTop + 60 - h / 2, 4, h);
  }
  // Splash cue markers on the audio track.
  for (const cue of [28.8, 32.0]) {
    const x = px(cue);
    ctx.fillStyle = C.aurora1;
    ctx.save();
    ctx.translate(x, audioTop - 20);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-7, -7, 14, 14);
    ctx.restore();
  }

  // Playhead.
  ctx.strokeStyle = C.beak;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(TL_X + TL_W / 2, top - 20);
  ctx.lineTo(TL_X + TL_W / 2, top + 240);
  ctx.stroke();

  chrome(ctx, t, { label: 'EDIT', shot: 8, color: C.frost });
}

// Shot 9: the finale. The hero bows, the camera pulls back, the lockup lands, and the credits roll.
function drawFinale(ctx, t, s) {
  const u = t - s.start;
  const bg = ctx.createRadialGradient(W * 0.3, H * 0.45, 80, W / 2, H / 2, W * 0.8);
  bg.addColorStop(0, '#15284a');
  bg.addColorStop(1, '#03050b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  snowfield(ctx, t, { count: 420, seed: 33, speed: 0.7, alpha: 0.9 });

  // Camera: pulls back from 1.7x to 1.0x over the first 2.6 s.
  const zoom = lerp(1.7, 1.0, E.inOutCubic(seg(u, 0, 2.6)));
  ctx.save();
  ctx.translate(520, 720);
  ctx.scale(zoom, zoom);
  ctx.translate(-520, -720);

  // Bow: lean forward and squash between 2.8 s and 4.6 s, flippers out, then a clap cycle.
  const bow = E.inOutCubic(seg(u, 2.8, 3.6)) - E.inOutCubic(seg(u, 4.0, 4.6));
  const clap = u > 4.8 && u < 5.8 ? 0.5 + 0.4 * Math.sin((u - 4.8) * Math.PI * 12) : 0;
  const flip = 0.25 + 0.7 * bow + clap;
  drawShadow(ctx, 520, 900, 220, 0.55);
  drawFront(ctx, {
    x: 520, y: 900, s: 1.05, species: 'emperor', bow: true,
    rock: 0.5 * bow, sy: 1 - 0.07 * bow, sx: 1 + 0.04 * bow,
    flipL: flip, flipR: flip, look: 0.5 + 0.5 * Math.sin(u * 0.8),
    blink: u % 3.1 < 0.12 ? 1 : 0,
  });
  ctx.restore();

  // Lockup enters from the right, then the credits roll underneath.
  const lock = spring(u - 4.8, 2.0, 0.6);
  const lx = lerp(1240, 1140, clamp(lock));
  ctx.save();
  ctx.globalAlpha = clamp(lock);
  text(ctx, 'BLACK TIE', lx, 470, { font: "400 150px 'Anton'", color: C.snow });
  text(ctx, 'ON ICE', lx, 620, { font: "italic 400 150px 'Instrument Serif'", color: C.frost });
  ctx.fillStyle = C.beak;
  ctx.fillRect(lx, 648, 520 * clamp(lock), 4);
  ctx.restore();

  const credits = [
    ['MOTION DESIGN + ANIMATION', 'Claude'],
    ['SOUND', 'NumPy synthesis, FFmpeg mix'],
    ['RENDER', 'Chromium · Playwright · FFmpeg'],
    ['TYPE', 'Anton, Instrument Serif, Inter, JetBrains Mono (OFL)'],
  ];
  credits.forEach(([k, v], i) => {
    const a = clamp((u - 6.0 - i * 0.25) * 2.5);
    text(ctx, k, lx, 730 + i * 74, { font: "700 19px 'JetBrains Mono'", color: C.gold, tracking: 3, alpha: a });
    text(ctx, v, lx, 764 + i * 74, { font: "600 25px 'Inter'", color: C.ice, alpha: a });
  });

  // Fade to ink over the final 0.6 s.
  const fade = seg(u, 7.7, 8.3);
  if (fade > 0) {
    ctx.fillStyle = `rgba(3,5,11,${fade})`;
    ctx.fillRect(0, 0, W, H);
  }
  chrome(ctx, t, { label: 'FINALE', shot: 9 });
}

export const SHOTS_D = [
  { id: 'edit', start: 39.7, end: 44.0, draw: drawEdit, tIn: 'whip' },
  { id: 'finale', start: 43.7, end: 52.0, draw: drawFinale, tIn: 'dissolve' },
];
