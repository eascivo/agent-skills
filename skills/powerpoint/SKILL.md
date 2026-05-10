# Powerpoint Skill

> **AI-powered PPT generation skill** — Create stunning presentations programmatically using PptxGenJS. Designed for use with AI coding agents (Claude Code, Cursor, Hermes Agent, etc.).

## When to use

Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presentations; reading, parsing, or extracting text from any .pptx file; editing, modifying, or updating existing presentations; combining or splitting slide files; working with templates, layouts, speaker notes, or comments.

## Quick Reference

| Task | Guide |
|------|-------|
| Read/analyze content | `python -m markitdown presentation.pptx` |
| Edit or create from template | Read [editing.md](editing.md) |
| Create from scratch | Read [pptxgenjs.md](pptxgenjs.md) |
| 杂志编辑风 (Magazine Editorial) | Read [references/magazine-editorial-style.md](references/magazine-editorial-style.md) |


## Visual Style Reference

**默认风格：融合暗色（Fusion Dark）** — 参考 `references/fusion-dark-style.md`（深空黑 `#0A0E17` + 电光蓝/珊瑚红/暖金三色系统 + 不对称布局 + 数据可视化。融合影视飓风电影感 + 半佛大字报 + 何同学干净数据）

When choosing a visual style, consult these references:

| Resource | Description |
|----------|-------------|
| **[references/minimalist-design-reference.md](references/minimalist-design-reference.md)** | **简约设计体系**：6位大师（Rams/Vignelli/Müller-Brockmann/Ive/Bierut/Sagmeister）、6大原则、5套配色、字体推荐、布局模板 |
| [references/design-principles.md](references/design-principles.md) | Evidence-based design rules: assertion-evidence framework, 5/5/5 rule, color systems, typography |
| [references/proven-layout-patterns.md](references/proven-layout-patterns.md) | 经验证的幻灯片布局模式 |
| [references/magazine-editorial-style.md](references/magazine-editorial-style.md) | 杂志编辑风格指南 |
| [references/pentagram-editorial-pptx.md](references/pentagram-editorial-pptx.md) | Pentagram 编辑风 PPT 参考 |
| [references/tech-color-palette.md](references/tech-color-palette.md) | 科技主题配色方案 |
| **[references/apple-keynote-dark-style.md](references/apple-keynote-dark-style.md)** | **Apple/Tesla 发布会风格**：纯黑背景、超大字号、一页一信息、电影感留白、完整配色系统+8种页面模板 |
| **[references/fusion-dark-style.md](references/fusion-dark-style.md)** | **融合暗色风格**：影视飓风电影感+半佛大字报+何同学数据可视化。深空黑 `#0A0E17`、多色系统、不对称布局、10种页面模板+代码片段 |

**Quick style recommendation by topic:**

| Topic | 推荐方案 |
|-------|---------|\n| **通用/内容/科技（默认首选）** | **Fusion Dark**（深空黑+多色+数据可视化+大字报）→ 读 [fusion-dark-style.md](references/fusion-dark-style.md) |
| **内容创业/商业分析/数据驱动** | **Fusion Dark**（深空黑+多色+数据可视化+大字报）→ 读 [fusion-dark-style.md](references/fusion-dark-style.md) |
| 通用/商务（亮色偏好） | 方案A 经典黑白 或 方案E 高端商务 |
| 文化/创意 | 方案C 温暖极简（米色暖调）|
| 数据/报告 | 方案D 瑞士国际风格（高对比度）|
| 投资/融资路演 | Apple Keynote Dark 或 高端商务 |

---

## Reading Content

```bash
# Text extraction (reliable — python-pptx)
python3 -c "
from pptx import Presentation
prs = Presentation('presentation.pptx')
for i, slide in enumerate(prs.slides):
    print(f'--- Slide {i+1} ---')
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                t = para.text.strip()
                if t: print(t)
"

# Visual overview
python scripts/thumbnail.py presentation.pptx

# Raw XML
python scripts/office/unpack.py presentation.pptx unpacked/
```

---

## Editing Workflow

**Read [editing.md](editing.md) for full details.**

1. Analyze template with `thumbnail.py`
2. Unpack → manipulate slides → edit content → clean → pack



## Creating from Scratch

