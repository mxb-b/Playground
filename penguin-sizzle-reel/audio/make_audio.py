#!/usr/bin/env python3
"""Synthesise the reel's score and sound design, timed to the storyboard.

Everything is generated from scratch with NumPy and SciPy (both BSD-licensed), at 48 kHz stereo.
Event times are global seconds, the same clock the renderer uses: 120 BPM, one beat = 0.5 s,
one bar = 2 s. Output: audio/score.wav (32-bit float). FFmpeg loudness-matches it at mux time.

Usage: python3 audio/make_audio.py
"""
import os

import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
DUR = 53.5
N = int(SR * DUR)
BEAT = 0.5
rng = np.random.default_rng(20261007)

L = np.zeros(N, dtype=np.float64)
R = np.zeros(N, dtype=np.float64)


def tvec(dur):
    return np.arange(int(round(dur * SR))) / SR


def place(sig, t0, gain=1.0, pan=0.0):
    """Mix a mono event into the stereo bus at t0 with constant-power pan (-1 left, +1 right)."""
    i0 = int(round(t0 * SR))
    if i0 < 0 or i0 >= N:
        return
    n = min(len(sig), N - i0)
    angle = (pan + 1) * np.pi / 4
    L[i0:i0 + n] += gain * np.cos(angle) * sig[:n]
    R[i0:i0 + n] += gain * np.sin(angle) * sig[:n]


# ---------- voices ----------

def kick(dur=0.5):
    t = tvec(dur)
    f = 46 + 120 * np.exp(-t * 26)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6.5)
    click = rng.standard_normal(len(t)) * np.exp(-t * 500) * 0.4
    return (body + click) * 0.95


def snare(dur=0.3):
    t = tvec(dur)
    noise = signal.lfilter([1, -0.6], [1], rng.standard_normal(len(t)))
    tone = np.sin(2 * np.pi * 185 * t) * np.exp(-t * 34)
    return noise * np.exp(-t * 20) * 0.55 + tone * 0.5


def hat(open_=False, dur=0.25):
    t = tvec(dur)
    n = signal.lfilter([1, -1], [1], rng.standard_normal(len(t)))
    return n * np.exp(-t * (7 if open_ else 55)) * 0.22


def clap(dur=0.4):
    t = tvec(dur)
    n = signal.lfilter([1, 0, -1], [1, -0.5], rng.standard_normal(len(t)))
    env = sum(np.exp(-np.clip(t - d, 0, None) * 40) * (t >= d) for d in (0.0, 0.011, 0.023))
    env = env + 0.35 * np.exp(-t * 11)
    return n * env * 0.5


def pluck(freq, dur=0.9, bright=0.6):
    t = tvec(dur)
    sig = np.zeros_like(t)
    for k in range(1, 6):
        sig += (bright ** (k - 1)) / k * np.sin(2 * np.pi * freq * k * t) * np.exp(-t * (3.0 + 1.6 * k))
    return sig * 0.5


def pad(freqs, dur, attack=0.5, release=0.9, detune=0.004):
    t = tvec(dur)
    sig = np.zeros_like(t)
    for f in freqs:
        for k, a in ((1, 1.0), (2, 0.35), (3, 0.12)):
            for d in (1 - detune, 1 + detune):
                sig += a * np.sin(2 * np.pi * f * k * d * t)
    env = np.clip(np.minimum(1, t / attack) * np.minimum(1, (dur - t) / release), 0, 1)
    return sig * env / (len(freqs) * 2.5)


def whoosh(dur, rising=True, lo=250.0, hi=5000.0, gain=0.5):
    """Noise through a bank of low-pass filters whose cutoff sweeps across the duration."""
    t = tvec(dur)
    noise = rng.standard_normal(len(t))
    cuts = np.geomspace(lo, hi, 10)
    if not rising:
        cuts = cuts[::-1]
    pos = np.linspace(0, len(cuts) - 1, len(t))
    out = np.zeros_like(t)
    for k, c in enumerate(cuts):
        b, a = signal.butter(2, min(c / (SR / 2), 0.99), btype='low')
        out += np.clip(1 - np.abs(pos - k), 0, None) * signal.lfilter(b, a, noise)
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.6
    return out * env * gain


