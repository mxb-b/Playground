// Parametric 2D penguin rig.
// Local units: origin at the feet, height about 412 px, Y points down (canvas convention).
// drawFront: standing, waddling, dancing and huddled poses.
// drawProfile: sliding and leaping poses. Rotate the profile with pose.rot.
import { C } from './engine.js';

const P = {
  frontBody: new Path2D('M0,-400 C60,-400 92,-352 96,-310 C100,-290 118,-282 122,-250 C132,-190 130,-120 110,-60 C98,-24 60,-2 0,0 C-60,-2 -98,-24 -110,-60 C-130,-120 -132,-190 -122,-250 C-118,-282 -100,-290 -96,-310 C-92,-352 -60,-400 0,-400 Z'),
  frontBelly: new Path2D('M0,-336 C36,-336 62,-300 72,-250 C84,-190 88,-120 66,-56 C52,-20 24,-6 0,-6 C-24,-6 -52,-20 -66,-56 C-88,-120 -84,-190 -72,-250 C-62,-300 -36,-336 0,-336 Z'),
  flipper: new Path2D('M-20,-6 C12,-14 34,26 36,90 C38,132 22,166 2,170 C-18,172 -34,134 -34,84 C-34,32 -34,0 -20,-6 Z'),
  footFront: new Path2D('M-30,0 C-34,-9 -14,-12 -2,-7 C6,-11 24,-10 30,0 C34,6 14,12 0,11 C-14,12 -30,6 -30,0 Z'),
  beakFront: new Path2D('M-17,-332 C-6,-328 6,-328 17,-332 L0,-300 Z'),
  profBody: new Path2D('M40,-412 C110,-412 140,-360 128,-300 C126,-290 118,-282 110,-272 C124,-196 116,-86 70,-40 C40,-12 -10,0 -40,0 C-82,0 -118,-14 -124,-50 C-130,-70 -116,-100 -92,-130 C-100,-200 -92,-270 -58,-322 C-40,-350 -28,-380 -10,-404 C0,-410 20,-412 40,-412 Z'),
  profBelly: new Path2D('M106,-290 C128,-214 124,-110 80,-44 C52,-14 6,-4 -34,-4 C-4,-44 4,-96 22,-150 C40,-206 70,-262 106,-290 Z'),
  profFoot: new Path2D('M-14,-8 C6,-14 40,-14 62,-6 C72,-2 74,8 66,10 C40,14 6,14 -14,8 Z'),
  profBeakUp: new Path2D('M112,-344 C124,-342 138,-336 152,-328 L112,-316 Z'),
  profBeakLow: new Path2D('M112,-316 L146,-322 C136,-308 124,-302 112,-302 Z'),
};

// Species share one silhouette. Only colours and decorations change.
export const SPECIES = {
  emperor: { label: 'EMPEROR', back: '#0d1014', beak: '#ffb347', feet: '#ffa23d', pupil: '#0a0c10', ring: false },
  king: { label: 'KING', back: '#0d1014', beak: '#ff9f2e', feet: '#ff9f2e', pupil: '#0a0c10', ring: false },
  adelie: { label: 'ADÉLIE', back: '#0d1014', beak: '#2a2b33', feet: '#e8862c', pupil: '#0a0c10', ring: true },
  gentoo: { label: 'GENTOO', back: '#0d1014', beak: '#ff6b2c', feet: '#ff7d2e', pupil: '#0a0c10', ring: false },
  chinstrap: { label: 'CHINSTRAP', back: '#0d1014', beak: '#2a2b33', feet: '#ff9a3c', pupil: '#0a0c10', ring: false },
  macaroni: { label: 'MACARONI', back: '#0d1014', beak: '#ff8a3d', feet: '#ff8a3d', pupil: '#0a0c10', ring: false },
  rockhopper: { label: 'ROCKHOPPER', back: '#0d1014', beak: '#ff8a3d', feet: '#ff8a3d', pupil: '#c81e2b', ring: false },
};
export const SPECIES_ORDER = ['emperor', 'king', 'adelie', 'gentoo', 'chinstrap', 'macaroni', 'rockhopper'];

function footFront(ctx, x, lift, color) {
  ctx.save();
  ctx.translate(x, -lift * 18);
  ctx.fillStyle = color;
  ctx.fill(P.footFront);
  ctx.restore();
}