**Read [pptxgenjs.md](pptxgenjs.md) for full details.**

Use when no template or reference presentation is available.

---

## Design Ideas

**Don't create boring slides.** Plain bullets on a white background won't impress anyone. Consider ideas from this list for each slide.

### Before Starting

- **Pick a bold, content-informed color palette**: The palette should feel designed for THIS topic. If swapping your colors into a completely different presentation would still "work," you haven't made specific enough choices.
- **Dominance over equality**: One color should dominate (60-70% visual weight), with 1-2 supporting tones and one sharp accent. Never give all colors equal weight.
- **Dark/light contrast**: Dark backgrounds for title + conclusion slides, light for content ("sandwich" structure). Or commit to dark throughout for a premium feel.
- **Commit to a visual motif**: Pick ONE distinctive element and repeat it — rounded image frames, icons in colored circles, thick single-side borders. Carry it across every slide.

> **For deeper design theory** (assertion-evidence framework, 5/5/5 rule, typography systems, color 60-30-10, whitespace principles): read [references/design-principles.md](references/design-principles.md).

### Color Palettes

Choose colors that match your topic — don't default to generic blue. Use these palettes as inspiration:

| Theme | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| **Midnight Executive** | `1E2761` (navy) | `CADCFC` (ice blue) | `FFFFFF` (white) |
| **Forest & Moss** | `2C5F2D` (forest) | `97BC62` (moss) | `F5F5F5` (cream) |
| **Coral Energy** | `F96167` (coral) | `F9E795` (gold) | `2F3C7E` (navy) |
| **Warm Terracotta** | `B85042` (terracotta) | `E7E8D1` (sand) | `A7BEAE` (sage) |
| **Ocean Gradient** | `065A82` (deep blue) | `1C7293` (teal) | `21295C` (midnight) |
| **Charcoal Minimal** | `36454F` (charcoal) | `F2F2F2` (off-white) | `212121` (black) |
| **Teal Trust** | `028090` (teal) | `00A896` (seafoam) | `02C39A` (mint) |
| **Berry & Cream** | `6D2E46` (berry) | `A26769` (dusty rose) | `ECE2D0` (cream) |
| **Sage Calm** | `84B59F` (sage) | `69A297` (eucalyptus) | `50808E` (slate) |
| **Cherry Bold** | `990011` (cherry) | `FCF6F5` (off-white) | `2F3C7E` (navy) |

### For Each Slide

**Every slide needs a visual element** — image, chart, icon, or shape. Text-only slides are forgettable.

**Layout options:**
- Two-column (text left, illustration on right)
- Icon + text rows (icon in colored circle, bold header, description below)
- 2x2 or 2x3 grid (image on one side, grid of content blocks on other)
- Half-bleed image (full left or right side) with content overlay

**Data display:**
- Large stat callouts (big numbers 60-72pt with small labels below)
- Comparison columns (before/after, pros/cons, side-by-side options)
- Timeline or process flow (numbered steps, arrows)

**Visual polish:**
- Icons in small colored circles next to section headers
- Italic accent text for key stats or taglines

### Typography & Spacing

**Choose an interesting font pairing** — don't default to Arial. Pick a header font with personality and pair it with a clean body font. See [design-principles.md §Typography](references/design-principles.md) for full font recommendations and 2026 trends.

| Element | Size |
|---------|------|
| Slide title | 36-44pt bold |
| Section header | 20-24pt bold |
| Body text | 14-16pt |
| Captions | 10-12pt muted |

Spacing: 0.5" minimum margins, 0.3-0.5" between content blocks. Leave breathing room.

### Visual Style: 杂志编辑风 (Magazine Editorial)

用户明确偏好此风格。适用于宣传片、品牌介绍、高端内容。

**核心原则：**
- 大留白（≥30%空白区域）
- 超大字体标题（48-96pt）
- 全出血背景图 + 暗色 overlay
- 图片占比高（≥40%画面面积）
- 极简装饰：一条金色细线、一个角标、页码
- 左右分栏：文字区 + 大图区