def splash(dur=1.8):
    t = tvec(dur)
    b, a = signal.butter(2, 3000 / (SR / 2), btype='low')
    body = signal.lfilter(b, a, rng.standard_normal(len(t))) * np.exp(-t * 2.6) * (1 - np.exp(-t * 80))
    bub = np.zeros_like(t)
    for _ in range(16):
        t0 = rng.uniform(0.08, dur * 0.7)
        tb = np.clip(t - t0, 0, None)
        f = 500 + 1200 * np.minimum(tb / 0.06, 1.0)
        bub += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tb * 35) * (t >= t0) * 0.5
    return body * 0.9 + bub * 0.35


def chime(freq, dur=2.6, gain=0.35):
    t = tvec(dur)
    out = np.zeros_like(t)
    for ratio, amp, decay in ((1.0, 1.0, 1.6), (2.76, 0.45, 2.6), (5.4, 0.2, 4.0)):
        out += amp * np.sin(2 * np.pi * freq * ratio * t) * np.exp(-t * decay)
    return out * gain


def crack(dur=0.6):
    t = tvec(dur)
    n = signal.lfilter([1, -1], [1], rng.standard_normal(len(t)))
    n = signal.lfilter([1, -1], [1], n)
    ping = np.sin(2 * np.pi * 2300 * t) * np.exp(-t * 45)
    return n * np.exp(-t * 16) * 0.8 + ping * 0.25


def tick(freq=1800, dur=0.06):
    t = tvec(dur)
    return np.sin(2 * np.pi * freq * t) * np.exp(-t * 90) * 0.5


def sub_hit(dur=1.2, f0=46):
    t = tvec(dur)
    f = f0 + 30 * np.exp(-t * 8)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)


KICK = kick()
SNARE = snare()
HAT = hat()
HAT_OPEN = hat(open_=True, dur=0.5)
CLAP = clap()
CRACK = crack()
TICK = tick()

# Chord bank: (bass root, pad voicing). Progression i - VI - iv - V-sus, one chord per bar.
CHORDS = [
    (73.42, [146.83, 174.61, 220.00, 261.63, 329.63]),  # Dm9
    (58.27, [116.54, 146.83, 174.61, 220.00]),          # Bbmaj7
    (49.00, [98.00, 116.54, 146.83, 174.61]),           # Gm7
    (55.00, [110.00, 146.83, 164.81, 196.00]),          # A7sus
]


