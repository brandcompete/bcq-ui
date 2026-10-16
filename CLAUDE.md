# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two things live in the same codebase:

1. **Becquerel UI** (`src/bcq-ui/`) — a standalone Vue 3 component library (prefix `Bc*` on component names, `bc-*` on rendered CSS classes/tags), published as `src/lib.js`.
2. **The documentation/demo site** (everything else under `src/`) — a Vue Router SPA that showcases every library component, built with the library as its own dependency (it imports `BcqUi` from `./lib.js`).

Changes to `src/bcq-ui/**` affect the published library; changes elsewhere affect only the docs site.

## Working conventions

- Whenever you make a large change to the code (new component, architectural change, new build step/script, changed conventions), update this CLAUDE.md file in the same change so it stays accurate.
- When committing code, do not add any Claude/Anthropic authorship line (e.g. no `Co-Authored-By: Claude`) to commit messages.

## Commands

```sh
npm run dev          # vite dev server for the docs site
npm run build        # build docs site (dist/), then generate llms.txt and SSR'd static pages
npm run preview      # preview the production build
npm run build:lib    # build the library only -> lib/becquerel.min.js (IIFE, global `becquerel`)
npm run build:all     # build both docs site and library
npm run bcq:create   # interactive scaffolder for a new UI component (see below)
npm run bcq:llms     # regenerate dist/llms.txt from public/data/pages-md
npm run bcq:ssr      # regenerate static SSR'd HTML snapshots in snapshots/
```

There is no test suite and no lint script configured in `package.json`; don't invent `npm test`/`npm run lint` invocations.

## Architecture

### Component library (`src/bcq-ui/`)

- `src/bcq-ui/components/<kebab-name>/` — one folder per component, each with `index.js` (registers the `.vue` as a global component with `install()`) and `<kebab-name>.vue`. All components are re-exported from `src/bcq-ui/components/index.js` and installed together via `src/bcq-ui/components/bcq-ui.js`.
- `src/bcq-ui/directives/` — global directives (`v-ripple`, `v-tooltip`, `v-liquid-glass`, `v-intersect`, etc.), registered in `bcq-ui.js`.
- `src/bcq-ui/mixins/methods.js` — low-level CSS-class/style builder helpers used inside component `.vue` files (e.g. `componentBaseCss`, `makeElevation`, `makeBorderRadius`). Don't confuse this with `src/mixins/*` (below), which is docs-site-only.
- `src/bcq-ui/styles/` — plain CSS utility files (spacing, flexbox, grid, typography, colors, elevation, etc.), all imported from `src/bcq-ui/index.js`. Components compose these utility classes rather than writing component-scoped styles for layout/spacing.
- Components commonly build their root CSS class list in a `componentCssClasses` computed property from props (`color`, `variant`, `size`, `roundness`, `elevation`), following the `bc-<name>`, `bc-<name>-<variant>` naming convention.

### Docs/demo site (everything else in `src/`)

- `src/main.js` — app entry; installs `BcqUi`, Pinia, Vue Router, Axios/VueAxios, and a global `mitt` event bus (`this.$emitter` / `app.config.globalProperties.$emitter`).
- `src/helpers/router.js` — one route per demo page; pages live under `src/pages/<category>/<kebab-name>.vue` where category is `content`, `ui`, `forms`, `directives`, or `getting-started`.
- `src/helpers/meta.js` — per-page SEO/meta metadata, sourced from `public/data/pages/<category>/<kebab-name>.json`.
- `src/helpers/config.js`, `src/helpers/en.js`, `src/helpers/icons.js` — global config, i18n strings (`this.$lang`), icon name map (`this.$icons`) exposed as global properties.
- `src/mixins/{props,methods,computed}.js` — shared mixins for docs-site pages/components (distinct from `src/bcq-ui/mixins/*`, which belongs to the library).
- `src/stores/page.js` — Pinia store holding the current page's metadata (populated via `getPageMeta()` in `src/mixins/methods.js`, which fetches `public/data/pages/**.json`).
- `public/data/pages-md/<category>/<kebab-name>.md` — the actual documentation prose/markdown rendered on each demo page.
- `public/code/<kebab-name>.md` — code snippets shown in the "code" tab of a demo page.
- `sitemap.json` — flat list of routes, consumed by `vite-plugin-sitemap` at build time.

### Adding a new UI component

Run `npm run bcq:create`, pick a category (`content`/`ui`/`forms`) and a `SentenceCase` name. This scaffolds the component folder, its demo page, its `pages-md` doc, its `pages/*.json` meta, and its `code/*.md` snippet from templates in `bcq-cli/templates/`. The script then prints the remaining manual steps (also in `bcq-cli/templates/manual-tasks.md`):

1. Export the component from `src/bcq-ui/components/index.js`.
2. Register the page route in `src/helpers/router.js`.
3. Export its meta from `src/helpers/meta.js`.
4. Add its path to `sitemap.json`.
5. Add it (and its dependencies) to `public/data/miscellaneous/bundler-defs.json` (used by the "library bundler" demo page).
6. Generate and add a thumbnail image.

### Build outputs

- `npm run build` produces the docs site in `dist/`, then post-processes it: `bcq-cli/llms.cjs` writes `dist/llms.txt` (an LLM-readable summary generated from `public/data/pages-md`), and `bcq-cli/ssr.cjs` writes pre-rendered static HTML snapshots (into `snapshots/`, sourced from `public/data/pages` + `public/data/pages-md` + `sitemap.json`) for crawlers/social-preview scraping.
- `npm run build:lib` (config: `vite.lib.config.js`) produces the standalone IIFE bundle `lib/becquerel.min.js`, entry point `src/lib.js`.
