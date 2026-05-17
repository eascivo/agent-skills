#!/usr/bin/env python3
"""Build a synced narrated slide video from rendered slides and audio files."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}
AUDIO_EXTS = {".wav", ".mp3", ".m4a", ".aac", ".flac", ".ogg"}


def numeric_key(path: Path) -> tuple[int, str]:
    """Sort by the last integer in the stem, then by name."""
    numbers = re.findall(r"\d+", path.stem)
    if numbers:
        return int(numbers[-1]), path.name.lower()
    return 10**9, path.name.lower()


def collect_files(directory: Path, exts: set[str]) -> list[Path]:
    if not directory.exists():
        raise FileNotFoundError(f"directory not found: {directory}")
    files = [p for p in directory.iterdir() if p.is_file() and p.suffix.lower() in exts]
    return sorted(files, key=numeric_key)


def match_slide_audio(slides_dir: Path, audio_dir: Path) -> list[tuple[Path, Path]]:
    slides = collect_files(slides_dir, IMAGE_EXTS)
    audio = collect_files(audio_dir, AUDIO_EXTS)
    if not slides:
        raise ValueError(f"no slide images found in {slides_dir}")
    if not audio:
        raise ValueError(f"no audio files found in {audio_dir}")
    if len(slides) != len(audio):
        raise ValueError(f"slide/audio count mismatch: {len(slides)} slides, {len(audio)} audio files")
    return list(zip(slides, audio))


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, check=True, text=True, capture_output=True)


def ffprobe_duration(path: Path) -> float:
    cmd = [
        "ffprobe",
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_entries",
        "format=duration",
        str(path),
    ]
    data = json.loads(run(cmd).stdout)
    return float(data["format"]["duration"])


def ensure_tools() -> None:
    missing = [tool for tool in ("ffmpeg", "ffprobe") if shutil.which(tool) is None]
    if missing:
        raise RuntimeError(f"missing required command(s): {', '.join(missing)}")


def quote_concat_path(path: Path) -> str:
    # ffmpeg concat demuxer expects single quotes escaped as '\''.
    return "file '" + str(path).replace("'", "'\\''") + "'"


def build_video(
    pairs: list[tuple[Path, Path]],
    out: Path,
    fps: int = 30,
    width: int = 1920,
    height: int = 1080,
    pad_seconds: float = 0.0,
    loudnorm: bool = False,
) -> None:
    ensure_tools()
    out.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="ppt-narrated-video-") as tmp_name:
        tmp = Path(tmp_name)
        segment_list = tmp / "segments.txt"
        audio_list = tmp / "audio.txt"
        segments: list[Path] = []

        for index, (slide, audio) in enumerate(pairs, start=1):
            duration = ffprobe_duration(audio) + pad_seconds
            segment = tmp / f"segment-{index:04d}.mp4"
            vf = (
                f"scale={width}:{height}:force_original_aspect_ratio=decrease,"
                f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2,"
                "setsar=1"
            )
            cmd = [
                "ffmpeg",
                "-y",
                "-loop",
                "1",
                "-i",
                str(slide),
                "-t",
                f"{duration:.3f}",
                "-vf",
                vf,
                "-r",
                str(fps),
                "-pix_fmt",
                "yuv420p",
                "-c:v",
                "libx264",
                "-an",
                str(segment),
            ]
            run(cmd)
            segments.append(segment)

        segment_list.write_text("\n".join(quote_concat_path(p) for p in segments) + "\n", encoding="utf-8")
        audio_list.write_text("\n".join(quote_concat_path(audio) for _, audio in pairs) + "\n", encoding="utf-8")

        video_only = tmp / "video-only.mp4"
        joined_audio = tmp / "joined-audio.wav"
        final_audio = tmp / "final-audio.wav"

        run([
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(segment_list),
            "-c",
            "copy",
            str(video_only),
        ])

        run([
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(audio_list),
            str(joined_audio),
        ])

        if loudnorm:
            run(["ffmpeg", "-y", "-i", str(joined_audio), "-af", "loudnorm", str(final_audio)])
        else:
            final_audio = joined_audio

        total_duration = sum(ffprobe_duration(audio) + pad_seconds for _, audio in pairs)
        run([
            "ffmpeg",
            "-y",
            "-t",
            f"{total_duration:.3f}",
            "-i",
            str(video_only),
            "-i",
            str(final_audio),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest",
            str(out),
        ])


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slides-dir", type=Path, required=True, help="Directory containing rendered slide images")
    parser.add_argument("--audio-dir", type=Path, required=True, help="Directory containing per-slide audio files")
    parser.add_argument("--out", type=Path, required=True, help="Output MP4 path")
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--width", type=int, default=1920)
    parser.add_argument("--height", type=int, default=1080)
    parser.add_argument("--pad-seconds", type=float, default=0.0, help="Extra seconds to add after each slide's audio")
    parser.add_argument("--loudnorm", action="store_true", help="Normalize joined audio with ffmpeg loudnorm")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    pairs = match_slide_audio(args.slides_dir, args.audio_dir)
    build_video(
        pairs=pairs,
        out=args.out,
        fps=args.fps,
        width=args.width,
        height=args.height,
        pad_seconds=args.pad_seconds,
        loudnorm=args.loudnorm,
    )
    print(f"created {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
