# Powerpoint Skill

**AI-native PPT generation skill** — 让 AI Agent 帮你做 PPT。

把 `SKILL.md` 加载到你的 AI Agent（Claude Code、Cursor、Hermes Agent 等），说一句"做个关于 XX 的 PPT"，就能自动生成高质量演示文稿。

## 特性

- 🎨 **10+ 视觉风格** — 融合暗色、Apple Keynote Dark、杂志编辑风、瑞士国际风等
- 📐 **专业设计体系** — 基于 Dieter Rams、Massimo Vignelli 等大师的设计原则
- 🔧 **PptxGenJS 驱动** — 纯代码生成，无需 PowerPoint，输出标准 .pptx
- ✅ **内置视觉 QA** — 自动转图 → AI 检查 → 修 bug 循环
- 📖 **完整参考文档** — 配色方案、布局模板、排版规范、常见坑

## 快速开始

### 1. 安装依赖

```bash
# PPT 生成
npm install -g pptxgenjs

# 可选：图标支持
npm install -g react-icons sharp

# 可选：内容提取 & QA
pip install python-pptx Pillow

# 可选：视觉检查（PPT → PNG）
brew install --cask libreoffice poppler
```

### 2. 加载 Skill

将 `SKILL.md` 作为上下文提供给 AI Agent：

- **Claude Code**: 放入 `CLAUDE.md` 或 `@SKILL.md`
- **Cursor**: 放入 `.cursorrules` 或项目级 rules
- **Hermes Agent**: 放入 `~/.hermes/skills/` 目录
- **其他 Agent**: 直接粘贴到对话或系统提示中

### 3. 使用

```
帮我做一份关于"AI Agent 发展趋势"的 PPT，10页，用融合暗色风格
```

Agent 会自动：
1. 选择风格和配色
2. 编写 PptxGenJS 脚本
3. 生成 .pptx 文件
4. 转图片做视觉 QA
5. 修复问题并交付

## 文件结构

```
├── SKILL.md                          # 主 Skill 文件（加载这个）
├── pptxgenjs.md                      # PptxGenJS 完整 API 参考
├── editing.md                        # 模板编辑工作流
├── templates/
│   └── pptx-neo-pop.js               # Neo-Pop 风格模板
├── references/
│   ├── fusion-dark-style.md          # 融合暗色风格（默认）
│   ├── apple-keynote-dark-style.md   # Apple Keynote 暗色风格
│   ├── magazine-editorial-style.md   # 杂志编辑风格
│   ├── minimalist-design-reference.md # 简约设计体系
│   ├── design-principles.md          # 设计原则
│   ├── proven-layout-patterns.md     # 布局模式
│   ├── pentagram-editorial-pptx.md   # Pentagram 编辑风参考
│   ├── tech-color-palette.md         # 科技配色方案
│   └── video-content-extraction.md   # 视频转 PPT 工作流
└── scripts/
    ├── clean.py                      # XML 清理
    ├── add_slide.py                  # 添加幻灯片
    └── office/                       # PPTX 底层操作工具
```

## 内置风格

| 风格 | 适用场景 | 关键词 |
|------|---------|--------|
| **Fusion Dark**（默认） | 科技/商业/数据 | 深空黑 + 多色系统 + 数据可视化 |
| **Apple Keynote Dark** | 产品发布/路演 | 纯黑 + 超大字号 + 电影感 |
| **杂志编辑风** | 品牌宣传/高端内容 | 大留白 + 全出血图 + 金色细线 |
| **经典黑白** | 通用/商务 | 黑白对比 + 克制配色 |
| **温暖极简** | 文化/创意 | 米色暖调 + 柔和过渡 |
| **瑞士国际风** | 数据/报告 | 高对比度 + 网格系统 |
| **Neo-Pop** | 创意/年轻 | 大胆撞色 + 不对称布局 |

## 许可

MIT License