// Flipper hinges at the shoulder. Positive angle = swings outward and up on both sides.
function flipperFront(ctx, x, y, side, a, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-a * side);
  ctx.fillStyle = color;
  ctx.fill(P.flipper);
  ctx.strokeStyle = 'rgba(143,211,255,0.22)';
  ctx.lineWidth = 2.5;
  ctx.stroke(P.flipper);
  ctx.restore();
}

function eyeFront(ctx, x, p, sp) {
  const open = Math.max(0.08, 1 - p.blink);
  ctx.save();
  ctx.translate(x, -344);
  ctx.scale(1, open);
  if (sp.ring) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 0, 15, 17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = sp.pupil;
  ctx.beginPath();
  ctx.arc(p.look * 5, 1, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(p.look * 5 + 3, -4, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Decorations clipped to the body silhouette (drawn before the belly).
function decorTop(ctx, sp) {
  if (sp.decorKey === 'king') {
    ctx.fillStyle = '#ffc65c';
    for (const sx of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(sx * 84, -342, 16, 26, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (sp.decorKey === 'gentoo') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, -388, 70, 24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function decorBelly(ctx, sp) {
  if (sp.decorKey === 'emperor') {
    ctx.fillStyle = C.gold;
    for (const sx of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(sx * 52, -292, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (sp.decorKey === 'king') {
    ctx.fillStyle = '#ffb347';
    for (const sx of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(sx * 50, -296, 30, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (sp.decorKey === 'chinstrap') {
    ctx.strokeStyle = '#0d1014';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-62, -322);
    ctx.quadraticCurveTo(0, -282, 62, -322);
    ctx.stroke();
  }
}

// Crests extend past the silhouette, so they are drawn last.
function decorCrest(ctx, sp) {
  if (sp.decorKey === 'macaroni') {
    ctx.fillStyle = C.gold;
    for (const sx of [-1, 1]) {
      ctx.save();
      ctx.scale(sx, 1);
      ctx.beginPath();
      ctx.moveTo(-22, -394);
      ctx.bezierCurveTo(-46, -430, -92, -420, -96, -368);
      ctx.bezierCurveTo(-78, -380, -58, -376, -40, -364);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
  if (sp.decorKey === 'rockhopper') {
    ctx.strokeStyle = C.gold;
    ctx.lineCap = 'round';
    for (const sx of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        ctx.lineWidth = 9 - k * 2;
        ctx.beginPath();
        ctx.moveTo(sx * (16 + k * 4), -366 + k * 6);
        ctx.bezierCurveTo(sx * (50 + k * 6), -384 + k * 4, sx * (84 + k * 4), -372 + k * 4, sx * (106 - k * 4), -336 + k * 6);
        ctx.stroke();
      }
    }
  }
}

function bowtie(ctx) {
  ctx.fillStyle = C.gold;
  ctx.beginPath();
  ctx.moveTo(-4, -292);
  ctx.lineTo(-34, -306);
  ctx.lineTo(-34, -278);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(4, -292);
  ctx.lineTo(34, -306);
  ctx.lineTo(34, -278);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, -292, 7, 8, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Front view. Pose fields: x, y (feet), s, rock, sx, sy (squash), flipL, flipR, footL, footR,
// blink, look (-1..1), alpha, species, bow (bow tie).
export function drawFront(ctx, pose = {}) {
  const p = { s: 1, rock: 0, sx: 1, sy: 1, flipL: 0.2, flipR: 0.2, footL: 0, footR: 0, blink: 0, look: 0, alpha: 1, species: 'emperor', bow: false, ...pose };
  const sp = { ...SPECIES[p.species], decorKey: p.species };
  ctx.save();
  ctx.globalAlpha *= p.alpha;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rock);
  ctx.scale(p.s * p.sx, p.s * p.sy);

  footFront(ctx, -44, p.footL, sp.feet);
  footFront(ctx, 44, p.footR, sp.feet);
  flipperFront(ctx, -112, -282, -1, p.flipL, sp.back);
  flipperFront(ctx, 112, -282, 1, p.flipR, sp.back);

  const g = ctx.createLinearGradient(-130, 0, 130, 0);
  g.addColorStop(0, '#222b3c');
  g.addColorStop(0.45, '#0e131b');
  g.addColorStop(1, '#05070b');
  ctx.fillStyle = g;
  ctx.fill(P.frontBody);
  ctx.strokeStyle = 'rgba(143,211,255,0.30)';
  ctx.lineWidth = 2.5;
  ctx.stroke(P.frontBody);

  ctx.save();
  ctx.clip(P.frontBody);
  decorTop(ctx, sp);
  ctx.restore();

  const bg = ctx.createLinearGradient(0, -336, 0, -6);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, '#d6e7f5');
  ctx.fillStyle = bg;
  ctx.fill(P.frontBelly);

  decorBelly(ctx, sp);
  decorCrest(ctx, sp);
  if (p.bow) bowtie(ctx);
  eyeFront(ctx, -34, p, sp);
  eyeFront(ctx, 34, p, sp);
  ctx.fillStyle = sp.beak;
  ctx.fill(P.beakFront);
  ctx.restore();
}

// Profile view, facing right. The origin is the feet. Pose fields: x, y, s, rot (rotates about
// pivotX/pivotY, default the body centre), flip (flipper sweep, + = back), footLift, gape (0..1),
// blink, look, alpha, species.
export function drawProfile(ctx, pose = {}) {
  const p = { x: 0, y: 0, s: 1, rot: 0, pivotX: 0, pivotY: -200, flip: 0.5, footLift: 0, gape: 0, blink: 0, look: 1, alpha: 1, species: 'emperor', ...pose };
  const sp = { ...SPECIES[p.species], decorKey: p.species };
  ctx.save();
  ctx.globalAlpha *= p.alpha;
  ctx.translate(p.x, p.y);
  ctx.scale(p.s, p.s);
  ctx.translate(p.pivotX, p.pivotY);
  ctx.rotate(p.rot);
  ctx.translate(-p.pivotX, -p.pivotY);

  ctx.save();
  ctx.translate(-10, -p.footLift * 16);
  ctx.fillStyle = sp.feet;
  ctx.fill(P.profFoot);
  ctx.restore();

  const g = ctx.createLinearGradient(-130, -400, 130, 0);
  g.addColorStop(0, '#222b3c');
  g.addColorStop(0.5, '#0e131b');
  g.addColorStop(1, '#05070b');
  ctx.fillStyle = g;
  ctx.fill(P.profBody);
  ctx.strokeStyle = 'rgba(143,211,255,0.30)';
  ctx.lineWidth = 2.5;
  ctx.stroke(P.profBody);

  const bg = ctx.createLinearGradient(0, -266, 0, -2);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, '#d6e7f5');
  ctx.fillStyle = bg;
  ctx.fill(P.profBelly);

  if (sp.decorKey === 'emperor' || sp.decorKey === 'king') {
    ctx.fillStyle = sp.decorKey === 'king' ? '#ffb347' : C.gold;
    ctx.beginPath();
    ctx.ellipse(96, -290, 13, 18, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(-6, -268);
  ctx.rotate(p.flip);
  ctx.fillStyle = sp.back;
  ctx.fill(P.flipper);
  ctx.strokeStyle = 'rgba(143,211,255,0.22)';
  ctx.lineWidth = 2.5;
  ctx.stroke(P.flipper);
  ctx.restore();

  // Eye: sclera, pupil looking forward, glint.
  const open = Math.max(0.08, 1 - p.blink);
  ctx.save();
  ctx.translate(72, -360);
  ctx.scale(1, open);
  if (sp.ring) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 0, 13, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = sp.pupil;
  ctx.beginPath();
  ctx.arc(3 + p.look * 2, 1, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(5 + p.look * 2, -3, 2.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = sp.beak;
  ctx.fill(P.profBeakUp);
  ctx.save();
  ctx.translate(112, -316);
  ctx.rotate(p.gape * 0.35);
  ctx.translate(-112, 316);
  ctx.fill(P.profBeakLow);
  ctx.restore();
  ctx.restore();
}

// Soft contact shadow on the ice.
export function drawShadow(ctx, x, y, w = 150, a = 0.45) {
  ctx.save();
  ctx.globalAlpha = a;
  ctx.filter = 'blur(6px)';
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(x, y, w, w * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
