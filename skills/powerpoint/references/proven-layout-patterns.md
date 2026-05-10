# Proven Layout Patterns (PptxGenJS)

Battle-tested layout components from real client-facing presentations. Copy and adapt.

## Timeline Card with Accent Bar

The go-to card for itinerary items, agenda entries, or sequential content. Left accent bar creates visual hierarchy without being heavy.

```javascript
function addTimelineCard(slide, x, y, w, h, time, title, desc, accentColor) {
  const accent = accentColor || "C41E3A";
  // Card background with shadow
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "FFFFFF" },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 140, opacity: 0.10 }
  });
  // Left accent bar (thin, same height as card)
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: accent } });
  // Time badge (pill shape via rounded rect)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + 0.2, y: y + 0.12, w: 1.2, h: 0.28,
    fill: { color: accent }, rectRadius: 0.04
  });
  slide.addText(time, {
    x: x + 0.2, y: y + 0.12, w: 1.2, h: 0.28,
    fontSize: 9, color: "FFFFFF", fontFace: "Microsoft YaHei",
    bold: true, align: "center", valign: "middle", margin: 0
  });
  // Title (right of badge)
  slide.addText(title, {
    x: x + 1.55, y: y + 0.08, w: w - 1.8, h: 0.36,
    fontSize: 15, color: "2A2A38", fontFace: "Microsoft YaHei",
    bold: true, margin: 0, valign: "middle"
  });
  // Description (below title, use \n for line breaks)
  slide.addText(desc, {
    x: x + 0.25, y: y + 0.48, w: w - 0.5, h: h - 0.56,
    fontSize: 10, color: "6E6E80", fontFace: "Microsoft YaHei",
    margin: 0, valign: "top", lineSpacingMultiple: 1.45
  });
}
```

**When to use:** Itinerary days, agenda items, step-by-step flows, any sequential content.

**Typical sizing:**
- Full width: `w: 8.8, h: 1.65-1.85` (for main content)
- Half width: `w: 4.2-4.3, h: 1.6` (for side-by-side pair)
- Narrow: `w: 2.8-2.9, h: 1.5` (for sidebar/secondary)

---

## Dark Accent Card (Dinner / Tips / Callout)

Contrasts with white content cards. Use for special callouts, dinner recommendations, tips, or "did you know" sections.

```javascript
function addDarkCard(slide, x, y, w, h, title, subtitle, footer) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h,
    fill: { color: "1A1A2E" },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 140, opacity: 0.10 }
  });
  // Gold left accent (instead of red)
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: "D4A853" } });
  // Title in gold
  slide.addText(title, {
    x: x + 0.2, y: y + 0.12, w: w - 0.4, h: 0.35,
    fontSize: 14, color: "D4A853", fontFace: "Microsoft YaHei",
    bold: true, margin: 0, valign: "middle"
  });
  // Body in muted accent
  slide.addText(subtitle, {
    x: x + 0.2, y: y + 0.48, w: w - 0.4, h: h - 0.85,
    fontSize: 10, color: "E8D5B7", fontFace: "Microsoft YaHei",
    margin: 0, valign: "top", lineSpacingMultiple: 1.5
  });
  // Optional footer (e.g., price)
  if (footer) {
    slide.addText(footer, {
      x: x + 0.2, y: y + h - 0.32, w: w - 0.4, h: 0.25,
      fontSize: 9, color: "6E6E80", fontFace: "Microsoft YaHei",
      margin: 0, valign: "middle"
    });
  }
}
```

**When to use:** Highlight a meal, call out a tip, or break up a row of identical white cards.

---

## Consistent Header + Footer

Dark header bar at top, red footer bar at bottom. Creates a professional "branded" frame.

