// Shared motion effects. Every function is a pure function of time, so any frame can be drawn in isolation.
import { W, H, C, rng, clamp, lerp, E, text } from './engine.js';

// Parallax snowfall. Flakes fall and drift on analytic paths, with depth controlling size, speed and alpha.
export function snowfield(ctx, t, { count = 700, seed = 1, speed = 1, alpha = 1, wind = 0.25 } = {}) {
  const r = rng(seed);
  ctx.save();
  ctx.fillStyle = C.ice;
  for (let i = 0; i < count; i++) {
    const depth = r();
    const x0 = r() * W;
    const y0 = r() * H;
    const ph = r() * Math.PI * 2;
    const size = lerp(0.8, 4.4, depth) * (0.8 + 0.4 * r());
    const fall = lerp(40, 260, depth) * speed;
    const drift = wind * lerp(20, 90, depth);
    const x = ((((x0 + drift * t + Math.sin(ph + t * 0.8) * 18) % W) + W) % W);
    const y = ((((y0 + fall * t) % H) + H) % H);
    ctx.globalAlpha = alpha * lerp(0.2, 0.95, depth);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// Layered ice shelf silhouette. offset scrolls the shape for parallax.
export function iceLayer(ctx, { y, amp = 40, freq = 0.004, seed = 1, offset = 0, top, bottom = H, alpha = 1 }) {
  const r = rng(seed);
  const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(-40, bottom + 40);
  for (let x = -40; x <= W + 40; x += 10) {
    const u = (x + offset) * freq;
    const yy = y + amp * (Math.sin(u + ph[0]) * 0.6 + Math.sin(u * 2.3 + ph[1]) * 0.3 + Math.sin(u * 4.1 + ph[2]) * 0.1);
    ctx.lineTo(x, yy);
  }
  ctx.lineTo(W + 40, bottom + 40);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, y - amp, 0, bottom);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom === H ? '#050a14' : top);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.restore();
}

// Ballistic particle burst from (x, y) starting at t0. Analytic: position = start + v*tau + 0.5*g*tau^2.
export function burst(ctx, t, { x, y, t0, n = 60, seed = 3, speed = 600, spread = Math.PI, angle = -Math.PI / 2, g = 1400, life = 1.2, color = C.snow, size = 4 }) {
  const tau0 = t - t0;
  if (tau0 <= 0) return;
  const r = rng(seed);
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const a = angle + (r() - 0.5) * spread;
    const v = speed * (0.35 + 0.65 * r());
    const life_i = life * (0.6 + 0.4 * r());
    if (tau0 > life_i) continue;
    const vx = Math.cos(a) * v;
    const vy = Math.sin(a) * v;
    const px = x + vx * tau0;
    const py = y + vy * tau0 + 0.5 * g * tau0 * tau0;
    const fade = 1 - tau0 / life_i;
    ctx.globalAlpha = clamp(fade) * 0.95;
    ctx.beginPath();
    ctx.arc(px, py, size * (0.5 + 0.5 * r()) * clamp(fade * 1.5), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// Water ripple: an expanding ellipse with perspective squash (ry = 0.28 rx).
export function ripple(ctx, { x, y, t, t0, dur = 1.4, maxR = 260, color = C.frost, width = 5, alpha = 1 }) {
  const p = clamp((t - t0) / dur);
  if (p <= 0 || p >= 1) return;
  const r = lerp(12, maxR, E.outCubic(p));
  ctx.save();
  ctx.globalAlpha = alpha * (1 - p) * (1 - p);
  ctx.strokeStyle = color;
  ctx.lineWidth = width * (1 - p * 0.6);
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.28, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// Film-style chrome: corner brackets, a shot label and a live timecode at 60 fps.
export function timecode(t) {
  const fr = Math.floor(t * 60);
  const ff = fr % 60;
  const ss = Math.floor(fr / 60) % 60;
  const mm = Math.floor(fr / 3600) % 60;
  const p = (n) => String(n).padStart(2, '0');
  return `00:${p(mm)}:${p(ss)}:${p(ff)}`;
}

export function chrome(ctx, t, { label, shot, color = C.frost, alpha = 1 }) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.7;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const m = 46;
  const L = 34;
  for (const [x, y, sx, sy] of [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]]) {
    ctx.beginPath();
    ctx.moveTo(x, y + sy * L);
    ctx.lineTo(x, y);
    ctx.lineTo(x + sx * L, y);
    ctx.stroke();
  }
  ctx.restore();
  text(ctx, `SHOT ${String(shot).padStart(2, '0')}  /  ${label}`, 84, 80, { font: "700 20px 'JetBrains Mono'", color, alpha: alpha * 0.85, tracking: 2 });
  text(ctx, timecode(t), W - 84, H - 72, { font: "700 20px 'JetBrains Mono'", color, align: 'right', alpha: alpha * 0.85, tracking: 2 });
}

// Graph-editor panel (After Effects style). Curves are drawn over a sliding window ending at t.
export function graphPanel(ctx, t, { x, y, w, h, span = 2.4, curves, title = 'GRAPH EDITOR', alpha = 1 }) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(8,14,26,0.82)';
  ctx.strokeStyle = 'rgba(143,211,255,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();

  text(ctx, title, x + 26, y + 40, { font: "700 18px 'JetBrains Mono'", color: C.frost, tracking: 2 });

  const gx = x + 26;
  const gy = y + 170;
  const gw = w - 52;
  const gh = h - 200;
  ctx.strokeStyle = 'rgba(143,211,255,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const yy = gy + (gh * i) / 4;
    ctx.beginPath();
    ctx.moveTo(gx, yy);
    ctx.lineTo(gx + gw, yy);
    ctx.stroke();
  }
  for (let i = 0; i <= 8; i++) {
    const xx = gx + (gw * i) / 8;
    ctx.beginPath();
    ctx.moveTo(xx, gy);
    ctx.lineTo(xx, gy + gh);
    ctx.stroke();
  }
  // Each curve: value in [-1, 1] mapped into the panel's vertical centre.
  for (const [ci, c] of curves.entries()) {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    const n = 160;
    for (let k = 0; k <= n; k++) {
      const tt = t - span + (span * k) / n;
      const v = c.fn(tt);
      const px = gx + (gw * k) / n;
      const py = gy + gh / 2 - v * (gh * 0.42) + (c.offset || 0);
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // Keyframe diamonds at a fixed period, the way keys sit on a graph editor curve.
    if (c.keys) {
      const { period, phase = 0 } = c.keys;
      ctx.fillStyle = c.color;
      for (let k = Math.ceil((t - span - phase) / period); phase + k * period <= t; k++) {
        const tt = phase + k * period;
        const px = gx + (gw * (tt - (t - span))) / span;
        const py = gy + gh / 2 - c.fn(tt) * (gh * 0.42);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-7, -7, 14, 14);
        ctx.restore();
      }
    }
    // Live readout.
    const vNow = c.fn(t);
    text(ctx, `${c.label}  ${c.readout(vNow)}`, gx, y + 74 + ci * 26, { font: "700 17px 'JetBrains Mono'", color: c.color, tracking: 1 });
  }
  // Playhead.
  ctx.strokeStyle = C.beak;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gx + gw, gy - 10);
  ctx.lineTo(gx + gw, gy + gh + 6);
  ctx.stroke();
  ctx.restore();
}
