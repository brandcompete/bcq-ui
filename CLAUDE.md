# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two things live in the same codebase:

1. **Becquerel UI** (`src/bcq-ui/`) — a standalone Vue 3 component library (prefix `Bc*` on component names, `bc-*` on rendered CSS classes/tags). Its source entry is `src/lib.js`; the npm package's entry points (`main`/`module`/`exports` in `package.json`) point at the built bundle in `lib/` (see "Build outputs").
2. **The documentation/demo site** (everything else under `src/`) — a Vue Router SPA that showcases every library component, built with the library as its own dependency (it imports `BcqUi` from `./lib.js`, the unbundled sources, plus `./bcq-ui/styles/variables.css`).

Changes to `src/bcq-ui/**` affect the published library; changes elsewhere affect only the docs site.

Dependency placement in `package.json`: `dependencies` holds only what the library itself needs at runtime (`mitt`, `@mdi/font`); `vue` is a `peerDependency` (and a devDependency for local work); everything used only by the docs site (axios, pinia, vue-router, marked, highlight.js, etc.) belongs in `devDependencies`. The bundle build keeps everything in `dependencies`/`peerDependencies` external, so adding a package there means it won't be bundled.

## Working conventions

- Whenever you make a large change to the code (new component, architectural change, new build step/script, changed conventions), update this CLAUDE.md file in the same change so it stays accurate.
- When committing code, do not add any Claude/Anthropic authorship line (e.g. no `Co-Authored-By: Claude`) to commit messages.

## Commands

```sh
npm run dev          # vite dev server for the docs site
npm run build        # build docs site (dist/), generate llms.txt and SSR'd static pages, then rebuild the npm bundle
npm run preview      # preview the production build
npm run build:lib    # build the library only -> lib/becquerel.min.{js,css} (IIFE, global `becquerel`) + lib/variables.css, then runs build:bundle (so lib/ is fully refreshed)
npm run build:all     # everything: full `build` (docs site, llms.txt, snapshots, npm bundle), then the IIFE library + lib/variables.css
npm run build:bundle # build the npm bundle -> lib/bcq-ui[.min].js (ESM) + lib/bcq-ui[.min].css
npm run dev:bundle   # build the bundle, then run the docs site against it instead of the sources (BCQ_BUNDLE=full for the non-minified files)
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
- `npm run build:lib` (config: `vite.lib.config.js`) produces the standalone IIFE bundle `lib/becquerel.min.js` (+ `.css`), entry point `src/lib.js`. `becquerel.min.css` does NOT contain the CSS variables, so the `copyVariablesCss()` plugin in `vite.lib.config.js` also copies `src/bcq-ui/styles/variables.css` unchanged (not minified) to `lib/variables.css`; IIFE users must load it before `becquerel.min.css`.
- `lib/` is the single folder for all generated library files (IIFE build + npm bundle). Both configs set `emptyOutDir: false` so neither build deletes the other's files; keep it that way.
- `npm run build:bundle` (config: `vite.bundle.config.js`) produces the npm-consumable bundle in `lib/` by running vite twice: the default mode writes readable `bcq-ui.js` + `bcq-ui.css`, `--mode min` writes `bcq-ui.min.js` + `bcq-ui.min.css` (terser for JS, because vite's esbuild minifier keeps whitespace in ES lib builds). The JS is an ES module whose default export is the `BcqUi` install function. Everything in `package.json` `dependencies`/`peerDependencies` is kept external (imported, not bundled). Entry point is `src/lib.js` (via the virtual entry below), which itself stays unbundled for the docs site/dev server. Don't edit files in the output folder by hand. `prepublishOnly` runs this build automatically before `npm publish`.
- npm package entry points (`package.json`): `.` → `lib/bcq-ui.min.js` (also `main`/`module`), `./style.css` → `lib/bcq-ui.min.css` (also `style`), `./lib/*` → any file in `lib/` (e.g. the non-minified ones or the IIFE build), `./source` → `src/lib.js` (unbundled sources). `files` is `["src", "lib"]`. If you rename or move bundle files, update these too.
- The bundle's entry is a virtual module in `vite.bundle.config.js` that imports `src/bcq-ui/styles/variables.css` and then re-exports `src/lib.js`: `lib.js` itself doesn't import the CSS variables (the docs site imports them separately in `src/main.js`), but the bundle must ship them.
- Verifying the bundle: `npm run dev:bundle` (`vite --mode bundle`, see `useLibraryBundle()` in `vite.config.js`) swaps the `./lib.js` import in `src/main.js` for the bundle's JS + CSS and blanks out `main.js`'s own `./bcq-ui/...` CSS imports, so every demo page runs on the bundle alone. Compare against `npm run dev`; any difference is a bundling bug.
- `lib/` is build output but is committed to git and must always be present and up to date. It is regenerated by `npm run build:bundle`, which also runs at the end of `build` and `build:all`, in `dev:bundle` and in `prepublishOnly`. After changing anything under `src/bcq-ui/`, rebuild it before committing. The docs site itself does not import it (it uses `src/lib.js`), except in `dev:bundle` mode.
- The library components use `this.$emitter` (a `mitt` instance) but never create it; the host app must set `app.config.globalProperties.$emitter = mitt()` (the docs site does this in `src/main.js`).
