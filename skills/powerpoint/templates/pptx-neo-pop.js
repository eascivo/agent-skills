#!/usr/bin/env node
/**
 * Neo-Pop 新波普 Style Template — PptxGenJS Direct (Path B)
 * All elements fully editable. Proven in 内容创业全攻略 (10 slides).
 *
 * Visual system:
 *   - Cream bg (#FFF8E7) + thick black borders (3-4pt) + high-sat color blocks
 *   - Offset solid shadow (no blur) for card depth
 *   - Oversized typography, color-blocked section headers
 *   - Multiple accent colors: hotPink, cyan, yellow, lavender, mint, orange
 *
 * Color system (Neo-Pop palette):
 *   BG: cream #FFF8E7
 *   Accent: hotPink #FF2D6B, cyan #00C9DB, yellow #FFD600, lavender #9B72CF,
 *           mint #4EC58B, orange #FF8C42
 *   Text: black #1A1A1A, gray #666666
 *
 * Usage:
 *   1. Copy to /tmp/: cp this file /tmp/my-slides.js
 *   2. Edit slide content below
 *   3. Run: NODE_PATH=/usr/local/lib/node_modules node /tmp/my-slides.js
 *   4. QA: soffice --headless --convert-to pdf --outdir /tmp /tmp/output.pptx
 *          pdftoppm -jpeg -r 150 /tmp/output.pdf /tmp/slide
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" × 7.5"
pres.author = "PPT Skill";
pres.title = "Your Title Here";

// ═══ Neo-Pop Color System ═══
const C = {
  cream:     "FFF8E7",
  black:     "1A1A1A",
  white:     "FFFFFF",
  hotPink:   "FF2D6B",
  cyan:      "00C9DB",
  yellow:    "FFD600",
  lavender:  "9B72CF",
  mint:      "4EC58B",
  orange:    "FF8C42",
  softBlue:  "4A90D9",
  gray:      "666666",
  lightGray: "CCCCCC",
};

// Helper: offset solid shadow factory (Neo-Pop signature)
const mkShadow = () => ({
  type: "outer", color: "1A1A1A", blur: 0, offset: 6, angle: 135, opacity: 1,
});

// ════════════════════════════════════════════════════════
// REUSABLE LAYOUT HELPERS
// ════════════════════════════════════════════════════════

/**
 * Cover slide: solid accent bg + white card + title + subtitle + tagline badge
 */
function coverSlide(title, subtitle, tagline, accentColor = C.hotPink) {
  const sl = pres.addSlide();
  sl.background = { color: accentColor };

  // Main card
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 1.0, w: 10.9, h: 5.5,
    fill: { color: C.white },
    line: { color: C.black, width: 4 },
    shadow: mkShadow(),
  });
  // Decorative bar
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 1.0, w: 10.9, h: 0.15,
    fill: { color: C.yellow },
  });
  sl.addText(title, {
    x: 1.5, y: 2.0, w: 10.3, h: 1.8,
    fontSize: 60, fontFace: "Arial Black", color: C.black,
    bold: true, align: "center", valign: "middle",
  });
  sl.addText(subtitle, {
    x: 1.5, y: 3.8, w: 10.3, h: 0.8,
    fontSize: 26, fontFace: "Arial", color: C.gray,
    align: "center",
  });
  // Bottom tag badge
  if (tagline) {
    sl.addShape(pres.shapes.RECTANGLE, {
      x: 4.0, y: 5.2, w: 5.3, h: 0.55,
      fill: { color: C.cyan },
      line: { color: C.black, width: 3 },
      shadow: mkShadow(),
    });
    sl.addText(tagline, {
      x: 4.0, y: 5.2, w: 5.3, h: 0.55,
      fontSize: 16, fontFace: "Arial", color: C.black, bold: true,
      align: "center", valign: "middle",
    });
  }
  return sl;
}

/**
 * Section header bar at top of a content slide
 */
function sectionHeader(slide, title, color = C.cyan) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.3, h: 1.3,
    fill: { color: color },
    line: { color: C.black, width: 3 },
  });
  slide.addText(title, {
    x: 0.8, y: 0.15, w: 11.7, h: 1.0,
    fontSize: 36, fontFace: "Arial Black", color: C.black, bold: true,
  });
}

/**
 * Card with colored header + body text (auto-positioned)
 */
