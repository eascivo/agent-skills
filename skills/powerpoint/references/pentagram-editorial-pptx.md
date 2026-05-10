# Pentagram Editorial Style — python-pptx Implementation

Battle-tested python-pptx code for the Pentagram Editorial design system. All native shapes, fully editable.

## Design System

```
Background:    WHITE (#FFFFFF)
Primary Text:  BLACK (#1A1A1A)
Body Text:     MID_GRAY (#333333)
Caption:       GRAY (#666666), LIGHT_GRAY (#999999)
Accent:        RED (#E63946)
Card BG:       OFF_WHITE (#F7F7F7)
Dark Card BG:  DARK_BG (#1A1A1A)
Dark Text:     DARK_TEXT (#FFFFFF)
```

## Key Layout Parameters

```python
prs.slide_width = Inches(13.333)   # 16:9 widescreen
prs.slide_height = Inches(7.5)
MARGIN_L = Inches(0.8)
MARGIN_R = Inches(0.8)
MARGIN_T = Inches(0.7)
SLIDE_W = prs.slide_width - MARGIN_L - MARGIN_R
```

## Reusable Component Patterns

### Accent Bar (top/bottom)
```python
shp = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, Pt(4))
shp.fill.solid(); shp.fill.fore_color.rgb = RED; shp.line.fill.background()
```

### Tag / Section Label
```python
txBox = slide.shapes.add_textbox(left, top, Inches(5), Pt(16))
p = txBox.text_frame.paragraphs[0]
p.text = "01 / SECTION NAME"
p.font.size = Pt(10); p.font.bold = True; p.font.color.rgb = RED
p.font.letter_spacing = Pt(2)
```

### Title with Accent Word
```python
p = tf.paragraphs[0]; p.line_spacing = Pt(42)
r1 = p.add_run(); r1.text = "Normal text "; r1.font.size = Pt(34); r1.font.bold = True; r1.font.color.rgb = BLACK
r2 = p.add_run(); r2.text = "ACCENT"; r2.font.size = Pt(34); r2.font.bold = True; r2.font.color.rgb = RED
```

### Stat Card
```python
# Background card
card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
card.fill.solid(); card.fill.fore_color.rgb = OFF_WHITE; card.line.fill.background()
card.adjustments[0] = 0.02  # subtle corner rounding

# Number + unit (unit in accent color)
p = tf.paragraphs[0]
r1 = p.add_run(); r1.text = "108"; r1.font.size = Pt(36); r1.font.bold = True
r2 = p.add_run(); r2.text = "亿美元"; r2.font.size = Pt(20); r2.font.bold = True; r2.font.color.rgb = RED

# Label below
p2.text = "Description"; p2.font.size = Pt(11); p2.font.color.rgb = GRAY
```

### Card with Left Border Accent
```python
card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
card.fill.solid(); card.fill.fore_color.rgb = OFF_WHITE; card.line.fill.background()
bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, Pt(4), height)
bar.fill.solid(); bar.fill.fore_color.rgb = RED; bar.line.fill.background()
```

### Dark Quote Box
```python
card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
card.fill.solid(); card.fill.fore_color.rgb = RGBColor(0x1A, 0x1A, 0x1A)
# Text in DARK_TEXT (white), accent words in RED
```

### Divider Line
```python
shp = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, Inches(0.6), Pt(3))
shp.fill.solid(); shp.fill.fore_color.rgb = RED; shp.line.fill.background()
```

## Slide Layout Patterns

### Cover Slide
- Top/bottom accent bars
- Centered title (split across 2 lines, second line in accent color)
- Subtitle below divider line
- Caption at bottom

### Data Slide (left text + right stats)
- Left: tag, title, divider, 2 body paragraphs
- Right: 2–3 stat cards stacked vertically

### Card Grid (2×2 or 3×2)
- Cards with left border accent
- Year tag + title + description per card

### Numbered Cards (3 or 5 across)
- Cards with large number in accent color
- Title + description

### Industry Grid (3×2 icons)
- Small cards with emoji icon, title, description

### Timeline (2×2)
- 4 cards showing progression

### Quote/Highlight
- Dark background card with white text + red accent words

## Proven Build Script

A complete working example is at `/tmp/agent-trends-pentagram/build_pptx.py` (10 slides, Pentagram Editorial, 47KB output). Copy and customize.