**典型页面类型：**
1. **封面**：全出血图 + 居中/左对超大标题 + overlay 0.5-0.6
2. **声明页**：纯色背景 + 超大文字（60-80pt）+ 右侧大图裁切
3. **数据冲击页**：全出血图 + overlay + 超大数字（72-100pt）
4. **三栏优势页**：浅色背景 + 3列编号卡片 + 底部引言暗色条
5. **工具矩阵页**：暗色背景 + 左侧大字 + 右侧半透明条目
6. **引言页**：全出血大景 + 居中引言文字 + shadow
7. **步骤页**：浅色背景 + 左图右步骤列表
8. **CTA结尾页**：全出血图 + overlay + 金色按钮 CTA

**配色公式：**
- 背景：纯白 `FFFFFF` 或 纯黑 `1A1A1A` 或 全出血图
- 文字：深黑 `1A1A1A`（亮底）或 纯白 `FFFFFF`（暗底）
- 强调色：金色 `FFD700`（细线/数字/标签）
- 辅助色：红色 `FF3B4F`（pill badge）、灰色 `999999`（角标/页码）

**避免：** 暗色毛玻璃/科技风（用户明确反感）、小卡片密集排列、渐变色块背景。

详见 [references/magazine-editorial-style.md](references/magazine-editorial-style.md) 完整模板。

### Visual Style: Apple Keynote Dark（用户首选暗色风格）

苹果/特斯拉发布会级别——**克制但有冲击力**。用户明确要求"苹果、特斯拉的简约风格"。

**核心：** 纯黑 `#000000` 背景、Apple 蓝 `#2997FF` 强调、Helvetica Neue、一页一个核心信息、关键数据 60-96pt。

**适用：** 科技/产品/商业/数据类 PPT，需要高端专业感的场景。

**8种页面模板：** 封面（左对+蓝竖线）、数据冲击页（96pt大数字）、大陈述页（居中宣言）、卡片矩阵（2×3暗色卡片）、流程步骤（编号圆圈+连接线）、数据条（半透明条形图）、统计列（三列大数字）、CTA收尾页。

详见 [references/apple-keynote-dark-style.md](references/apple-keynote-dark-style.md) 完整配色系统 + 页面模板 + 设计禁忌。

### AI 插画增强工作流

用 CogView MCP 生成 AI 插画，嵌入 PptxGenJS 作为全出血背景或配图。

**流程：**
1. 每个核心场景生成一张插画（prompt: "Magazine editorial photography: ..." + 场景描述）
2. 保存到 `/tmp/ppt-advanced/images/` 或项目目录
3. 在 PptxGenJS 中用 `slide.background = { path: imgPath }` 设置全出血图
4. 叠加暗色 overlay（transparency 70-85%）+ 文字内容

**prompt 模板：** `Magazine editorial photography: [场景描述], [光影/构图要求], premium magazine quality, no text`

**注意：** 生成 6-8 张插画约需 3-5 分钟，与 PPTX 编写并行。

### Avoid (Common Mistakes)

- **Don't repeat the same layout** — vary columns, cards, and callouts across slides
- **Don't center body text** — left-align paragraphs and lists; center only titles
- **Don't skimp on size contrast** — titles need 36pt+ to stand out from 14-16pt body
- **Don't default to blue** — pick colors that reflect the specific topic
- **Don't mix spacing randomly** — choose 0.3" or 0.5" gaps and use consistently
- **Don't style one slide and leave the rest plain** — commit fully or keep it simple throughout
- **Don't create text-only slides** — add images, icons, charts, or visual elements; avoid plain title + bullets
- **Don't forget text box padding** — when aligning lines or shapes with text edges, set `margin: 0` on the text box or offset the shape to account for padding
- **Don't use low-contrast elements** — icons AND text need strong contrast against the background; avoid light text on light backgrounds or dark text on dark backgrounds
- **NEVER use accent lines under titles** — these are a hallmark of AI-generated slides; use whitespace or background color instead
- **NEVER use dark glass-morphism/tech style** — 用户明确反感暗色毛玻璃风格（"风格真差"）。用杂志编辑风或纯色简洁风

---

## New PPT Checklist

Before writing any PptxGenJS code, run through this checklist:

### Pre-flight
- [ ] **Read ALL linked_files** — don't just load SKILL.md. Check `references/` for style guides and platform-specific gotchas
- [ ] **Choose topic-specific palette** — never default to generic blue. Pick from SKILL.md palette table or derive from the topic
- [ ] **Plan layout variety** — don't repeat the same card grid on every slide. Alternate between: 2-column, timeline, comparison, icon rows, stat callouts
- [ ] **Decide icon strategy upfront** — use react-icons + sharp (not emoji — inconsistent across platforms). Pre-render all icons before building slides

