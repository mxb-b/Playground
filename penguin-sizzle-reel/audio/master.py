#!/usr/bin/env python3
"""Master the score for streaming: -14 LUFS integrated, true peak at or below -2 dBTP.

Three steps. A 16 kHz zero-phase low-pass removes near-Nyquist energy from the noise transients,
which is where most inter-sample overshoot comes from. A lookahead gain envelope then keeps
4x-oversampled peaks under the ceiling: a minimum filter followed by a moving average of the
same width guarantees the gain is reduced at every peak. Finally the gain is adjusted until
FFmpeg's EBU R128 meter reads the target.

Usage: python3 audio/master.py audio/score.wav audio/score-master.wav
"""
import os
import re
import subprocess
import sys

import numpy as np
from scipy import signal
from scipy.io import wavfile
from scipy.ndimage import minimum_filter1d, uniform_filter1d

TARGET_LUFS = -14.0
CEILING_DBTP = -2.0  # leaves headroom for the overshoot AAC adds when it encodes the master
LOOKAHEAD_S = 0.005
LOWPASS_HZ = 16000


def integrated_lufs(path):
    r = subprocess.run(
        ['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-af', 'ebur128', '-f', 'null', '-'],
        capture_output=True, text=True, check=True,
    )
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r.stderr)[-1])


def true_peak_dbtp(x):
    """Peak over 4x oversampled samples, approximating how a DAC reconstructs the waveform."""
    up = signal.resample_poly(x, 4, 1, axis=0)
    return 20 * np.log10(np.abs(up).max())


def limit_true_peak(x, sr, ceiling_lin):
    up = signal.resample_poly(x, 4, 1, axis=0)
    n = x.shape[0]
    peak = np.abs(up).reshape(n, 4, 2).max(axis=(1, 2))
    gain_req = np.minimum(1.0, ceiling_lin / np.maximum(peak, 1e-12))
    size = 2 * int(LOOKAHEAD_S * sr) + 1
    gain = uniform_filter1d(minimum_filter1d(gain_req, size), size)
    return x * gain[:, None]


def main():
    src, dst = sys.argv[1:3]
    sr, data = wavfile.read(src)
    x = data.astype(np.float64)

    sos = signal.butter(8, LOWPASS_HZ / (sr / 2), btype='low', output='sos')
    x = signal.sosfiltfilt(sos, x, axis=0)

    ceiling = 10 ** (CEILING_DBTP / 20)
    gain_db = TARGET_LUFS - integrated_lufs(src)
    tmp = dst + '.tmp.wav'
    for step in range(5):
        y = limit_true_peak(x * 10 ** (gain_db / 20), sr, ceiling)
        wavfile.write(tmp, sr, y.astype(np.float32))
        lufs = integrated_lufs(tmp)
        print(f'step {step}: gain {gain_db:+.2f} dB -> {lufs:.2f} LUFS, true peak {true_peak_dbtp(y):.2f} dBTP')
        err = TARGET_LUFS - lufs
        if abs(err) < 0.05:
            break
        gain_db += err
    os.remove(tmp)
    wavfile.write(dst, sr, y.astype(np.float32))
    print(f'wrote {dst}: {lufs:.2f} LUFS, true peak {true_peak_dbtp(y):.2f} dBTP (ceiling {CEILING_DBTP} dBTP)')


if __name__ == '__main__':
    main()
