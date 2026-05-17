<p align="center">
  <h1 align="center">🛠️ Agent Skills</h1>
  <p align="center">Open, portable skill modules for AI coding agents</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
  <img src="https://img.shields.io/badge/skills-2-green" alt="Skills Count">
</p>

---

## What is this?

A **skill** is a self-contained knowledge module — a `SKILL.md` plus supporting references, scripts, and templates — that teaches an AI agent how to perform a complex task end-to-end.

Load a skill into your agent, give a natural-language prompt, and the agent executes the full workflow autonomously: planning, building, QA, and delivery.

**Portable** — works with any agent that supports long-context or file-based instructions:
Claude Code · Cursor · Windsurf · Hermes Agent · Copilot · or any LLM with a system prompt

## Skills

| Skill | Description |
|-------|-------------|
| [**powerpoint**](skills/powerpoint/) | AI-powered PPT generation — 10+ visual styles, PptxGenJS code generation, built-in visual QA pipeline |
| [**ppt-narrated-video**](skills/ppt-narrated-video/) | Turn a PPT/slide deck into a narrated video with per-slide TTS, ffmpeg sync, loudness normalization, and MP4 export |

## Quick Start

### 1. Install dependencies

```bash
# Required: PPT generation
npm install -g pptxgenjs

# Optional: icon support
npm install -g react-icons sharp

# Optional: content extraction & QA
pip install python-pptx Pillow

# Optional: visual inspection (PPT → PNG)
brew install --cask libreoffice poppler
```

### 2. Load into your agent

Pick one:

- **Claude Code** → `@SKILL.md` or add to `CLAUDE.md`
- **Cursor** → add to `.cursorrules`
- **Hermes Agent** → place in `~/.hermes/skills/`
- **Any LLM** → paste `SKILL.md` into the system prompt or conversation

### 3. Use

```
Make a 10-slide PPT about "AI Agent trends" in Fusion Dark style
```

The agent will:
1. Choose a visual style and color palette
2. Write a PptxGenJS generation script
3. Produce a `.pptx` file
4. Convert to images and run visual QA
5. Fix issues and deliver

## Skill Anatomy

Each skill is a directory containing:

```
skills/powerpoint/
├── SKILL.md                          # ← Load this file into your agent
├── README.md                         # Human-readable overview
├── pptxgenjs.md                      # API reference for PptxGenJS
├── editing.md                        # Template editing workflow
├── templates/                        # Starter templates
│   └── pptx-neo-pop.js
├── references/                       # Design guides & style references
│   ├── fusion-dark-style.md          #   Fusion Dark (default)
│   ├── apple-keynote-dark-style.md   #   Apple Keynote Dark
│   ├── magazine-editorial-style.md   #   Magazine Editorial
│   ├── minimalist-design-reference.md#   Minimalist design system
│   ├── design-principles.md          #   Evidence-based design rules
│   └── ...
└── scripts/                          # Utility scripts
    ├── clean.py                      #   XML cleanup
    ├── add_slide.py                  #   Slide manipulation
    └── office/                       #   Low-level PPTX tools
```

**`SKILL.md` is the single entry point.** It contains everything an agent needs: when to activate, how to execute, design rules, pitfalls, and QA procedures. Linked files (`references/`, `scripts/`) provide depth on demand.

## Why Skills?

- **Consistent quality** — design principles, proven layouts, and QA checklists baked in
- **No boilerplate** — the agent generates production-ready output, not starting templates
- **Teachable** — skills encode real expertise: what works, what doesn't, and why
- **Composable** — mix and match skills; each is independent
- **Zero runtime** — pure knowledge, no framework to install

## Contributing

PRs welcome. A good skill contribution:

1. Has a clear `SKILL.md` as the single entry point
2. Includes real pitfalls and QA procedures, not just happy paths
3. Works across agents (no vendor-specific APIs in the skill itself)
4. Comes with at least one reference file or template

## License

MIT
