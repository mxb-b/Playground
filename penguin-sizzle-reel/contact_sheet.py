#!/usr/bin/env python3
"""Storyboard contact sheet from the finished reel: one frame per shot, labelled with shot number and timecode.

Frames are pulled from the rendered MP4, so the sheet shows what was actually rendered, not the plan.
Usage: python3 contact_sheet.py <reel.mp4> <sheet.png>
"""
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFont

# (shot number, shot name, time in seconds to sample)
SHOTS = [
    ('01', 'TITLE', 2.8),
    ('02', 'WADDLE CYCLE', 6.6),
    ('03', 'BELLY SLIDE', 12.2),
    ('04', 'SPECIES CAST', 16.6),
    ('05', 'HUDDLE', 24.6),
    ('06', 'LEAP', 30.4),
    ('07', 'DANCE FLOOR', 36.8),
    ('08', 'THE EDIT', 41.8),
    ('09', 'FINALE', 50.2),
]
CELL_W, CELL_H = 640, 360
PAD = 10
HEADER = 84
COLS = 3


def mono_font(size):
    """Find a monospace TTF through fontconfig. Falls back to Pillow's built-in font."""
    try:
        path = subprocess.run(['fc-match', '-f', '%{file}', 'monospace:bold'], capture_output=True, text=True).stdout.strip()
        if path and os.path.exists(path):
            return ImageFont.truetype(path, size)
    except (OSError, subprocess.SubprocessError):
        pass
    return ImageFont.load_default()


def timecode(t):
    fr = round(t * 60)
    return f'00:{fr // 3600 % 60:02d}:{fr // 60 % 60:02d}:{fr % 60:02d}'


def grab(video, t, tmpdir):
    out = os.path.join(tmpdir, f'f_{t:.2f}.png')
    subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', video, '-frames:v', '1', '-y', out], check=True)
    return Image.open(out).convert('RGB').resize((CELL_W, CELL_H), Image.LANCZOS)


def main():
    video, sheet_path = sys.argv[1:3]
    rows = (len(SHOTS) + COLS - 1) // COLS
    width = COLS * CELL_W + (COLS + 1) * PAD
    height = HEADER + rows * CELL_H + (rows + 1) * PAD
    sheet = Image.new('RGB', (width, height), (8, 10, 16))
    draw = ImageDraw.Draw(sheet)
    title_font = mono_font(26)
    label_font = mono_font(18)
    draw.text((PAD, 14), 'BLACK TIE ON ICE  ·  storyboard contact sheet, as rendered', font=title_font, fill=(143, 211, 255))
    draw.text((PAD, 50), '1920 × 1080  ·  60 fps  ·  52.0 s  ·  one frame per shot', font=label_font, fill=(230, 246, 255))

    with tempfile.TemporaryDirectory() as tmp:
        for i, (num, name, t) in enumerate(SHOTS):
            frame = grab(video, t, tmp)
            col, row = i % COLS, i // COLS
            x = PAD + col * (CELL_W + PAD)
            y = HEADER + PAD + row * (CELL_H + PAD)
            sheet.paste(frame, (x, y))
            strip = Image.new('RGBA', (CELL_W, 34), (6, 9, 18, 200))
            sheet.paste(strip, (x, y), strip)
            draw.text((x + 12, y + 7), f'{num}  {name}', font=label_font, fill=(255, 210, 63))
            tc = timecode(t)
            tw = draw.textlength(tc, font=label_font)
            draw.text((x + CELL_W - tw - 12, y + 7), tc, font=label_font, fill=(143, 211, 255))

    sheet.save(sheet_path, optimize=True)
    print(f'wrote {sheet_path} ({width} x {height})')


if __name__ == '__main__':
    main()