```javascript
const TOTAL = 10; // total slide count

function addHeader(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.15, fill: { color: "1A1A2E" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.52, w: 0.5, h: 0.035, fill: { color: "D4A853" } });
  slide.addText(title, {
    x: 0.6, y: 0.1, w: 8.8, h: 0.5,
    fontSize: 26, color: "FFFFFF", fontFace: "Microsoft YaHei",
    bold: true, margin: 0, valign: "bottom"
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 0.6, w: 8.8, h: 0.4,
      fontSize: 12, color: "E8D5B7", fontFace: "Microsoft YaHei",
      margin: 0, valign: "top"
    });
  }
}

function addFooter(slide, num) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.28, w: 10, h: 0.345, fill: { color: "C41E3A" } });
  slide.addText("Presentation Subtitle", {
    x: 0.6, y: 5.28, w: 4, h: 0.345,
    fontSize: 8.5, color: "FFFFFF", fontFace: "Microsoft YaHei",
    margin: 0, valign: "middle"
  });
  slide.addText(`${num} / ${TOTAL}`, {
    x: 7.8, y: 5.28, w: 1.6, h: 0.345,
    fontSize: 8.5, color: "FFFFFF", fontFace: "Arial",
    align: "right", margin: 0, valign: "middle"
  });
}
```

**Key dimensions:** Header 1.15" tall, footer starts at y:5.28 (0.345" tall). Content area: y 1.3 to 5.2 (~3.9" usable).

---

## 3×2 Card Grid (Food / Tips / Features)

Clean grid of equal-sized cards with icon, title, description, and optional price.

```javascript
const positions = [
  [0.6, 1.45], [3.55, 1.45], [6.5, 1.45],  // top row
  [0.6, 3.35], [3.55, 3.35], [6.5, 3.35],  // bottom row
];

items.forEach((item, i) => {
  const [x, y] = positions[i];
  const cardW = 2.75, cardH = 1.65;
  // White card
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: cardH,
    fill: { color: "FFFFFF" },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 140, opacity: 0.10 }
  });
  // Icon header band
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: 0.55, fill: { color: "F7F2EC" } });
  slide.addText(item.icon, {
    x, y, w: cardW, h: 0.55,
    fontSize: 26, align: "center", valign: "middle", margin: 0
  });
  // Title
  slide.addText(item.name, {
    x: x + 0.15, y: y + 0.58, w: cardW - 0.3, h: 0.28,
    fontSize: 13, color: "C41E3A", fontFace: "Microsoft YaHei",
    bold: true, margin: 0, valign: "middle"
  });
  // Description
  slide.addText(item.desc, {
    x: x + 0.15, y: y + 0.88, w: cardW - 0.3, h: 0.55,
    fontSize: 8.5, color: "6E6E80", fontFace: "Microsoft YaHei",
    margin: 0, valign: "top", lineSpacingMultiple: 1.4
  });
  // Optional price/tag
  slide.addText(item.price, {
    x: x + 0.15, y: y + 1.4, w: cardW - 0.3, h: 0.2,
    fontSize: 8, color: "D4A853", fontFace: "Microsoft YaHei",
    bold: true, margin: 0, valign: "middle"
  });
});
```

**Typical grid spacing:** 0.6" left margin, 0.2" gaps between cards (card width 2.75" × 3 = 8.25" + 0.4" gaps + 0.6" margin = 9.25" < 10").

---

## Pitfalls from Real Sessions

1. **Full-width helpers + narrow cards = overlap.** If you have a full-width `addInfoBox` and also place narrow cards at the same Y coordinate, they overlap. Either: (a) make all elements at that Y the same width, or (b) stack vertically with enough spacing.

2. **Shadow factory functions are mandatory.** PptxGenJS mutates shadow objects in-place. Always use `() => ({...})` factories — never share a shadow config between two `addShape` calls.

3. **Footer at y:5.28, not y:5.25.** The content area on a 16:9 slide (5.625" tall) is effectively 1.15" (header) to 5.28" (footer top) = ~4.13" usable. Plan layouts within this zone.

4. **`margin: 0` on text boxes** when they need to align with shapes/icons. Default text box padding shifts text by ~3-5pt relative to shapes at the same coordinates.

5. **`lineSpacingMultiple: 1.4-1.5`** is the sweet spot for body text in cards. Default line spacing can feel cramped in Chinese text.

6. **Chinese font: `Microsoft YaHei`** on macOS renders well. Fallback: `PingFang SC`. For the cover title, `Microsoft YaHei` bold at 40-52pt looks authoritative.