### During Build
- [ ] **Extract layout helpers** — if 3+ slides share a card/list/step pattern, write a `card()`, `stepFlow()`, or `iconRow()` function. Don't copy-paste x/y/w/h 9 times
- [ ] **Never reuse option objects** — PptxGenJS mutates in-place. Use factory functions: `const mkShadow = () => ({...})`
- [ ] **Every slide needs a visual element** — text-only slides are forgettable. Add shapes, icons, diagrams, or color blocks
- [ ] **Margin ≥ 0.5"** from all slide edges, ≥ 0.3" between content blocks
- [ ] **NEVER use `#` prefix on hex colors**, `bullet: true` not `•`, `breakLine: true` between text array items

### Post-build QA
- [ ] **Convert to per-slide images** (LibreOffice `soffice → pdftoppm` or `qlmanage` as fallback)
- [ ] **Use subagent for visual QA** — you wrote the code, you see what you expect. Delegate `vision_analyze` to a fresh pair of eyes
- [ ] **At least one fix-and-verify cycle** before declaring done

### Delivery
- [ ] **Copy to user-accessible location** — `cp file.pptx ~/Desktop/` or the project directory for easy access

---

## QA (Required)

**Assume there are problems. Your job is to find them.**

Your first render is almost never correct. Approach QA as a bug hunt, not a confirmation step. If you found zero issues on first inspection, you weren't looking hard enough.

### Content QA

```bash
# Text extraction (python-pptx, always works)
python3 -c "
from pptx import Presentation
prs = Presentation('output.pptx')
for i, slide in enumerate(prs.slides):
    print(f'--- Slide {i+1} ---')
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                t = para.text.strip()
                if t: print(t)
"
```

Check for missing content, typos, wrong order.

**When using templates, check for leftover placeholder text:**

```bash
python3 -c "
from pptx import Presentation
prs = Presentation('output.pptx')
for i, slide in enumerate(prs.slides):
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                t = para.text.strip()
                if t and any(kw in t.lower() for kw in ['xxxx','lorem','ipsum','this.*(page|slide).*layout']):
                    print(f'Slide {i+1}: PLACEHOLDER FOUND: {t}')
"
```

### Visual QA

**⚠️ USE SUBAGENTS** — even for 2-3 slides. You've been staring at the code and will see what you expect, not what they have. Subagents have fresh eyes.

**⚠️ vision_analyze timeout mitigation:** If vision analysis times out, compress images first: `ffmpeg -i frame.jpg -vf "scale=480:270" -q:v 8 frame_sm.jpg`. Full-resolution images (>500KB) frequently cause timeouts. Keep prompts short for speed.

