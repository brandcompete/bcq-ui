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
- `ideas/` holds write-ups of ideas under consideration (not implemented), e.g. `ideas/create-bcq-ui.md` (a `pnpm create bcq-ui` project scaffolder). Read the relevant one before working on such a topic and keep it updated with new decisions.
- When committing code, do not add any Claude/Anthropic authorship line (e.g. no `Co-Authored-By: Claude`) to commit messages.

## Commands

```sh
npm run dev          # vite dev server for the docs site
npm run build        # the one full build: changelog copy, variables.css copy, docs site (dist/, incl. sitemap), llms.txt, SSR'd snapshots, then build:bundle (types + npm bundle)
npm run preview      # preview the production build
npm run build:bundle # build the npm bundle -> lib/bcq-ui[.min].js (ESM) + lib/bcq-ui[.min].css + lib/variables.css + lib/bcq-ui[.min].d.ts
npm run dev:bundle   # build the bundle, then run the docs site against it instead of the sources (BCQ_BUNDLE=full for the non-minified files)
npm run bcq:create   # interactive scaffolder for a new UI component (see below)
npm run bcq:types    # regenerate src/bcq-ui-components.d.ts (component types) from the .vue files; also runs in build:bundle
npm run bcq:thumbnail -- <kebab-name> [--force] # random 1200x630 social-sharing PNG -> public/images/thumbnails/<kebab-name>.png; also runs in bcq:create
npm run bcq:changelog # copy public/data/components-md/CHANGELOG.md over the root CHANGELOG.md; first step of build
npm run bcq:variables # copy src/bcq-ui/styles/variables.css to public/code/variables.css; second step of build
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

Run `npm run bcq:create`, pick a category (`content`/`ui`/`forms`) and a `SentenceCase` name. The category is picked with the arrow keys and the name is validated (SentenceCase letters only, must not already exist); prompts use `@inquirer/prompts` (v7, devDependency; v8 needs Node 22). This scaffolds the component folder, its demo page, its `pages-md` doc, its `pages/*.json` meta, and its `code/*.md` snippet from templates in `bcq-cli/templates/`, generates a random social-sharing thumbnail `public/images/thumbnails/<kebab-name>.png` (via `createThumbnail()` from `bcq-cli/thumbnail.cjs`; skipped if one already exists), and registers the component in `src/bcq-ui/components/index.js` (`export { default as BcName } from './kebab-name'`, inserted alphabetically; `BcqUi` and `BcApp` stay pinned at the top), and registers the demo page in `src/helpers/router.js` (the `PageBcName` import and a route `{ path: '/<category>/<kebab-name>', render: true, icon: 'home', meta: meta.<camelName>, ... }`, both inserted alphabetically within the category), and exports its meta from `src/helpers/meta.js` (`export { meta as <camelName> } from '../../public/data/pages/<category>/<kebab-name>.json'`, alphabetically within the category), and adds `/<category>/<kebab-name>` to `sitemap.json` (alphabetically within the category, line-based to keep the file's formatting). The name prompt also refuses names whose docs page/meta/snippet files already exist. `dryRun` at the top of `bcq-cli/create.cjs` disables all writes. The script then prints the remaining manual steps (also in `bcq-cli/templates/manual-tasks.md`):

1. Add it (and its dependencies) to `public/data/miscellaneous/bundler-defs.json` (used by the "library bundler" demo page).
2. Optionally regenerate the random thumbnail (`npm run bcq:thumbnail -- <kebab-name> --force`).

`bcq-cli/thumbnail.cjs` draws 10-18 random circles/squares/rectangles/triangles/hexagons (mostly filled, some outlined, semi-transparent, some rotated, allowed to overflow the edges) in `rgb(66, 211, 146)` and `rgb(95, 139, 239)` on `#212121`, 1200x630 (the `og:image` size, referenced by `bcq-cli/ssr.cjs` and the page meta). It uses `@napi-rs/canvas` (devDependency; prebuilt binaries, no native build toolchain needed, unlike `canvas`). It exports `createThumbnail(kebabName, { dryRun, force })` and `renderThumbnail()` (returns the PNG Buffer).

### Build outputs

- The changelog is maintained only in `public/data/components-md/CHANGELOG.md` (shown on the docs site); `bcq-cli/changelog.cjs` copies it over the root `CHANGELOG.md` at the start of `npm run build`. Never edit the root `CHANGELOG.md` directly.
- `bcq-cli/variables.cjs` (`npm run bcq:variables`) copies `src/bcq-ui/styles/variables.css` unchanged to `public/code/variables.css` (shown on the docs site). It runs right after the changelog copy in `npm run build`, before `vite build`, so the fresh copy ends up in `dist/`. Never edit `public/code/variables.css` directly; edit the source.
- `npm run build` produces the docs site in `dist/`, then post-processes it: `bcq-cli/llms.cjs` writes `dist/llms.txt` (an LLM-readable summary generated from `public/data/pages-md`), and `bcq-cli/ssr.cjs` writes pre-rendered static HTML snapshots (into `snapshots/`, sourced from `public/data/pages` + `public/data/pages-md` + `sitemap.json`) for crawlers/social-preview scraping.
- `lib/` holds only the generated npm bundle files. The readable pass of `build:bundle` empties it first, so never put hand-written files there.
- `npm run build:bundle` (config: `vite.bundle.config.js`) produces the npm-consumable bundle in `lib/` by running vite twice: the default mode writes readable `bcq-ui.js` + `bcq-ui.css`, `--mode min` writes `bcq-ui.min.js` + `bcq-ui.min.css` (terser for JS, because vite's esbuild minifier keeps whitespace in ES lib builds). The JS is an ES module whose default export is the `BcqUi` install function. Everything in `package.json` `dependencies`/`peerDependencies` is kept external (imported, not bundled). Entry point is `src/lib.js`, which itself stays unbundled for the docs site/dev server. Don't edit files in the output folder by hand. `prepublishOnly` runs this build automatically before `npm publish`.
- TypeScript types: `src/lib.d.ts` (hand-written; declares the default export as a Vue `Plugin`) types `src/lib.js` directly and is copied by the `copyTypes()` plugin in `vite.bundle.config.js` to `lib/bcq-ui.d.ts` and `lib/bcq-ui.min.d.ts`. `package.json` points `types` and `exports["."].types` at `lib/bcq-ui.min.d.ts`. If the library's public exports change, update `src/lib.d.ts`. `src/lib.d.ts` imports `./bcq-ui-components`, i.e. `src/bcq-ui-components.d.ts`: AUTO-GENERATED by `bcq-cli/types.cjs` (`npm run bcq:types`, first step of `build:bundle`) — never edit it by hand. It augments Vue's `GlobalComponents` with every component exported from `src/bcq-ui/components/index.js` (keyed by the component's `name` option), mapping runtime prop types to TS types, `required: true` to non-optional, literal defaults to `@default` JSDoc, and `emits` to `on*` handler props. It is also copied to `lib/bcq-ui-components.d.ts`. New components need nothing extra as long as they keep the usual options-API shape (`export default { name, props: { x: { type, default } }, emits: [...] }`).
- Every file in `lib/` (.js, .css, .d.ts) starts with a `/*! ... */` header (library name, version, package name, copyright, docs URL, license), added by the `banner()` plugin in `vite.bundle.config.js` from `package.json` (`appName`, `version`, `name`, `vendor`, `vendorUrl`, `website`, `license`). Deliberately no build timestamp, since `lib/` is committed. After bumping the version, rebuild so the headers match.
- npm package entry points (`package.json`): `.` → `lib/bcq-ui.min.js` (also `main`/`module`), `./style.css` → `lib/bcq-ui.min.css` (also `style`), `./lib/*` → any file in `lib/` (e.g. the non-minified ones or `variables.css`), `./source` → `src/lib.js` (unbundled sources). `files` is `["src", "lib"]`. If you rename or move bundle files, update these too.
- CSS variables (`src/bcq-ui/styles/variables.css`: theme colors, fonts, etc.) are deliberately NOT included in any bundled CSS. Users copy `lib/variables.css`, customize it, and import it themselves BEFORE `bcq-ui(.min).css` (see `public/code/bcq-ui-main-js.md`). The `copyVariablesCss()` plugin in `vite.bundle.config.js` copies it unchanged (not minified) to `lib/variables.css`. Don't add it back into the bundle CSS: it would load after the user's copy and override their customizations.
- Verifying the bundle: `npm run dev:bundle` (`vite --mode bundle`, see `useLibraryBundle()` in `vite.config.js`) swaps the `./lib.js` import in `src/main.js` for the bundle's JS + CSS, points `main.js`'s `variables.css` import at `lib/variables.css`, and blanks out any other `./bcq-ui/...` imports in `main.js`, so every demo page runs on the bundle alone. Compare against `npm run dev`; any difference is a bundling bug.
- `lib/` is build output but is committed to git and must always be present and up to date. It is regenerated by `npm run build:bundle`, which also runs at the end of `build`, in `dev:bundle` and in `prepublishOnly`. After changing anything under `src/bcq-ui/`, rebuild it before committing. The docs site itself does not import it (it uses `src/lib.js`), except in `dev:bundle` mode.
- The library components use `this.$emitter` (a `mitt` instance) but never create it; the host app must set `app.config.globalProperties.$emitter = mitt()` (the docs site does this in `src/main.js`).
