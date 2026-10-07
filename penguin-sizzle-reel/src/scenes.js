// Shot list. Assembled from the shot modules in storyboard order.
import { SHOTS_A } from './shots1.js';
import { SHOTS_B } from './shots2.js';
import { SHOTS_C } from './shots3.js';
import { SHOTS_D } from './shots4.js';

const ALL = [...SHOTS_A, ...SHOTS_B, ...SHOTS_C, ...SHOTS_D];

export const SHOTS = ALL;
export const TOTAL = Math.max(...ALL.map((s) => s.end));
