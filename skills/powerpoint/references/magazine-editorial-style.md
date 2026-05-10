# Magazine Editorial Style — PptxGenJS Template

杂志排版风完整模板。适用于宣传片、品牌介绍、高端内容展示。

## 风格定义

- 大留白（≥30%）
- 超大字体标题（48-96pt）
- 全出血背景图 + 暗色 overlay
- 图片占比高（≥40%）
- 极简装饰：金色细线、角标、页码
- 左右分栏排版

## 配色系统

```
背景：#FFFFFF（亮底）| #1A1A1A（暗底）| 全出血图
主文字：#1A1A1A（亮底）| #FFFFFF（暗底）
强调色：#FFD700（金色细线/数字）
标签色：#FF3B4F（pill badge）
辅助色：#999999（角标/页码）
引言色：#DDDDDD（暗底引言）
```

## Helper 函数

```javascript
const W = 13.33, H = 7.5; // LAYOUT_WIDE

// 全出血背景图
function fullImg(slide, imgPath) {
  slide.background = { path: imgPath };
}

// 暗色 overlay
function overlay(slide, opacity, color = '000000') {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { type: 'solid', color, transparency: (1 - opacity) * 100 },
    line: { width: 0 },
  });
}

// 金色细线（强调分隔）
function goldLine(slide, x, y, w) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h: 0.04,
    fill: { type: 'solid', color: 'FFD700' },
    line: { width: 0 },
  });
}

// 角标（杂志标签）
function cornerTag(slide, text, x, y) {
  slide.addText(text, {
    x, y, w: 2, h: 0.3,
    fontSize: 9, fontFace: 'Arial', color: '999999',
    charSpacing: 3,
  });
}

// 页码
function pageNum(slide, num) {
  slide.addText(`${num}`, {
    x: W - 0.8, y: H - 0.5, w: 0.6, h: 0.4,
    fontSize: 11, fontFace: 'Arial', color: '999999',
    align: 'right',
  });
}

// 超大文字
function bigText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontSize: opts.fontSize || 72,
    fontFace: opts.fontFace || 'Microsoft YaHei',
    color: opts.color || '000000',
    bold: opts.bold !== false,
    ...opts.extra,
  });
}

// 正文
function bodyText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontSize: opts.fontSize || 14,
    fontFace: opts.fontFace || 'Microsoft YaHei',
    color: opts.color || '333333',
    lineSpacingMultiple: 1.7,
    valign: 'top',
    ...opts.extra,
  });
}
```

## 页面模板

### 1. 封面页

```
结构：全出血图 + overlay(0.55) + 左对齐大标题
- 标题：96pt, 白色, shadow
- 副标题：16pt, #CCCCCC
- 金色细线：1.5" 宽
- 英文标签：9pt, #999999, letterSpacing 6
```

### 2. 声明页（Statement）

```
结构：浅色背景 + 左侧大文字 + 右侧配图裁切
- 大文字：80pt, #1A1A1A
- 金色细线在文字下方
- 正文：16pt, #555555
- 右侧图片：x=7.5, w=5.2, h=6.3
```

### 3. 数据冲击页

```
结构：全出血图 + overlay(0.6) + 超大数字
- 数字：100pt, 白色, shadow
- 标签：22pt, 白色
- 金色细线 + 正文说明
```

### 4. 三栏优势页

```
结构：浅色背景 + 3列编号卡片 + 底部暗色引言条
- 编号：64pt, #EEEEEE（超大浅色）
- 标题：24pt, #1A1A1A
- 金色细线分隔标题和描述
- 底部：暗色条 #1A1A1A + 白色斜体引言
```

### 5. 工具矩阵页

```
结构：暗色背景 #1A1A1A + 左侧大字 + 右侧彩色条目
- 大字：60pt, 白色（3-4行）
- 金色细线 + 正文：14pt, #999999
- 右侧：半透明圆角矩形 + 彩色标签 + 灰色描述
```

### 6. 引言页

```
结构：全出血大景 + overlay(0.45) + 居中引言
- 大引号：120pt, 白色, transparency 30
- 引言：36pt, 白色, bold, align center, shadow
- 金色细线 + 副标题：18pt, #DDDDDD
```

### 7. 步骤页

```
结构：浅色背景 + 左图 + 右侧步骤列表
- 左图：x=0.8, w=5.5, h=5.2
- 编号：22pt, #FF3B4F
- 步骤文字：16pt, #333333
- 编号间连接线：#DDDDDD
```

### 8. CTA 结尾页

```
结构：全出血图 + overlay(0.7) + 金色 CTA 按钮
- 大文字：72pt, 白色, shadow
- 金色细线
- 金色按钮：圆角矩形 #FFD700 + shadow(glow) + 深色文字
```

## AI 插画 prompt 模板

```
Magazine editorial photography: [场景描述], [光影要求], premium magazine quality, no text

示例：
- "Magazine editorial photography: a person working alone at a beautiful minimalist desk with laptop, warm afternoon light streaming through large windows, coffee cup, plants, high-end interior design, shot from side angle, shallow depth of field, no text, no face visible"
- "Magazine editorial photography: abstract technology concept, flowing digital connections and light trails on dark background, futuristic but elegant, premium quality, no text, no people"
```

## 完整示例

参考 `/tmp/ppt-advanced/mag/magazine.js` — 一人公司宣传片，9页完整实现。
