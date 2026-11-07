# Testing

Tests exist so that `pnpm update` can't silently break a talk. Run `pnpm test` after every dependency update and before committing changes to the theme, the addon, or the starter's diagrams.

```bash
pnpm test          # everything (~40s, includes a full slidev build)
pnpm test:unit     # unit + component projects only (~10s)
pnpm test:deck     # build the starter deck and smoke-test it
```

First run on a new machine: `pnpm exec playwright install chromium`.

## Three projects (`vitest.config.ts`)

| Project | Where | Runs in | Catches |
|---|---|---|---|
| `unit` | `packages/**/tests/*.test.ts` | Node | Logic bugs in pure functions (`utils/`) |
| `components` | `packages/**/tests/*.browser.test.ts` | Real Chromium (Vitest browser mode) | Mermaid / Vue upgrades: real rendering, real Slidev clicks engine |
| `deck` | `starter/tests/*.e2e.test.ts` | Node + Playwright against the **built** starter | Slidev upgrades: routing, click registration, shadow-root rendering, build output (fonts, PWA, og-image) |

## Writing a component test

Copy `packages/slidev-addon-utils/tests/MermaidSteps.browser.test.ts`. The pattern:

1. **Mount a fixture, not the raw component.** `tests/MermaidSteps.fixture.vue` renders the way Slidev does (real `mermaid` + the theme's `setup/mermaid.ts`, SVG inside a shadow root). Fixtures live in `tests/`, **never** `components/`: Slidev registers every `.vue` file in `components/` as a global component.
2. **Use Slidev's real clicks engine.** `createClicksContextBase` from `@slidev/client/composables/useClicks.ts`, provided under `injectionClicksContext`, with `clicks.value.setup()` called in a wrapper component. That wrapper is what Slidev's slide wrapper does; without `setup()`, `total` stays 0 and clicks are clamped.
3. **Name tests BDD-style:** `describe('given …')` → `describe('when …')` → `it('should …')`.
4. **Add an upgrade canary** when a component depends on another library's internals (DOM ids, class names). The canary asserts those internals directly, so an upgrade fails with the exact thing that changed.

Gotchas, each found the hard way:

- Import Slidev client files **with** the `.ts` extension (`@slidev/client/constants.ts`). Slidev aliases `@slidev/client/` to its folder and skips the package `exports` map, so the extensionless import fails inside a deck.
- Components read the clicks context with `inject(injectionClicksContext)`, not `useSlideContext()`. The latter pulls Slidev's virtual modules and crashes outside a Slidev app.
- `vitest-browser-vue` 3: `render()` is async. Await it.
- Slidev client code reads a `__DEV__` global; the `components` project defines it.

## Writing a deck smoke test

Add to `starter/tests/deck.e2e.test.ts`. Give the slide under test a `routeAlias:` in its frontmatter so the test can open `/<alias>` instead of a slide number that shifts when slides are added. `window.__slidev__` exists only in dev; in a build, count slides on `/overview`.

## Before trusting a new test

Break the thing it guards and confirm it fails (change a regex, add a Mermaid syntax error), then restore. A test that cannot fail is noise.
