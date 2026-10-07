// Character sheet: every species in the front view, plus profile poses used by the reel.
import { W, H, C, text } from './engine.js';
import { drawFront, drawProfile, drawShadow, SPECIES, SPECIES_ORDER } from './penguin.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function paint() {
  const bg = ctx.createRadialGradient(W / 2, H * 0.35, 80, W / 2, H / 2, W * 0.75);
  bg.addColorStop(0, '#16233d');
  bg.addColorStop(1, '#05070d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  text(ctx, 'CHARACTER SHEET', 80, 110, { font: "400 96px 'Anton'", color: C.snow });
  text(ctx, 'SEVEN SPECIES, ONE RIG', 84, 150, { font: "800 22px 'Inter'", color: C.frost });

  SPECIES_ORDER.forEach((key, i) => {
    const x = 170 + i * 254;
    const y = 400;
    drawShadow(ctx, x, y + 2, 92, 0.55);
    drawFront(ctx, { x, y, s: 0.5, species: key, look: 0.4, footL: i % 2, footR: 1 - (i % 2), flipL: 0.25, flipR: 0.25 });
    text(ctx, SPECIES[key].label, x, 480, { font: "400 34px 'Anton'", color: C.ice, align: 'center', tracking: 2 });
  });

  // Hero: tuxedo bow tie and a wave.
  drawShadow(ctx, 420, 985, 150, 0.6);
  drawFront(ctx, { x: 420, y: 985, s: 0.95, species: 'emperor', bow: true, flipR: 2.1, flipL: 0.25, look: 0.6 });
  text(ctx, 'HERO / BLACK TIE', 420, 1046, { font: "400 30px 'Anton'", color: C.gold, align: 'center', tracking: 2 });

  // Profile poses.
  drawShadow(ctx, 900, 985, 150, 0.6);
  drawProfile(ctx, { x: 900, y: 985, s: 0.95, species: 'king', flip: 0.4 });
  text(ctx, 'PROFILE / STAND', 900, 1046, { font: "400 30px 'Anton'", color: C.ice, align: 'center', tracking: 2 });

  drawShadow(ctx, 1240, 985, 180, 0.6);
  drawProfile(ctx, { x: 1240, y: 985, s: 0.8, species: 'adelie', rot: 1.3, pivotX: 0, pivotY: -200, flip: 1.1, footLift: 0.4, gape: 0.6, look: 1.5 });
  text(ctx, 'SLIDE / BELLY', 1240, 1046, { font: "400 30px 'Anton'", color: C.ice, align: 'center', tracking: 2 });

  drawProfile(ctx, { x: 1640, y: 900, s: 0.8, species: 'macaroni', rot: -0.55, flip: -1.2, footLift: 1, gape: 0.2 });
  text(ctx, 'LEAP / ARC', 1640, 1046, { font: "400 30px 'Anton'", color: C.ice, align: 'center', tracking: 2 });
}

const fontsReady = Promise.all([
  document.fonts.load("400 100px 'Anton'"),
  document.fonts.load("800 100px 'Inter'"),
]);
fontsReady.then(() => {
  paint();
  window.__ready = true;
});