def chord_at(t):
    return CHORDS[int(t // 2) % 4]


def groove(t_start, t_end, kick=True, clap=True, hats=True, bass=True, gain=1.0):
    """Drums and bass locked to the beat grid. Beat index k runs on 0.5 s steps; k % 4 is the beat within the bar."""
    for k in range(int(np.floor(t_start / BEAT)), int(np.ceil(t_end / BEAT)) + 1):
        t = k * BEAT
        if t < t_start or t >= t_end:
            continue
        beat = k % 4
        if kick and beat in (0, 2):
            place(KICK, t, 0.8 * gain)
        if clap and beat in (1, 3):
            place(CLAP, t, 0.34 * gain, pan=0.1)
        if hats:
            place(HAT, t + 0.25, 0.7 * gain, pan=0.35)
            place(HAT, t, 0.45 * gain, pan=-0.35)
        if bass:
            root, _ = chord_at(t)
            place(pluck(root, dur=0.35, bright=0.3), t, 0.24 * gain)
            place(pluck(root * 2, dur=0.25, bright=0.2), t + 0.25, 0.10 * gain, pan=0.2)


# ---------- the score, section by section ----------

def build():
    # Pads: one chord per bar for the whole reel. Gain is low so the groove sits on top.
    for k in range(27):
        _, voicing = CHORDS[k % 4]
        place(pad(voicing, 2.4, attack=0.6, release=0.9), 2 * k, 0.12, pan=-0.2 if k % 2 else 0.2)

    # 0.0 to 4.0 s: title. Sub swell, letter ticks as the title springs in, hits on the beat.
    place(sub_hit(1.5, 40), 0.0, 0.45)
    for i in range(8):
        place(TICK, 0.35 + i * 0.05, 0.22, pan=-0.6 + 1.2 * i / 7)
    place(KICK, 0.5, 0.9)
    place(SNARE, 1.0, 0.5)
    place(KICK, 1.5, 0.9)
    place(whoosh(1.1, rising=True, lo=400, hi=7000, gain=0.35), 1.5)
    place(chime(587.33, 2.2, 0.22), 2.4)

    # 2.0 to 9.7 s: groove starts, the bass and hats join at the waddle.
    groove(2.0, 9.7, kick=True, clap=False, hats=False, bass=False)
    groove(4.0, 9.7, kick=False, clap=False, hats=True, bass=True, gain=0.9)

    # Waddle footsteps: one crunch per beat, panned left and right in step with the feet.
    for k in range(int(4.0 / BEAT), int(10.0 / BEAT)):
        t = k * BEAT
        crunch = whoosh(0.09, rising=False, lo=900, hi=4000, gain=0.6)
        place(crunch, t, 0.18, pan=-0.45 if k % 2 == 0 else 0.45)

    # 9.7 to 14.0 s: toboggan. Rising whoosh, impact at 12.6 s, tumble and landing at 13.7 s.
    place(whoosh(2.9, rising=True, lo=200, hi=6000, gain=0.6), 9.7)
    place(KICK, 12.6, 1.0)
    place(CRACK, 12.62, 0.9)
    place(splash(1.4), 12.65, 0.35, pan=0.2)
    place(KICK, 13.7, 0.55)
    place(SNARE, 13.7, 0.25)

    # 13.8 to 21.0 s: species cast. A whoosh and a snare on every cut, a pluck as each card lands.
    groove(13.5, 20.8, kick=True, clap=True, hats=True, bass=True, gain=0.9)
    for k in range(6):
        cut = 15.0 + k
        place(whoosh(0.32, rising=(k % 2 == 0), lo=300, hi=6000, gain=0.55), cut - 0.16, pan=0.2 if k % 2 else -0.2)
        place(SNARE, cut, 0.42, pan=-0.15 if k % 2 else 0.15)
    arp = [293.66, 349.23, 440.00, 523.25, 587.33, 659.25, 880.00]
    for i, f in enumerate(arp):
        place(pluck(f, dur=1.0, bright=0.5), 14.0 + i, 0.2, pan=-0.3 + 0.1 * i)
    place(whoosh(0.4, rising=True, lo=300, hi=6000, gain=0.5), 13.8)

    # 20.8 to 28.0 s: huddle. Warm vocal-like pad, a light groove, and a rising sweep into the leap.
    place(pad([293.66, 440.0, 349.23], 6.4, attack=1.2, release=1.4), 21.0, 0.10, pan=0.0)
    place(whoosh(0.3, rising=True, lo=200, hi=4000, gain=0.4), 20.8)
    groove(21.0, 27.8, kick=True, clap=False, hats=False, bass=True, gain=0.6)

    # 27.8 to 34.0 s: leap. Launch pop at 28.8 s, a slow-motion bend, splash at 32.0 s, riser into the dance.
    place(whoosh(0.25, rising=True, lo=300, hi=5000, gain=0.4), 27.8)
    place(whoosh(0.45, rising=True, lo=300, hi=6000, gain=0.6), 28.4)
    place(KICK, 28.8, 0.7)
    place(CRACK, 28.82, 0.35)
    bend_t = tvec(2.2)
    bend_f = 420 - 240 * np.clip(bend_t / 2.2, 0, 1) ** 0.7
    bend_env = np.clip(np.minimum(1, bend_t / 0.25) * np.minimum(1, (2.2 - bend_t) / 0.4), 0, 1)
    place(np.sin(2 * np.pi * np.cumsum(bend_f) / SR) * bend_env * 0.5, 29.5, 0.12, pan=0.25)
    place(splash(1.8), 32.0, 0.85)
    place(whoosh(0.65, rising=True, lo=200, hi=7000, gain=0.5), 33.0)

    # 33.5 to 40.0 s: dance floor. Full groove, four on the floor, and a chime on each downbeat.
    groove(33.5, 40.0, kick=True, clap=True, hats=True, bass=True, gain=1.0)
    for k in range(int(33.5 / BEAT), int(40.0 / BEAT)):
        t = k * BEAT
        if k % 4 == 0:
            place(chime(587.33, 1.2, 0.09), t, 0.8, pan=0.3)
        place(pluck(880 if k % 2 else 659.25, dur=0.3, bright=0.2), t + 0.125, 0.07, pan=-0.4 if k % 2 else 0.4)

    # 39.7 to 44.0 s: the edit. UI ticks each second, then a riser into the finale.
    for sec in (40.0, 41.0, 42.0, 43.0):
        place(TICK, sec, 0.2, pan=0.0)
    place(whoosh(1.5, rising=True, lo=200, hi=8000, gain=0.45), 42.5)

    # 43.7 to 52.0 s: finale. The bow chime, applause on the 12 Hz clap cycle, lockup, credits, closing chord.
    place(sub_hit(1.6, 46), 46.8, 0.55)
    place(chime(587.33, 3.0, 0.42), 46.8, pan=0.0)
    place(pad([146.83, 220.0, 261.63, 329.63], 4.0, attack=0.3, release=1.2), 46.8, 0.12)
    for k in range(13):
        place(CLAP, 48.5 + k / 12, 0.42, pan=-0.25 if k % 2 else 0.25)
    for _ in range(46):
        t = rng.uniform(49.5, 51.2) ** 1.0
        place(CLAP, t, rng.uniform(0.12, 0.22), pan=rng.uniform(-0.7, 0.7))
    place(whoosh(0.7, rising=True, lo=300, hi=7000, gain=0.5), 48.4)
    place(pad([146.83, 174.61, 220.0, 261.63, 329.63], 3.5, attack=0.05, release=1.4), 48.5, 0.2)
    place(chime(440.0, 2.4, 0.22), 48.7, pan=0.2)
    for i in range(4):
        place(TICK, 49.7 + i * 0.25, 0.22, pan=-0.5 + i / 3)
    place(pad([146.83, 174.61, 220.0, 261.63, 329.63], 3.6, attack=0.4, release=1.6), 50.8, 0.2)
    place(chime(293.66, 3.2, 0.3), 50.8)


def reverb(x_l, x_r, seconds=2.4, wet=0.2):
    t = tvec(seconds)
    ir_l = rng.standard_normal(len(t)) * np.exp(-t * 2.4)
    ir_r = rng.standard_normal(len(t)) * np.exp(-t * 2.4)
    ir_l[0] = 1.0
    ir_r[0] = 1.0
    wet_l = signal.fftconvolve(x_l, ir_l)[:N]
    wet_r = signal.fftconvolve(x_r, ir_r)[:N]
    # Wet peak is set to `wet` times the dry peak, so the reverb colours the mix without swamping it.
    dry_peak = max(np.abs(x_l).max(), np.abs(x_r).max())
    scale = wet * dry_peak / max(np.abs(wet_l).max(), np.abs(wet_r).max(), 1e-9)
    return x_l + wet_l * scale, x_r + wet_r * scale


def limit(x_l, x_r, ceiling=0.89):
    """Soft limiter: tanh saturation keeps every sample inside the ceiling and bends only the loudest transients."""
    return ceiling * np.tanh(x_l / ceiling), ceiling * np.tanh(x_r / ceiling)


def main():
    build()
    out_l, out_r = reverb(L, R)
    # Master envelope: full level until 51.0 s, then a fade to silence exactly at the picture's end (52.0 s).
    tt = np.arange(N) / SR
    master = np.clip((52.0 - tt) / 1.0, 0, 1)
    out_l = out_l * master
    out_r = out_r * master
    # Makeup gain to about -16 dBFS RMS, then limit the peaks. FFmpeg's loudnorm does the final LUFS match.
    rms = np.sqrt(np.mean(np.concatenate([out_l, out_r]) ** 2))
    makeup = 10 ** ((-16 - 20 * np.log10(rms)) / 20)
    out_l, out_r = limit(out_l * makeup, out_r * makeup, ceiling=0.89)
    peak = max(np.abs(out_l).max(), np.abs(out_r).max())
    stereo = np.stack([out_l, out_r], axis=1).astype(np.float32)
    here = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(here, 'score.wav')
    wavfile.write(path, SR, stereo)
    print(f'wrote {path}: {stereo.shape[0] / SR:.2f} s, stereo {SR} Hz, peak before scaling {peak:.3f}')


if __name__ == '__main__':
    main()
