# Idea: Becquerel plugins

Status: **idea, nothing implemented** (notes from 2026-11-25).

Goal: let people (other teams, other projects, ourselves) add components, directives, themes etc. that look and
behave like native `Bc*` components, published as their own npm packages, **without** having to change bcq-ui and
release a new library version for every addition.

## What "plugin" means here

A Becquerel plugin is an ordinary Vue plugin (`{ install (app, options) }`) published as a normal npm package with
`@martin.ivanov.brandcompete/bcq-ui` as a `peerDependency`. bcq-ui provides an "extension kit" (public helpers,
an install hook, type helpers, a scaffolder), not a runtime plugin loader.

Explicitly **not** planned: loading plugins at runtime from a URL/registry/CDN. It brings security problems
(arbitrary remote code), doesn't work with SSR (`bcq-cli/ssr.cjs`), tree-shaking or TypeScript, and has no advantage
over `npm i`.

## Why it isn't possible (well) today

Vue's `app.use()` already lets anyone register extra components next to bcq-ui. What's missing to make them feel
native:

1. **Helpers aren't public.** `src/bcq-ui/mixins/methods.js` (`componentBaseCss`, `makeUiColorVariant`,
   `makeElevation`, `makeBorderRadius`, `makeFontSize`, `uuid`, ...) and the individual directives are not exported
   from the bundle; the only export of `lib/bcq-ui(.min).js` is the install function. A third party would have to
   import from `/source` (unbundled sources), which duplicates code and couples to internal file paths.
2. **No install options.** `BcqUi (Vue)` in `src/bcq-ui/index.js` takes no options, so there's no
   `app.use(BcqUi, { plugins: [...] })`.
3. **No type story.** Built-in components get their `GlobalComponents` augmentation from `bcq-cli/types.cjs`;
   a plugin has nothing comparable.
4. **No event contract.** Components talk via `this.$emitter` (mitt), but event names are ad hoc and inconsistent
   (`bc-dropdown-hide`, `bc-tooltip:hide`, `bc-snackbar:message`, `bc-notification`). Plugins that want to trigger
   a snackbar or close dropdowns would depend on undocumented strings.

## Proposed API

### 1. Named exports next to the default export

```js
import BcqUi, { bcMethods, defineBcComponent, directives, events } from '@martin.ivanov.brandcompete/bcq-ui'
```

- `bcMethods`: the `methods` mixin (maybe a curated subset; see "Public API surface" below).
- `directives`: `{ ripple, tooltip, liquidGlass, intersect, ... }`, so plugins can use them locally or reuse them.
- `events`: constants for the documented `$emitter` events (`events.SNACKBAR_MESSAGE`, `events.DROPDOWN_HIDE`, ...).
- Individual components (`BcBtn`, `BcCard`, ...) are already re-exported from `components/index.js` internally;
  exposing them allows plugins to compose them explicitly (and enables tree-shaking for consumers later).

Update `src/lib.d.ts` accordingly.

### 2. `defineBcComponent()`

A thin wrapper around a component options object that applies the library conventions:

```js
export default defineBcComponent({
  name: 'BcFancyThing',           // must start with Bc
  bcProps: ['color', 'variant', 'size', 'roundness', 'elevation'],  // standard props with library defaults
  props: { ... },
  computed: {
    componentCssClasses () {
      return this.componentBaseCss('fancy-thing', [this.makeElevation(this.elevation)])
    }
  }
})
```

- adds the `methods` mixin,
- adds the requested standard props with the same types/defaults as the built-in components (single source of
  truth: move these prop definitions from the individual components into a shared `src/bcq-ui/mixins/props.js`,
  which the built-in components could use too),
- validates the `Bc` prefix in dev mode,
- returns a component with an `install()` like `components/<name>/index.js` does today.

Built-in components could migrate to it gradually; not required.

### 3. Install options

```js
import BcqUi from '@martin.ivanov.brandcompete/bcq-ui'
import BcqCharts from '@acme/bcq-charts'

app.use(BcqUi, {
  plugins: [BcqCharts, [BcqOther, { someOption: true }]]
})
```

- `BcqUi(app, opts)` passes `opts` through to `components.BcqUi.install`.
- Plugins are installed after the built-in components and directives.
- Each plugin's `install(app, options, bcq)` gets a third argument `bcq` = `{ version, emitter, methods, events }`
  so it doesn't have to import bcq-ui at all for the basics (avoids a second copy if versions mismatch).
- `app.use(BcqPlugin)` directly, after `app.use(BcqUi)`, keeps working; `plugins` is just convenience + ordering +
  the `bcq` context.

### 4. Plugin metadata and compatibility

Optional fields on the plugin object:

```js
export default {
  name: 'bcq-charts',
  bcq: '^3.2.0',                // supported bcq-ui range
  components: ['BcLineChart'],  // for conflict detection / docs
  install (app, options, bcq) { ... }
}
```