Convert slides to images (see [Converting to Images](#converting-to-images)), then use this prompt:
> **Pitfall: `scripts/office/soffice.py` may not exist.** If it's missing, use `soffice` CLI directly (if LibreOffice is installed) or `qlmanage` for a quick cover-only preview:
> ```bash
> # Direct soffice (preferred, generates per-slide images):
> soffice --headless --convert-to pdf output.pptx --outdir /tmp
> pdftoppm -jpeg -r 150 /tmp/output.pdf /tmp/slide
>
> # qlmanage fallback (cover slide only, no LibreOffice needed):
> qlmanage -t -s 1920 -o /tmp output.pptx
> ```
> `qlmanage` only produces one thumbnail (the first slide). For full QA, install LibreOffice via `brew install --cask libreoffice`.

```
Visually inspect these slides. Assume there are issues — find them.

Look for:
- Overlapping elements (text through shapes, lines through words, stacked elements)
- Text overflow or cut off at edges/box boundaries
- Decorative lines positioned for single-line text but title wrapped to two lines
- Source citations or footers colliding with content above
- Elements too close (< 0.3" gaps) or cards/sections nearly touching
- Uneven gaps (large empty area in one place, cramped in another)
- Insufficient margin from slide edges (< 0.5")
- Columns or similar elements not aligned consistently
- Low-contrast text (e.g., light gray text on cream-colored background)
- Low-contrast icons (e.g., dark icons on dark backgrounds without a contrasting circle)
- Text boxes too narrow causing excessive wrapping
- Leftover placeholder content

For each slide, list issues or areas of concern, even if minor.

Read and analyze these images:
1. /path/to/slide-01.jpg (Expected: [brief description])
2. /path/to/slide-02.jpg (Expected: [brief description])

Report ALL issues found, including minor ones.
```

### Verification Loop

1. Generate slides → Convert to images → Inspect
2. **List issues found** (if none found, look again more critically)
3. Fix issues
4. **Re-verify affected slides** — one fix often creates another problem
5. Repeat until a full pass reveals no new issues

**Do not declare success until you've completed at least one fix-and-verify cycle.**

---

## Converting to Images

Convert presentations to individual slide images for visual inspection:

```bash
# Preferred: soffice CLI directly (if LibreOffice is installed)
soffice --headless --convert-to pdf output.pptx --outdir /tmp
pdftoppm -jpeg -r 150 /tmp/output.pdf slide
# Produces slide-01.jpg, slide-02.jpg, etc.

# Re-render specific slides after fixes:
pdftoppm -jpeg -r 150 -f N -l N output.pdf slide-fixed
```

### Quick Preview Without LibreOffice

If LibreOffice isn't installed, use macOS `qlmanage` for a fast cover-only check:
```bash
qlmanage -t -s 1920 -o /tmp output.pptx
# Produces output.pptx.png (first slide only)
```

> **Note:** `qlmanage` only renders the first slide. For full visual QA, LibreOffice is required.

---

## Pitfall: python-pptx `line_spacing` EMU vs Points

`Pt()` returns **EMU values** (English Metric Units), not raw point numbers. `int(Pt(13))` = `165100`, not `13`.

**Problem:** If you pass a raw int (like `int(size) + 6` where `size = Pt(13)`) to `paragraph.line_spacing`, python-pptx interprets it as a **percentage** (`set_spcPct`), which only accepts 0-132. This crashes with `ValueError: value must be in range 0.0 to 132.0`.

**Fix:** Always wrap in `Pt()` and convert EMU back to points first:
```python
# WRONG — triggers percentage mode, crashes
p.line_spacing = int(size) + 6           # 165106 → spcPct range error

# CORRECT — triggers point mode
p.line_spacing = Pt(int(size) // 12700 + 6)  # Pt(19) = 241300 EMU ✓
```

**Rule of thumb:** `1 point = 12700 EMU`. To extract point value from a `Pt` object: `int(pt_obj) // 12700`.

**Also:** `Pt(int(Pt(13)) + 6)` = `Pt(165106)` = `2,096,846,200` EMU — this exceeds the max (20,116,800) and crashes differently. Never nest `Pt()` around an already-EMU value.

---

## Pitfall: Chinese Curly Quotes in Python Strings

Chinese text often contains `""` (U+201C/U+201D) and `''` (U+2018/U+2019). These **break Python string literals** when used inside double-quoted strings:

```python
# CRASHES — SyntaxError: invalid syntax
text = "从"副驾驶"到"自主员工""

# WRONG FIX — still crashes, the outer quotes are the problem
text = "从\"副驾驶\"到\"自主员工\""  # ASCII quotes look wrong in Chinese text

# CORRECT — use single-quoted Python strings for Chinese text with curly quotes
text = '从"副驾驶"到"自主员工"'

# CORRECT — use unicode escapes in double-quoted strings
text = "从\u201c副驾驶\u201d到\u201c自主员工\u201d"
```

**Rule:** When writing python-pptx scripts with Chinese content, use **single-quoted Python strings** (`'...'`) as the default for any text that might contain Chinese curly quotes. Reserve double-quoted strings for JSON or ASCII-only content.

---

## Pitfall: pptxgenjs Module Resolution

When running pptxgenjs scripts from `/tmp/` or other non-project directories, global npm modules (`pptxgenjs`, `react-icons`, `sharp`) won't resolve. Fix: set `NODE_PATH=/usr/local/lib/node_modules` or `npm install pptxgenjs` locally in the working directory.

**Simpler alternative**: Use emoji instead of react-icons. Zero extra dependencies, renders natively in PowerPoint, and avoids the entire `react`/`sharp`/`NODE_PATH` issue. Only use react-icons when pixel-perfect icon quality is critical (external-facing decks).

---

## Pitfall: pptxgenjs `slide.background` vs Shape `fill`

`slide.background` and shape `fill` use different syntaxes:

```javascript
// Background: { color } only, NOT { fill: { ... } }
slide.background = { color: "FF3B4F" };          // ✅ CORRECT
slide.background = { fill: { type: "solid", color: "FF3B4F" };  // ❌ CRASHES

// Shape fill: { color } or { type, color }
shape.fill = { color: "FFFFFF" };                // ✅ both work
shape.fill = { type: "solid", color: "FFFFFF" }; // ✅ both work
```

Passing `{ fill: { ... } }` to `slide.background` causes: `TypeError: (colorStr || "").replace is not a function` because `genXmlColorSelection()` receives the fill object instead of a string color.

## Pitfall: soffice PPTX→PNG only outputs first slide

`soffice --headless --convert-to png` for .pptx files produces a **single PNG of the first slide only**. This is a LibreOffice limitation with Impress → PNG export.

**Fix:** Always convert PPTX → PDF first, then PDF → per-slide images:
```bash
soffice --headless --convert-to pdf output.pptx --outdir /tmp
pdftoppm -jpeg -r 150 /tmp/output.pdf /tmp/slide
```

The PDF intermediate step is required for multi-slide rendering. Direct PPTX→PNG only gives slide 1.

---

## Pitfall: react-icons bare reference after pre-generation

When pre-generating icons into an `icons` object (e.g., `const icons = { brain: await iconToBase64Png(...) }`), referencing them later as bare variable names crashes:
```javascript
const icons = { users: await iconToBase64Png(FaUsers, ...) };
// Later in a data structure:
{ icon: users }     // ❌ ReferenceError: users is not defined
{ icon: icons.users }  // ✅ CORRECT
```

This is easy to miss because the icon import (`const { FaUsers } = require(...)`) exists at the top, so the bare name "looks right" but it's not the same object — the pre-generated base64 string is under `icons.users`.

---

## Pitfall: PptxGenJS text box too narrow for large numbers

When displaying numbered labels like "01", "02", "03" with large font sizes (24pt+), the text box width must accommodate the full number on one line. A narrow width causes digits to wrap:

```javascript
// WRONG — "01" wraps to "0" on line 1, "1" on line 2
s.addText(d.num, {
  x: xPos + 0.2, y: 2.2, w: 0.6, h: 0.4,   // w:0.6 too narrow
  fontSize: 28, color: C.blue, bold: true,
});

// CORRECT — "01" stays on one line
s.addText(d.num, {
  x: xPos + 0.2, y: 2.15, w: 1.2, h: 0.5,   // w:1.2 for fontSize 24+
  fontSize: 24, color: C.blue, bold: true,
});
```

**Rule:** For `fontSize ≥ 20` with multi-character text (numbers, abbreviations), set `w ≥ fontSize × 0.05`. When in doubt, make the box wider than needed — extra space is invisible, wrapping is obvious.

---

## Pitfall: pptxgenjs `letterSpacing` crashes (v4.x)

`letterSpacing` is not a valid property in PptxGenJS v4.x and causes `TypeError`. Use `charSpacing` instead:

```javascript
letterSpacing: 8   // ❌ CRASHES in v4.x
charSpacing: 8     // ✅ CORRECT
```

## Delivering Files

After generating the PPTX, copy it to a user-accessible location:
```bash
cp output.pptx ~/Desktop/
```

---

## Creating PPT from Video Content

When the user wants a PPT based on an existing video (e.g., "根据这个视频做个PPT"), first extract and analyze the video content. See [references/video-content-extraction.md](references/video-content-extraction.md) for the full workflow: keyframe extraction → compressed vision analysis → content outline → PPT generation.

---

## Dependencies

- `pip install python-pptx` - text extraction and content QA (reliable, always works)
- `pip install Pillow` - thumbnail grids
- `npm install -g pptxgenjs` - creating from scratch
- LibreOffice (`soffice`) - PDF conversion (auto-configured for sandboxed environments via `scripts/office/soffice.py`)
- Poppler (`pdftoppm`) - PDF to images
