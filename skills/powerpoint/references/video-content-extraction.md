# Video → PPT Content Extraction

When the user wants a PPT based on an existing video, you need to extract and understand the video's content first.

## Workflow

```
Video file → ffmpeg keyframe extraction → compress → vision_analyze → content outline → build PPT
```

## Step 1: Extract Keyframes

Use ffmpeg to grab frames at regular intervals:

```bash
mkdir -p /tmp/frames

# Method A: Uniform sampling (fast, works for most videos)
# Calculate interval: duration_seconds / num_frames_wanted
# e.g., 48min video, 15 frames → 192s apart
for i in $(seq 0 14); do
  ts=$(echo "$i * 192" | bc)
  ts_str=$(printf "%02d:%02d:%02d" $((ts/3600)) $(((ts%3600)/60)) $((ts%60)))
  ffmpeg -y -ss "$ts_str" -i "input.mp4" -frames:v 1 -q:v 2 "/tmp/frames/frame_$(printf '%03d' $((i+1))).jpg" 2>/dev/null
done
```

**Prefer Method A** (`-ss` seek) over `select` filter — the filter often produces identical frames.

## Step 2: Compress for Vision Analysis

**⚠️ CRITICAL: `vision_analyze` times out on full-resolution images (>500KB).** Always compress before sending:

```bash
for f in /tmp/frames/frame_*.jpg; do
  ffmpeg -y -i "$f" -vf "scale=480:270" -q:v 8 "${f%.jpg}_sm.jpg" 2>/dev/null
done
```

- `scale=480:270` — small enough to avoid timeout, large enough to read text
- `-q:v 8` — moderate JPEG quality (produces ~20-50KB files)
- Use `_sm` suffix to distinguish from originals

## Step 3: Vision Analysis

Analyze compressed frames one at a time (parallel calls may trigger rate limiting):

```
vision_analyze("/tmp/frames/frame_001_sm.jpg", "Brief: what's on screen? Text, topic, content.")
```

**Tips:**
- Keep prompts short for speed: "Brief: text, topic, content on screen"
- If one call times out, wait a moment and retry
- Don't send more than 2-3 parallel calls — rate limiting causes cascading failures
- Start with frame 1, middle, and end to get the arc, then fill in specifics

## Step 4: Build Content Outline

From the vision analysis results, construct:
- Video topic and purpose
- Key sections/timestamps
- Any text, data, or charts visible
- Speaker/creator style cues

Then proceed with normal PPT generation (pptxgenjs or python-pptx).

## Audio Extraction (Optional)

If the video has spoken content you need to transcribe:

```bash
# Extract audio segment
ffmpeg -y -i "input.mp4" -ss 00:00:00 -t 180 -vn -acodec pcm_s16le -ar 16000 -ac 1 /tmp/audio_clip.wav

# Transcribe with whisper (if available)
whisper /tmp/audio_clip.wav --model tiny --language zh --output_format txt --output_dir /tmp/
```

**⚠️ whisper may fail** due to numpy/torch version conflicts on macOS. If whisper isn't available:
- Try MiMo ASR (`mimo-v2-omni` with `input_audio`)
- Fall back to vision-only analysis (usually sufficient for PPT creation)

## JianyingPro (剪映) Project Files

剪映 project files at `~/movies/JianyingPro/` are **encrypted** — cannot extract text/subtitles from `draft_content.json` or `draft_info.json`. Don't waste time trying to parse them.
