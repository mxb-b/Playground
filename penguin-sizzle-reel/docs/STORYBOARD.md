# Black Tie on Ice: storyboard and director's vision

A 52-second motion showreel about penguins, built entirely in code.

## Vision

The emperor penguin is the most formally dressed animal on Earth, and it lives in the most hostile place on Earth. Black tie in a blizzard is a joke, a grace note and a rhythm all at once, so the reel leans into all three.

The brief for myself was simple: show what one motion designer can do with one character. One penguin rig, seven species, three scales, a dance floor, a time remap, a timeline that edits itself, and a finale that lands on the beat.

Every frame is a pure function of time. The reel is deterministic: any frame can be rendered alone, out of order, or in parallel, and the same input always gives the same picture.

## Principles on screen

| Principle | Where it shows |
| --- | --- |
| Timing and spacing | Everything lands on a 120 BPM grid: one beat is 0.5 s, one bar is 2 s. Cuts land on beats or bars. |
| Anticipation | The penguin's launch on the slope and the bow before the clap. |
| Squash and stretch | Hops on the dance floor, the stretch along the velocity during the leap. |
| Follow-through | The flippers lag behind the body during the tumble and the leap. |
| Arcs | The leap traces a parabola, mirrored in the water. |
| Staging | The camera pulls back on the finale, and the huddle pushes in. |
| Secondary action | Speed lines, spray, footprints, a flipper flap on every hop. |
| Staggering | The huddle wave ripples out from the centre. The dance line runs as a canon, each penguin 1/8 beat behind the last. |
| Time remap | The leap runs at 160% at launch, 40% at the apex and 160% at entry. |
| Easing | outExpo for wipes, outBack for landings, inCubic for the slide launch, inOutCubic for camera moves, and damped springs for type. |

## Look

**Palette.** Ink `#060912`, glacier `#1b3a5c`, frost `#8fd3ff`, snow `#f7fbff`, beak orange `#ff9a3c`, gold `#ffd23f`, aurora `#3dffb5` and violet `#7b5cff`. The penguins are black and white with one warm accent, which is the beak and feet.

**Type.** Anton for display, Instrument Serif italic for the voice, Inter for running text, and JetBrains Mono for UI, timecode and the graph editor. All four are open-source fonts under the SIL Open Font License.

**Picture.** 1920 × 1080, 60 fps, a 360-degree shutter approximated with four sub-samples per frame, a light film grain and a soft vignette.

**Sound.** 120 BPM original score, synthesised in NumPy, with the sound design cued to picture: footsteps on each beat, the splash on the leap, claps on the bow. Loudness is normalised to −14 LUFS.

## Shot list

Timecodes are seconds from the start of the reel. Each shot is a separate scene in `src/shots*.js`.