function card(slide, x, y, w, h, headerText, bodyText, headerColor = C.hotPink) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white },
    line: { color: C.black, width: 3 },
    shadow: mkShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.65,
    fill: { color: headerColor },
    line: { color: C.black, width: 3 },
  });
  slide.addText(headerText, {
    x, y, w, h: 0.65,
    fontSize: 20, fontFace: "Arial Black", color: C.black, bold: true,
    align: "center", valign: "middle",
  });
  slide.addText(bodyText, {
    x: x + 0.25, y: y + 0.8, w: w - 0.5, h: h - 1.0,
    fontSize: 14, fontFace: "Arial", color: C.black,
    lineSpacingMultiple: 1.6,
  });
}

/**
 * Numbered circle (for steps/sequences)
 */
function numberCircle(slide, x, y, size, number, color = C.hotPink) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color: color },
    line: { color: C.black, width: 2 },
  });
  slide.addText(String(number), {
    x, y, w: size, h: size,
    fontSize: 22, fontFace: "Arial Black", color: C.black, bold: true,
    align: "center", valign: "middle",
  });
}

/**
 * 3-column card grid (common layout for comparisons)
 */
function threeColumnCards(slide, items, topY = 1.8, cardH = 4.8) {
  const gap = 0.3;
  const cardW = (13.3 - 2 * 0.8 - 2 * gap) / 3;
  items.forEach((item, i) => {
    const bx = 0.8 + i * (cardW + gap);
    card(slide, bx, topY, cardW, cardH, item.title, item.body, item.color);
  });
}

/**
 * Bottom highlight bar (black bg + colored text)
 */
function bottomBar(slide, text, y = 5.3, color = C.yellow) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 2.0, y, w: 9.3, h: 0.8,
    fill: { color: C.black },
  });
  slide.addText(text, {
    x: 2.0, y, w: 9.3, h: 0.8,
    fontSize: 16, fontFace: "Arial", color: color, bold: true,
    align: "center", valign: "middle",
  });
}

/**
 * Ending CTA slide: dark bg + accent card + action items
 */
function endingSlide(headline, subText, actions, bgColor = C.black, cardColor = C.yellow) {
  const sl = pres.addSlide();
  sl.background = { color: bgColor };

  sl.addShape(pres.shapes.RECTANGLE, {
    x: 2.0, y: 1.5, w: 9.3, h: 4.5,
    fill: { color: cardColor },
    line: { color: C.black, width: 4 },
    shadow: mkShadow(),
  });
  sl.addText(headline, {
    x: 2.0, y: 1.8, w: 9.3, h: 1.2,
    fontSize: 42, fontFace: "Arial Black", color: C.black, bold: true,
    align: "center", valign: "middle",
  });

  if (actions && actions.length) {
    const w = 2.8;
    const gap = 0.3;
    const startX = (13.3 - actions.length * w - (actions.length - 1) * gap) / 2;
    actions.forEach((a, i) => {
      const cx = startX + i * (w + gap);
      sl.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 3.3, w, h: 1.2,
        fill: { color: C.white },
        line: { color: C.black, width: 3 },
      });
      sl.addText(a.label, {
        x: cx, y: 3.3, w, h: 0.5,
        fontSize: 18, fontFace: "Arial Black", color: C.hotPink, bold: true,
        align: "center", valign: "middle",
      });
      sl.addText(a.desc, {
        x: cx, y: 3.8, w, h: 0.5,
        fontSize: 13, fontFace: "Arial", color: C.black,
        align: "center", valign: "middle",
      });
    });
  }

  if (subText) {
    sl.addText(subText, {
      x: 2.0, y: 5.2, w: 9.3, h: 0.6,
      fontSize: 18, fontFace: "Arial", color: C.lightGray, italic: true,
      align: "center",
    });
  }
  return sl;
}

// ════════════════════════════════════════════════════════
// EXAMPLE SLIDES — EDIT BELOW
// ════════════════════════════════════════════════════════

coverSlide(
  "Your Title Here",
  "Your subtitle here",
  "TAGLINE BADGE TEXT"
);

const s2 = pres.addSlide();
s2.background = { color: C.cream };
sectionHeader(s2, "Section Title", C.cyan);
threeColumnCards(s2, [
  { title: "Card 1", body: "Content for card 1\nLine 2\nLine 3", color: C.yellow },
  { title: "Card 2", body: "Content for card 2\nLine 2\nLine 3", color: C.hotPink },
  { title: "Card 3", body: "Content for card 3\nLine 2\nLine 3", color: C.cyan },
]);

endingSlide(
  "Call to Action",
  "Tagline or quote",
  [
    { label: "Action 1", desc: "Do this today" },
    { label: "Action 2", desc: "Use this tool" },
    { label: "Action 3", desc: "Build this habit" },
  ]
);

// ═══ SAVE ═══
const outPath = "/tmp/presentation.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Saved:", outPath);
}).catch(err => {
  console.error("Error:", err);
});
