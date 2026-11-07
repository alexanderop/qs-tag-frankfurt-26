# Authoring Slides (Slidev essentials + deck conventions)

Read this before writing or editing `slides.md` in any deck built on this stack.

## Deck skeleton

```md
---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: My Talk
layout: cover
transition: slide-left
comark: true
---

# Title Slide

---
layout: section
---

# Section Divider

---

# A Normal Slide

Content

<!--
Presenter notes go in an HTML comment at the END of the slide.
-->
```

- `---` on its own line separates slides; the first frontmatter block is the **headmatter** (deck-wide config), later ones are per-slide **frontmatter**.
- Write presenter notes for every content slide — they're part of a good talk, not optional polish.
- `starter/slides.md` is the canonical example — copy real patterns from there.

## Click animations (the core of a good Slidev talk)

```md
<v-clicks>

- Point one          <!-- appears on click 1 -->
- Point two          <!-- click 2 -->

</v-clicks>

<div v-click>Single element revealed on click</div>
<div v-click="3">Revealed at click 3 exactly</div>
<div v-after>Appears together with the previous v-click</div>
```

- Blank lines inside `<v-clicks>` around Markdown content are required.
- Set `clicks: N` in a slide's frontmatter when a component consumes clicks itself (e.g. `FolderTree` with `open-on-clicks`).
- `v-mark` adds rough.js annotations on click: `<span v-mark.underline.orange>text</span>`, `v-mark.circle`.
- Sync notes to clicks by writing `[click]` markers inside the presenter-notes comment.

## Presenter notes

Notes render as Markdown in `/presenter`. Write beats, not a script:

```md
<!--
**Goal:** one sentence on what the audience should leave with.

[click] **Keyword** — one beat per click.
[click] **Next keyword** — the current beat lights up, past beats fade.
[click:2] Lands two clicks later; use it to skip a click that needs no note.
-->
```

- One `[click]` per reveal on the slide. `[click:N]` advances the marker by N; it is relative, not an absolute click number.
- Bold the one word you must not forget; keep sources and citations in notes, not on the slide.
- Long notes are fine: the panel auto-scrolls to the active marker (dev and built decks) and can be dragged wider than 720px (Slidev 53.1+).
- Double-click a marker in the presenter view to jump the slide to that click.
- The headmatter sets the presenter timer: `duration: 30min` + `timer: countdown`.

## Code blocks

````md
```ts {2,3}
// static highlight of lines 2-3
```

```ts {1|2-4|all}
// click-driven highlighting: line 1, then 2-4, then all
```

```ts {monaco}
// editable Monaco editor
```

```ts {monaco-run}
// editable AND runnable
```
````

- Scrollable long code: ` ```ts {maxHeight:'300px'} `.
- Line numbers: ` ```ts {lines:true} ` or deck-wide `lineNumbers: true` in headmatter.
- Import from file: `<<< @/snippets/file.ts` (keeps slides in sync with real code).
- **Magic Move** — animate between code states (great for refactoring walkthroughs):

`````md
````md magic-move
```ts
const a = 1
```
```ts
const a = 1
const b = 2
```
````
`````

- TypeScript type popups on hover: ` ```ts {*} twoslash ` — the `{*}` is required, plain ` ```ts twoslash ` silently loses the meta (brand-styled; `// ^?` pins a popup — see `agent_docs/components.md`).
- For a full VS Code look (file tree, tabs), prefer this stack's `code-editor` layout — it supports click-synced tabs (`tabs: a.ts, b.ts@2`), stepped line highlighting, magic-move, and twoslash. See `agent_docs/components.md`.

## Diagrams & math

- Diagrams: **Mermaid only** (` ```mermaid {scale: 0.8} `), hand-drawn and brand-styled by the theme. Read `agent_docs/mermaid.md` before writing a diagram; don't use the `Rough*` components in new slides.
- PlantUML: ` ```plantuml `.
- LaTeX: `$inline$` and `$$block$$`.

## Layout & styling

- Layouts available in this theme are listed in `agent_docs/components.md`; common picks: `cover`, `section`, `center`, `two-cols` (content after `::right::`), `fact`, `quote`, `image-right`, `iframe`.
- Slide too full? `zoom: 0.9` in that slide's frontmatter; or scale one element with `<Transform :scale="0.7">`.
- Per-slide CSS: a `<style>` block inside the slide is automatically scoped.
- Icons: any Iconify icon as a component, e.g. `<mdi-github />`, `<logos-vue />`.
- Position elements freely with `v-drag` (drag in dev, positions persist to the file).
- Split big decks: `src: ./sections/intro.md` in a slide's frontmatter imports another file.

## Deck-level defaults (from the theme)

Dark color scheme, pink accent `#ff6bed`, Geist + Geist Mono (bundled from `@fontsource-variable`, no Google Fonts request, so they work offline), 16:9, `slide-left` transition. Don't hardcode colors in slides — use theme classes; Mermaid gets its colors from `setup/mermaid.ts`.

## Deck headmatter the starter ships with

- `pwa: build` — the built deck precaches every asset (fonts included) so it runs offline after one load. Needs `vite-plugin-pwa` + `workbox-window` devDependencies (already in `starter`).
- `seoMeta: { ogImage: auto }` — `slidev build` screenshots slide 1 into `og-image.png` (gitignored). Anything with an iframe must actually load in print mode, or the capture times out.
- `shiki: { magicMove: { easing, stagger } }` — one timing for every Magic Move transition.
- `comark: true` (replaces the deprecated `mdc: true`), `duration` + `timer` for the presenter timer.

## Going deeper

The `slidev` skill has per-feature reference docs (animations, exporting, hosting, presenter mode, headmatter/frontmatter options, and more) — invoke it or read its `references/` files when you need details beyond this page. Official docs: https://sli.dev
