---
name: ppt-narrated-video
description: Create narrated videos from slide decks.
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [PowerPoint, Video, TTS, FFmpeg, Presentation]
    category: media
    related_skills: [powerpoint]
---

# PPT Narrated Video Skill

Turn a topic or an existing slide deck into a narrated MP4 video with per-slide audio and duration-driven synchronization. This skill covers the production workflow and a helper script for assembling already-rendered slide images and audio; it does not perform factual research, voice cloning, or account publishing by itself.

## When to Use

Use this skill when the user asks for:

- a PPT or slide deck turned into a video;
- per-slide narration scripts and TTS audio;
- a synchronized lecture, explainer, or product-demo video;
- rebuilding a video from an existing PPT with a different voice.

Do not use this skill as the sole source for factual claims. If the topic needs current or sensitive facts, gather and verify the content first with the appropriate research workflow.

## Prerequisites

Install or make available:

- `terminal` access with Python 3.
- `ffmpeg` and `ffprobe` for video assembly and duration probing.
- LibreOffice `soffice` for PPTX to PDF conversion when starting from PPTX.
- A PDF/image renderer such as ImageMagick, Poppler, or the platform's preferred converter.
- Optional: Node.js plus `pptxgenjs` when generating PPTX programmatically.
- Optional: a configured TTS provider, for example:
  - OpenAI-compatible TTS: `TTS_BASE_URL`, `OPENAI_API_KEY`, `TTS_MODEL`, `TTS_VOICE`.
  - `edge-tts` fallback for local non-cloned narration.
- Optional: `image_generate` for slide imagery when the user requests generated visuals.

Use placeholders in reusable prompts and scripts. Never hardcode API keys, private voice IDs, chat IDs, personal local paths, or user-specific cloned-voice names in committed files.

## How to Run

From an existing deck plus narration:

1. Prepare a working directory, for example `~/work/ppt-video`.
2. Store narration text as `narration.json` or per-slide text files.
3. Convert the PPTX into slide images.
4. Generate one audio file per slide.
5. Assemble the final video with the helper script.

Example assembly call:

```bash
python skills/media/ppt-narrated-video/scripts/build_narrated_video.py \
  --slides-dir ~/work/ppt-video/slides \
  --audio-dir ~/work/ppt-video/audio \
  --out ~/work/ppt-video/final.mp4 \
  --width 1920 \
  --height 1080 \
  --fps 30 \
  --pad-seconds 0.15 \
  --loudnorm
```

When operating through Hermes, run shell commands with `terminal`, inspect files with `read_file`, discover files with `search_files`, and create or update artifacts with `write_file` or `patch`.

## Quick Reference

| Need | Recommended action |
| --- | --- |
| Create a deck from a topic | Draft outline, per-slide copy, narration, then generate PPTX with `pptxgenjs`. |
| Reuse an existing deck | Extract or ask for narration; convert PPTX to rendered slide images. |
| Add generated imagery | Use `image_generate`, then place images in the PPTX or directly on slides. |
| Change only the voice | Keep slide images; regenerate audio; rerun `build_narrated_video.py`. |
| Exact sync | Let audio duration drive each slide segment; do not use guessed durations. |
| Verify output | Probe final MP4 with `ffprobe`; compare duration to concatenated audio. |

## Procedure

### 1. Plan the slide structure

For a new video, create a compact slide plan:

- title and promise;
- problem or context;
- core mechanism;
- workflow or example;
- concrete benefits;
- cautions or limits;
- closing summary and call to action.

Write narration per slide separately from slide text. Slides should stay concise; narration can carry nuance.

A simple `narration.json` shape:

```json
[
  {"slide": 1, "title": "Title", "script": "Narration for slide one."},
  {"slide": 2, "title": "Problem", "script": "Narration for slide two."}
]
```

### 2. Generate or reuse the PPTX

For generated decks, use `pptxgenjs` and keep the deck 16:9. Prefer 1920×1080-safe layouts: large type, strong contrast, and limited text per slide.

For existing decks, do not rewrite content unless asked. Re-render the existing PPTX and only regenerate narration/audio.

### 3. Render slide images

Convert PPTX to PDF with LibreOffice, then PDF pages to images with the available renderer. Keep a stable numeric naming convention such as:

```text
slides/slide-01.jpg
slides/slide-02.jpg
slides/slide-03.jpg
```

The helper script sorts files by numeric order, so consistent numbering prevents mismatches.

### 4. Generate per-slide TTS audio

Generate exactly one audio file per rendered slide:

```text
audio/audio-01.wav
audio/audio-02.wav
audio/audio-03.wav
```

For OpenAI-compatible TTS, keep provider settings external:

```bash
export TTS_BASE_URL="https://example.invalid/v1"
export TTS_AUTH_TOKEN="..."
export TTS_MODEL="tts-model-name"
export TTS_VOICE="voice-name-or-id"
```

Then use the provider's SDK or REST API in a local, uncommitted script. For `edge-tts`, specify voice, rate, and pitch at runtime, not in committed secrets.

### 5. Assemble with audio-driven sync

Run `build_narrated_video.py`. The script probes each audio file, creates one still-image video segment per slide using that duration, concatenates all segments, concatenates the audio, and muxes them into a final MP4.

This is the key sync rule: slide duration comes from actual audio duration plus optional padding, never from estimated character counts.

### 6. Normalize and verify

Use `--loudnorm` when the source audio files have inconsistent loudness. After assembly, verify:

- final file exists and is playable;
- video stream is H.264;
- audio stream is AAC;
- resolution is 1920×1080 unless the user requested otherwise;
- total duration matches concatenated audio within a small tolerance.

### 7. Deliver

If the user asks to send the final file through a messaging platform, include it as a media attachment in the final message, for example `MEDIA:/path/to/final.mp4`.

## Pitfalls

- **Mismatched counts:** the script requires the same number of slide images and audio files.
- **Bad sort order:** `slide-10.jpg` can appear before `slide-2.jpg` in lexicographic order; use numeric names.
- **Guessed timings drift:** do not assign fixed five-second durations when narration length varies.
- **Provider lock-in:** keep TTS provider details in environment variables or local scripts, not in the skill.
- **Secret leakage:** scan new files before committing for API keys, private paths, chat IDs, voice clone IDs, and access tokens.
- **Unreadable slides:** video compression punishes tiny text; use large type and high contrast.
- **First LibreOffice run:** allow a longer timeout on the first conversion because profile initialization can be slow.

## Verification

Run the focused test for the helper script:

```bash
scripts/run_tests.sh tests/skills/test_ppt_narrated_video_skill.py -q
```

Run a local secret scan over the new skill files before publishing. Check for credential-shaped strings, private home-directory paths, platform message IDs, provider-specific cloned-voice IDs, and user names. Keep examples generic and placeholder-based.

Probe the final video when producing a real artifact:

```bash
ffprobe -v quiet -show_entries stream=codec_type,codec_name,width,height,duration -of json ~/work/ppt-video/final.mp4
```
