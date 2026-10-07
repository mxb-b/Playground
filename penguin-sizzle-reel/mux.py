#!/usr/bin/env python3
"""Mux the rendered picture with the mastered score.

The score is already mastered by audio/master.py (-14 LUFS integrated, true peak at or below -2 dBTP),
so this step encodes it to AAC 320 kbps and combines it with the picture. The picture is re-encoded
once at CRF 20 (tune film) so the file stays shareable. Pass --keep-picture to stream-copy an existing
picture when only the audio has changed; that avoids a second generation of picture compression.

Usage: python3 mux.py <picture.mp4> <score-master.wav> <final.mp4> [--keep-picture]
"""
import subprocess
import sys

PICTURE_ENCODE = [
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-tune', 'film',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high',
]


def main():
    picture, score, final = sys.argv[1:4]
    video = ['-c:v', 'copy'] if '--keep-picture' in sys.argv else PICTURE_ENCODE
    subprocess.run([
        'ffmpeg', '-hide_banner', '-loglevel', 'warning', '-y',
        '-i', picture, '-i', score,
        '-map', '0:v:0', '-map', '1:a:0',
        *video,
        '-c:a', 'aac', '-b:a', '320k', '-ar', '48000',
        '-shortest', '-movflags', '+faststart', final,
    ], check=True)
    print(f'wrote {final}')


if __name__ == '__main__':
    main()