- In dev mode bcq-ui warns if its version is outside the `bcq` range (simple semver check, no dependency) or if a
  plugin registers a component name that already exists (built-in or from another plugin). No hard errors.
- npm `peerDependencies` already handles most of the version problem; this is only for clearer messages.

### 5. Types

- Document the pattern for a plugin's own `.d.ts` (augment `GlobalComponents` from `vue`).
- Better: make `bcq-cli/types.cjs` reusable (e.g. a `bcq-types` bin in the package, or exported function) taking a
  components `index.js` and an output path, so plugins generate their types exactly like the library does.
- Export the standard prop types (`BcColor`, `BcSize`, `BcVariant`, ...) from `src/lib.d.ts`.

### 6. CSS and theming

- Plugins should build on the existing utility classes and `variables.css` custom properties (`--bc-...`) instead
  of hardcoding colors, so they follow the user's theme and dark/light mode automatically.
- Plugin CSS ships as its own file (`@acme/bcq-charts/style.css`), imported after `bcq-ui(.min).css`. Same rule as
  for the library: never bundle `variables.css`.
- Document which CSS variables and utility classes count as public API.

## Kinds of plugins this enables

- **Component packs**: domain-specific components (charts, maps, a brand widget, a rich-text editor).
- **Directive packs**: e.g. `v-drag`, `v-autofocus`, `v-clipboard`.
- **Theme presets**: ready-made `variables.css` variants (high contrast, brand themes) plus optional extra
  utility classes. No JS needed; could even be a plain CSS package.
- **Icon packs**: map alternative icon sets to what `<bc-icon>`/`<bc-svg-icon>` expect.
- **Behavior plugins**: no components, just listening to/emitting `$emitter` events, e.g. log every
  `bc-notification` to analytics, or a global keyboard-shortcut layer.
- **Official optional plugins**: heavy components with big third-party dependencies could live as first-party
  plugins so the core bundle stays small. Example: when `bc-editor` comes back (quill-based, currently only
  temporarily disabled), shipping it as `bcq-ui-editor` means only people who use it install quill. Same could
  apply to future chart/map components. (Decision for later, not a reason to move existing components.)

## Tooling

- **Scaffolder**: `npm create becquerel -- --plugin` (or a separate prompt "Project type: app / plugin") generating
  a plugin package: `src/index.js` (plugin object), one example `defineBcComponent` component, a Vite library-mode
  config that externalizes `vue` and bcq-ui, a `playground/` app using the plugin, type generation, README. Reuses
  the `create-becquerel` overlay mechanism.
- **Local plugin**: the same API works for components inside an app (`src/plugins/my-stuff.js`), no package needed.
  Worth a docs example, since that's probably the most common use.
- **`bcq:create` analogue** for plugin repos: maybe later, the scaffolded plugin can include a small script.

## Docs site

- New page `getting-started/plugins` (prose in `public/data/pages-md/getting-started/plugins.md`, meta, route,
  sitemap): writing a plugin, the public API, conventions, CSS rules, types.
- Optional "Plugins" gallery page listing known plugins (a JSON file in `public/data/`, maintained by hand / PRs).
- The "library bundler" page (`public/data/miscellaneous/bundler-defs.json`) is unaffected.

## Public API surface: the real cost

Everything exported becomes a contract: renaming `componentBaseCss` or changing a prop default after plugins depend
on it is a breaking change (major version). So:

- export a small, deliberate surface; keep the rest internal,
- maybe mark it `@experimental` for one minor version before freezing it,
- list it explicitly in the docs and in `src/lib.d.ts`,
- note breaking changes to it in the changelog (`public/data/components-md/CHANGELOG.md`).

Candidates to NOT export: `gcd`, `calculateAspectRatio`, `percentage`, `awaitForElement`, `sleep` (generic helpers
unrelated to the design system).

## Open questions

- Who is the audience? If it's mostly us, adding components to the library and releasing (`bcq:create` makes
  that quick) may be simpler, and only steps 1 + 3 are worth doing. If other teams want their own components
  without forking or waiting for releases, the whole plan makes sense.
- Should the `$emitter` move into bcq-ui (created by `install()` if the host app hasn't set one)? Today the host app
  must create it; plugins would make that requirement more visible. Probably yes, keeping a user-provided one if
  present.
- Naming convention for plugin packages: `bcq-ui-plugin-*` / `@scope/bcq-*`? And should plugin components be
  allowed to use the `Bc` prefix, or use their own (`Acme*`) to avoid future clashes with built-in names?
- Do we want tree-shakable named component exports for consumers as part of this, or separately?
- Event naming: unify to `bc-<component>:<action>` (with the old names kept as aliases for a while)?

## Suggested order

1. Install options + `plugins` array + `bcq` context (small, non-breaking).
2. Named exports (`bcMethods`, `directives`, `events`) + `src/lib.d.ts` + docs page.
3. Shared standard props + `defineBcComponent()`.
4. Reusable type generation.
5. `create-becquerel --plugin` template.
6. Optional: gallery page, first official plugin (e.g. editor).
