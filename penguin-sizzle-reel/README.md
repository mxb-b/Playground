# Black Tie on Ice

A 52-second motion showreel about penguins, built in code. Every frame is a function of time, the score is synthesised from scratch, and the storyboard is in [`docs/STORYBOARD.md`](docs/STORYBOARD.md).

- `output/black-tie-on-ice.mp4`: the finished reel (1920 × 1080, 60 fps, H.264 and AAC, −14 LUFS)
- `output/storyboard-contact-sheet.png`: one frame per shot, taken from the rendered file
- `character-sheet.html`: every species and key pose, drawn by the same rig as the reel

## Rebuild

```bash
npm install                                  # playwright-core 1.56.1 and the @fontsource fonts
python3 -m pip install numpy scipy pillow    # score and contact sheet
python3 audio/make_audio.py                  # writes audio/score.wav
python3 audio/master.py audio/score.wav audio/score-master.wav   # -14 LUFS, true peak at or below -2 dBTP
node render.mjs --out=output/black-tie-on-ice-video.mp4   # picture, about 15 minutes on 4 cores
python3 mux.py output/black-tie-on-ice-video.mp4 audio/score-master.wav output/black-tie-on-ice.mp4
python3 contact_sheet.py output/black-tie-on-ice.mp4 output/storyboard-contact-sheet.png
```

`render.mjs` looks for Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, the build Playwright 1.56 uses. Point the `CHROME` constant at your own Chromium if you have a different one.

To preview a single scene in a browser, serve the folder (`python3 -m http.server`) and open `index.html`. Shot times and transitions are in `src/scenes.js` and `src/shots*.js`.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html`, `src/main.js` | Entry point; exposes `window.__renderAt(t)` |
| `src/engine.js` | Canvas stage, easing, damped springs, transitions |
| `src/penguin.js` | Parametric penguin: front and profile views, seven species |
| `src/fx.js` | Snow, ice layers, ballistic spray, ripples, graph editor, HUD |
| `src/shots1.js` to `src/shots4.js` | Nine shots, from title to finale |
| `render.mjs` | Headless renderer: sub-samples per frame, `tmix` motion blur, H.264 |
| `audio/make_audio.py` | Score and sound design, timed to the same 120 BPM grid |
| `audio/master.py` | Mastering: -14 LUFS integrated, true peak at or below -2 dBTP, 16 kHz low-pass |
| `mux.py` | AAC encode and mux with the picture |
| `contact_sheet.py` | Storyboard contact sheet from the rendered file |
| `fonts/` | Anton, Instrument Serif, Inter and JetBrains Mono (SIL OFL 1.1) |

## Licences

All code here is original to this project. The fonts are under the SIL Open Font License 1.1. The tools are Chromium (BSD-3-Clause), Playwright (Apache-2.0), FFmpeg (LGPL/GPL, built with libx264), Python with NumPy, SciPy and Pillow (BSD and HPND).
