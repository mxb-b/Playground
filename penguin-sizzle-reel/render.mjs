// Deterministic frame renderer.
// Drives the scene engine in headless Chromium (Playwright, Chromium 141 build from /opt/pw-browsers),
// samples S sub-frames per output frame across the shutter, and streams them to FFmpeg.
// FFmpeg averages each group of S sub-frames with tmix (motion blur), then encodes H.264.
//
// Usage: node render.mjs [--start=0] [--end=52] [--out=output/black-tie-on-ice-video.mp4] [--workers=3]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  }),
);
const FPS = 60;
const SAMPLES = 4; // sub-frames per output frame (360 degree shutter)
const WORKERS = Number(args.workers || 4);
const OUT = path.resolve(ROOT, args.out || 'output/black-tie-on-ice-video.mp4');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
};

// Minimal static server so ES modules and fonts load over http (file:// blocks module scripts).
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

const pages = [];
for (let i = 0; i < WORKERS; i++) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  pages.push(page);
}

const TOTAL = await pages[0].evaluate(() => window.__total);
const START = Number(args.start || 0);
const END = Number(args.end || TOTAL);
const f0 = Math.round(START * FPS);
const f1 = Math.round(END * FPS);
const outFrames = f1 - f0;
const jobs = outFrames * SAMPLES;

// FFmpeg reads sub-frames at FPS * SAMPLES. tmix averages each sliding window of SAMPLES frames;
// select keeps only the complete windows, so the output has exactly one frame per FPS tick.
const filter = [
  `tmix=frames=${SAMPLES}`,
  `select=eq(mod(n\\,${SAMPLES})\\,${SAMPLES - 1})`,
  `setpts=N/(${FPS}*TB)`,
  'eq=contrast=1.02:saturation=1.04',
  'noise=alls=4:allf=t',
  'vignette=PI/9',
].join(',');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const ff = spawn('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'warning',
  '-f', 'image2pipe', '-framerate', String(FPS * SAMPLES), '-c:v', 'png', '-i', '-',
  '-vf', filter,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
  '-movflags', '+faststart', '-an', '-r', String(FPS),
  OUT,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const results = new Map();
let nextJob = 0;
let written = 0;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const startedAt = Date.now();

async function worker(page) {
  for (;;) {
    while (results.size > 48 && nextJob > written + 48) await sleep(10);
    const j = nextJob++;
    if (j >= jobs) return;
    const f = f0 + Math.floor(j / SAMPLES);
    const s = j % SAMPLES;
    const t = (f + (s + 0.5) / SAMPLES) / FPS;
    // Read the canvas directly. This scales across pages, where page.screenshot serialises in the browser.
    const dataUrl = await page.evaluate((tt) => {
      window.__renderAt(tt);
      return document.getElementById('c').toDataURL('image/png');
    }, t);
    results.set(j, Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64'));
  }
}

async function writer() {
  let lastReport = 0;
  for (let j = 0; j < jobs; j++) {
    while (!results.has(j)) await sleep(4);
    const buf = results.get(j);
    results.delete(j);
    if (!ff.stdin.write(buf)) await once(ff.stdin, 'drain');
    written = j + 1;
    const pct = Math.floor((written / jobs) * 100);
    if (pct >= lastReport + 5) {
      lastReport = pct;
      const sec = (Date.now() - startedAt) / 1000;
      const eta = (sec / written) * (jobs - written);
      console.log(`render ${pct}%  ${Math.round(sec)}s elapsed  ~${Math.round(eta)}s left`);
    }
  }
  ff.stdin.end();
}

await Promise.all([...pages.map((p) => worker(p)), writer()]);
await new Promise((resolve, reject) => {
  ff.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
});
await browser.close();
server.close();
console.log(`done: ${outFrames} frames at ${FPS} fps (${SAMPLES} sub-samples each) -> ${OUT} in ${Math.round((Date.now() - startedAt) / 1000)}s`);
