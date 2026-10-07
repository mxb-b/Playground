// Deterministic scene engine.
// Every frame is a pure function of time t: no state carries between calls,
// so frames can be rendered out of order, in parallel, or as motion-blur sub-samples.

export const W = 1920;
export const H = 1080;
export const FPS = 60;
export const BPM = 120;
export const BEAT = 60 / BPM; // 0.5 s
export const BAR = BEAT * 4; // 2 s

export const C = {
  ink: '#060912',
  night: '#0c1426',
  glacier: '#1b3a5c',
  frost: '#8fd3ff',
  ice: '#e6f6ff',
  snow: '#f7fbff',
  tux: '#0e1116',
  beak: '#ff9a3c',
  gold: '#ffd23f',
  aurora1: '#3dffb5',
  aurora2: '#7b5cff',
  red: '#ff4d5e',
};

// mulberry32: small, fast, seedable PRNG.
export function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;
export const seg = (t, a, b) => clamp((t - a) / (b - a));

// Easing curves (named after their After Effects equivalents).
export const E = {
  linear: (p) => p,
  inCubic: (p) => p * p * p,
  outCubic: (p) => 1 - Math.pow(1 - p, 3),
  inOutCubic: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  outExpo: (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  inOutSine: (p) => -(Math.cos(Math.PI * p) - 1) / 2,
  outBack: (p) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  },
};

// Analytic damped-spring step response, 0 to 1. f = frequency in Hz, z = damping ratio.
// Pure function of elapsed time, so it can be sampled at any frame.
export function spring(t, f = 2.4, z = 0.5) {
  if (t <= 0) return 0;
  const w = 2 * Math.PI * f;
  if (z < 1) {
    const wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-w * t) * (1 + w * t);
}

// Smooth 1D value noise in [-1, 1].
export function noise1(x, seed = 0) {
  const i = Math.floor(x);
  const f = x - i;
  const hash = (n) => rng((n * 374761393 + seed * 668265263) >>> 0)();
  const u = f * f * (3 - 2 * f);
  return lerp(hash(i), hash(i + 1), u) * 2 - 1;
}

export function fillBg(ctx, color) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// Text with tracking, alpha and alignment in one call.
export function text(ctx, str, x, y, { font, color = C.snow, align = 'left', baseline = 'alphabetic', tracking = 0, alpha = 1, blur = 0 } = {}) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.globalAlpha *= alpha;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.letterSpacing = `${tracking}px`;
  if (blur > 0) ctx.filter = `blur(${blur}px)`;
  ctx.fillText(str, x, y);
  ctx.restore();
}

// Offscreen layers used by transitions. One per side of the cut.
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

export function drawTransition(ctx, A, B, p, kind) {
  const e = E.inOutCubic(p);
  ctx.save();
  switch (kind) {
    case 'wipe': {
      const ex = W * e;
      ctx.drawImage(A, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, ex, H);
      ctx.clip();
      ctx.drawImage(B, 0, 0);
      ctx.restore();
      // Bright leading edge sells the speed of the cut.
      const g = ctx.createLinearGradient(ex - 90, 0, ex + 6, 0);
      g.addColorStop(0, 'rgba(143,211,255,0)');
      g.addColorStop(1, 'rgba(143,211,255,0.55)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g;
      ctx.fillRect(ex - 90, 0, 96, H);
      break;
    }
    case 'iris': {
      ctx.drawImage(A, 0, 0);
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, (Math.hypot(W, H) / 2) * e, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(B, 0, 0);
      break;
    }
    case 'whip': {
      const blur = Math.round(42 * Math.sin(Math.PI * p));
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(A, -W * E.inCubic(p) * 0.9, 0);
      ctx.drawImage(B, W * (1 - E.outExpo(p)), 0);
      break;
    }
    case 'zoom': {
      ctx.save();
      ctx.globalAlpha = 1 - p;
      ctx.translate(W / 2, H / 2);
      ctx.scale(1 + 0.8 * E.inCubic(p), 1 + 0.8 * E.inCubic(p));
      ctx.translate(-W / 2, -H / 2);
      ctx.filter = `blur(${Math.round(36 * Math.sin(Math.PI * p))}px)`;
      ctx.drawImage(A, 0, 0);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = E.outCubic(p);
      const s = lerp(1.25, 1, E.outExpo(p));
      ctx.translate(W / 2, H / 2);
      ctx.scale(s, s);
      ctx.translate(-W / 2, -H / 2);
      ctx.drawImage(B, 0, 0);
      ctx.restore();
      break;
    }
    case 'slice': {
      ctx.drawImage(A, 0, 0);
      const strips = 27;
      const sh = H / strips;
      for (let i = 0; i < strips; i++) {
        const r = rng(i * 97 + 13)();
        const on = r < p * 1.15;
        const dx = on ? (rng(i * 31 + 5)() - 0.5) * 520 * Math.sin(Math.PI * p) : 0;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, i * sh, W, sh + 1);
        ctx.clip();
        ctx.drawImage(on ? B : A, dx, 0);
        ctx.restore();
      }
      break;
    }
    case 'dissolve':
    default: {
      ctx.drawImage(A, 0, 0);
      ctx.globalAlpha = E.inOutSine(p);
      ctx.drawImage(B, 0, 0);
      break;
    }
  }
  ctx.restore();
}

// Compose the frame at absolute time t. Shots are ordered; a shot's tIn controls how it enters.
// Where two shots overlap, the earlier one is the outgoing side and the later one the incoming side.
export function composeAt(ctx, t, shots) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  const active = shots.filter((s) => t >= s.start && t < s.end);
  if (active.length === 0) return;
  if (active.length === 1) {
    active[0].draw(ctx, t, active[0]);
    return;
  }
  const [a, b] = active;
  const p = clamp((t - b.start) / (a.end - b.start));
  ctxA.setTransform(1, 0, 0, 1, 0, 0);
  ctxB.setTransform(1, 0, 0, 1, 0, 0);
  a.draw(ctxA, t, a);
  b.draw(ctxB, t, b);
  drawTransition(ctx, layerA, layerB, p, b.tIn || 'dissolve');
}
