# CLAUDE.md

## What this is

A pnpm workspace monorepo: my personal Slidev stack for conference talks. It exists so every deck shares one brand (dark, pink accent `#ff6bed`, Geist fonts) and one set of reusable components instead of copy-pasting between talks.

- `packages/slidev-theme-brand` — theme: layouts, branded footer (global layer), content-card components, fonts/styles. `@alexop/slidev-theme-brand`
- `packages/slidev-addon-utils` — addon: Callout, About, `code-editor` + `TwoCols` layouts, plus legacy Rough diagram components (new decks use Mermaid). `@alexop/slidev-addon-utils`
- `starter` — presentation template consuming both via `workspace:*`; its `slides.md` demonstrates every component and layout end-to-end. `starter/recordings/` holds VHS tape templates for scripted terminal clips (Claude Code, Copilot CLI).

Slidev auto-discovers the theme (via `slidev.colorSchema` in package.json) and addon, and auto-registers all components globally — slides never import components. The addon ships `setup/unocss.ts` (icon preset) that Slidev merges into the presentation. The theme ships `setup/mermaid.ts` (hand-drawn look + brand colors for every Mermaid diagram) and `setup/main.ts` (marks print/export mode and hides a stuck PWA badge). Layout files must be lowercase (`cover.vue`): Slidev matches `layout:` names case-sensitively.

## Commands

Run from the repo root (first export on a machine: `pnpm --filter slidev-starter exec playwright install chromium-headless-shell`):

```bash
pnpm install
pnpm dev        # starter dev server, hot-reloads theme/addon edits too
pnpm build      # build starter presentation
pnpm export     # export starter to PDF
pnpm test       # unit + Chromium component tests + built-deck smoke tests — run after every `pnpm update`
pnpm --filter slidev-starter export:pptx   # editable PowerPoint, one slide per slide
```

Target a single package with `pnpm --filter <name> <script>` (e.g. `pnpm --filter slidev-starter export:png`).

## How to work here

- Edit theme/addon files directly and check the result through `pnpm dev` — everything hot-reloads, there is no build step for the packages.
- Before using or changing a component/layout, copy its usage from `starter/slides.md` rather than guessing prop shapes.
- New presentations: copy `starter/` and keep `theme: '@alexop/slidev-theme-brand'` + `addons: ['@alexop/slidev-addon-utils']` in the headmatter.
- `starter/AGENTS.md` owns how Alex builds talks (deck skeleton, slide rules, timing, notes) and the talk-research workflow. Read it before drafting or restructuring a deck, and before ingesting an article, YouTube video, local file, or pasted note into `starter/research/`.

## Detailed docs — read the one that matches your task

- `agent_docs/slide-authoring.md` — writing/editing slides: Slidev syntax, click animations, code highlighting, Magic Move, layouts, deck conventions. **Read this before touching any `slides.md`.**
- `agent_docs/components.md` — props and usage for every custom component/layout in this repo (FolderTree, code-editor layout, Callout, footer/`hideFooter` mechanics).
- `agent_docs/testing.md` — the three Vitest projects (unit, browser-mode components, built-deck smoke), how to write each kind, and the Slidev-specific gotchas. **Read this before adding a component or a test.**
- `agent_docs/mermaid.md` — diagrams: Mermaid is the only diagram tool. Which diagram type fits which slide, step animation, node shapes, collapsible subgraphs, swimlanes, hand-drawn vs classic, sizing and export limits. **Read this before drawing any diagram.**
- `agent_docs/terminal-recordings.md` — scripted terminal demos with VHS: the tape + sim-shim pattern, the Claude Code / Copilot CLI template pairs in `starter/recordings/`, render + embed workflow. **Read this before creating any terminal clip.**
- For general Slidev features beyond these (exporting, hosting, presenter mode, Monaco), use the `slidev` skill — it has per-feature reference docs.
