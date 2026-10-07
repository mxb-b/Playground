#!/usr/bin/env python3
"""Mux the rendered picture with the score.

Two-pass EBU R128 loudness normalisation (FFmpeg loudnorm, target -14 LUFS, true peak -1.5 dBTP),
then AAC 320 kbps. The picture is re-encoded once at CRF 20 (tune film) so the file stays shareable;
the grain in the grade makes a high-quality master far larger than the reel needs.

Usage: python3 mux.py <picture.mp4> <score.wav> <final.mp4>
"""
import json
import subprocess
import sys

LOUD = 'I=-14:TP=-1.5:LRA=11'


def ffmpeg(args, capture=False):
    cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'info' if capture else 'warning', *args]
    return subprocess.run(cmd, capture_output=capture, text=True, check=True)


def measure(path):
    """Pass 1: measure integrated loudness, true peak, range and threshold. loudnorm prints JSON to stderr."""
    out = ffmpeg(['-i', path, '-af', f'loudnorm={LOUD}:print_format=json', '-f', 'null', '-'], capture=True)
    text = out.stderr
    return json.loads(text[text.rfind('{'):text.rfind('}') + 1])


def main():
    picture, score, final = sys.argv[1:4]
    m = measure(score)
    print(f"score in : {m['input_i']} LUFS, true peak {m['input_tp']} dBTP, LRA {m['input_lra']}")
    af = (
        f"loudnorm={LOUD}:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
        f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}"
        f":offset={m['target_offset']}:linear=true:print_format=summary"
    )
    ffmpeg([
        '-y', '-i', picture, '-i', score,
        '-map', '0:v:0', '-map', '1:a:0',
        '-af', af,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-tune', 'film', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
        '-c:a', 'aac', '-b:a', '320k', '-ar', '48000',
        '-shortest', '-movflags', '+faststart', final,
    ])
    check = measure(final)
    print(f"final    : {check['input_i']} LUFS, true peak {check['input_tp']} dBTP, LRA {check['input_lra']}")
    print(f'wrote {final}')


if __name__ == '__main__':
    main()
