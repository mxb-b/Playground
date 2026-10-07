// Entry point. The renderer (render.mjs) waits for window.__ready, then calls window.__renderAt(t) per sub-sample.
import { composeAt } from './engine.js';
import { SHOTS, TOTAL } from './scenes.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

window.__total = TOTAL;
window.__renderAt = (t) => composeAt(ctx, t, SHOTS);

await Promise.all([
  document.fonts.load("400 100px 'Anton'"),
  document.fonts.load("400 100px 'Instrument Serif'"),
  document.fonts.load("italic 400 100px 'Instrument Serif'"),
  document.fonts.load("400 100px 'JetBrains Mono'"),
  document.fonts.load("700 100px 'JetBrains Mono'"),
  document.fonts.load("400 100px 'Inter'"),
  document.fonts.load("600 100px 'Inter'"),
  document.fonts.load("800 100px 'Inter'"),
]);

window.__ready = true;