| # | Time | Shot | What happens | Motion | Sound cue | Cut in |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | 0.00 to 4.00 | Title | Snow builds. "BLACK TIE" springs in letter by letter, a rule draws out, then "ON ICE" wipes in. | Per-letter springs, 0.05 s stagger; wipe on outExpo | Sub hit at 0.0; letter ticks; kicks at 0.5 and 1.5; rising whoosh at 1.5 | Cut |
| 02 | 3.70 to 10.00 | Waddle cycle | The penguin waddles on the spot while the ice scrolls past at three depths. Footprints trail behind. A graph editor plots the rock and bounce curves with keyframe diamonds. | One gait cycle per second, rock ±4.9°, bob 14 px, feet alternate every beat | A crunch on every beat, groove in | Wipe, 0.3 s |
| 03 | 9.70 to 14.00 | Belly slide | The penguin toboggans belly-first down the slope with speed lines and spray. It hits at 12.6 s, the ice cracks, and it tumbles, then stands. | Launch on inCubic, camera shake decaying after impact, outBack landing | Whoosh up to the impact; boom and crack at 12.6; thud at 13.7 | Whip, 0.3 s |
| 04 | 13.80 to 21.00 | Species cast | Seven species, one per second, each cut on the beat with its own transition: whip, slice, zoom, wipe, iris, slice. Each card has a springing penguin, a fitted name, a Latin name and a note. | outBack entrance on each penguin; names fitted to 860 px | Pluck arpeggio on each card; whoosh and snare on each cut | Zoom, 0.2 s |
| 05 | 20.80 to 28.00 | Huddle | 64 emperors on a spiral. Flippers lift in a radial wave, with phase proportional to distance from the centre. | Stagger of 2.4 radians across the radius at 0.9 Hz | Warm pad swell; sweep into the leap | Iris |
| 06 | 27.80 to 34.00 | Leap | The penguin leaves the water on an arc. The remap runs fast at launch, slows to 40% at the apex and speeds up again at entry. The body stretches along its velocity, leaves a trail and reflects in the water. | Time remap `1 + 0.6·cos(2πq)`; squash and stretch | Pop at 28.8; slow bend 29.5 to 31.7; splash at 32.0 | Slice |
| 07 | 33.70 to 40.00 | Dance floor | Five penguins hop on the beat, each offset by 1/8 beat. The perspective floor scrolls on every beat. | Hop as `abs(sin)`, squash on landing, flipper pump | Full groove; a chime on each bar | Wipe |
| 08 | 39.70 to 44.00 | The edit | A scrolling timeline shows the reel's own clips, with the audio track pulsing on the beat and an ease curve plotted at the top right. | Clip wipe-in; playhead scroll | UI ticks each second; riser into the finale | Whip |
| 09 | 43.70 to 52.00 | Finale | The camera pulls back from 1.7× to 1.0×. The hero bows, then claps on a 12 Hz cycle. The lockup springs in, the credits roll, and the picture fades to ink. | Spring lockup (2.0 Hz, ζ 0.6); inOutCubic camera | Bow chime; applause from 48.5; closing chord; credit ticks; fade | Dissolve |

## Beat map

| Time | Event |
| --- | --- |
| 0.5, 1.5 | Title kicks |
| 4.0 to 10.0 | Footstep on every beat (12 steps) |
| 12.6 | Impact on the slope |
| 15.0, 16.0, 17.0, 18.0, 19.0, 20.0 | Cast cuts |
| 28.8 | Leap launch |
| 32.0 | Leap entry, splash |
| 33.5 | Dance groove enters |
| 46.8 | Bow |
| 48.5 to 49.5 | Clap cycle at 12 Hz |
| 48.5 | Lockup lands |

## Tools

Everything here is open source or openly licensed.

| Tool | Used for | Licence |
| --- | --- | --- |
| Chromium 141 (headless) | Renders the scenes to canvas | BSD-3-Clause |
| Playwright-core 1.56.1 | Drives Chromium from Node | Apache-2.0 |
| FFmpeg | Motion-blur averaging, grade, H.264 encode, loudness-normalised mux | LGPL/GPL |
| Python 3.13, NumPy, SciPy | Original score and sound design | BSD |
| Pillow | Contact sheets and stills | HPND |
| Anton, Instrument Serif, Inter, JetBrains Mono | Type, via `@fontsource` on npm | SIL OFL 1.1 |

## Files

| File | What it is |
| --- | --- |
| `index.html`, `src/engine.js` | The deterministic scene engine: canvas stage, easing, springs, transitions |
| `src/penguin.js` | The penguin rig: front and profile views, seven species |
| `src/fx.js` | Snow, ice layers, ballistic spray, ripples, the graph editor and HUD |
| `src/shots1.js` to `src/shots4.js` | The nine shots |
| `src/scenes.js` | The shot list |
| `character-sheet.html` | The character sheet, all species and key poses |
| `render.mjs` | Headless renderer: 60 fps, four sub-samples, FFmpeg encode |
| `audio/make_audio.py` | The score |
| `mux.py` | Loudness-normalised mux into the final file |
| `output/black-tie-on-ice.mp4` | The finished reel |
