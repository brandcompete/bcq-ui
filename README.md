# Becquerel for Vue 3

> This project is still a work in progress, so be patient.

The Vue3 UI library developed by us at brandcompete GmbH provides a comprehensive and growing set of tools for building modern, consistent user interfaces. It includes a continuously expanding collection of ready-to-use UI components, flexible form controls, and versatile layout elements. In addition, the library offers practical directives, along with a wide range of carefully designed typography styles and utility CSS classes to help streamline development and maintain visual consistency.

## Demo and documentation

https://bcq-ui.brandcompete.com/

## Creating a new project with BCQ

The quickest way to start: [create-becquerel](https://www.npmjs.com/package/create-becquerel) scaffolds a Vue 3 + Vite project with BCQ UI already installed and configured. It asks for the project name, theme (dark/light), JavaScript or TypeScript, and whether to add vue-router, axios + vue-axios and Pinia. `my-app` is the project folder; leave it out to be asked for a name.

```bash
# npm
$ npm create becquerel@latest my-app
# pnpm
$ pnpm create becquerel my-app
# yarn
$ yarn create becquerel my-app
# bun
$ bun create becquerel my-app
```

Then start the dev server (if you let the script install the dependencies):

```bash
$ cd my-app
$ npm run dev   # npm
$ pnpm dev      # pnpm
$ yarn dev      # yarn
$ bun dev       # bun
```

To skip the prompts, pass options (with npm, put `--` before them):

```bash
$ npm create becquerel@latest my-app -- --ts --router --axios --pinia --theme light
$ pnpm create becquerel my-app --ts --router --axios --pinia --theme light
$ yarn create becquerel my-app --ts --router --axios --pinia --theme light
$ bun create becquerel my-app --ts --router --axios --pinia --theme light
```

Available options: `--ts` / `--js`, `--theme dark|light`, `--router` / `--no-router`, `--axios` / `--no-axios`, `--pinia` / `--no-pinia`, `--install` / `--no-install`, `-f` / `--force` (empty a folder that is not empty, keeps `.git`), `-h` / `--help`.

### How the create CLI works

`npm create becquerel` (and the pnpm, yarn and bun equivalents) downloads the [create-becquerel](https://www.npmjs.com/package/create-becquerel) package into the package manager's cache and runs it in the current folder. Nothing is installed globally, and you always get the latest version. Then it:

1. Turns the project name into a valid npm package name (`My Café App` → `my-cafe-app`), used for the folder, `package.json`, the page header and `<title>`.
2. Asks the remaining questions (theme, language, vue-router, axios + vue-axios, Pinia, install now?). Options passed on the command line skip their question.
3. Copies a ready-to-run Vue 3 + Vite + BCQ UI project: `main.js` installs BCQ UI with everything it needs (`variables.css`, styles, `$emitter`, `RecycleScroller`, Material Design Icons), and `App.vue` holds a `<bc-layout>` showing a hello-world page.
4. Adds each chosen option on top: its packages in `package.json`, its setup in `main.js`, example files (a route, a Pinia store) and a line in the hello-world page's "What's installed" list.
5. For TypeScript, converts the result: `.js` → `.ts`, `<script lang="ts">` with `defineComponent()`, `tsconfig.json`, and a type check with `vue-tsc` before every build.
6. Optionally installs the dependencies with the package manager you ran it with, and prints the next steps.

## Installing BCQ and adding it to a Vue project

```bash
# BCQ UI
$ npm install --save @martin.ivanov.brandcompete/bcq-ui
# Virtual scroller, required by <bc-dropdown />: https://www.npmjs.com/package/vue-virtual-scroller
$ npm install --save vue-virtual-scroller
# Event bus: https://www.npmjs.com/package/mitt
$ npm install --save mitt
# Material Design font: https://www.npmjs.com/package/@mdi/font, required by <bc-icon />
$ npm install --save @mdi/font
```

Or all at once, with your package manager. Install all four packages: `main.js` below imports each of them, and pnpm (and Yarn in Plug'n'Play mode) only let a project import packages it declares itself.

```bash
$ npm i @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
$ pnpm add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
$ yarn add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
$ bun add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
```

// main.js
```javascript
// Import BCQ UI
// Copy variables.css from 'node_modules/@martin.ivanov.brandcompete/bcq-ui/lib/variables.css' to your 'src' folder, modify colors, etc. if needed,
// and import it BEFORE the BCQ UI styles
import '/your/path/to/variables.css'
import '@martin.ivanov.brandcompete/bcq-ui/style.css'
import BcqUi from '@martin.ivanov.brandcompete/bcq-ui'
// Import RecycleScroller, required by <bc-dropdown />
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Import mitt
import mitt from 'mitt'
// Import Material Design Icon font, required by <bc-icon />
import '@mdi/font/css/materialdesignicons.css'

// Add mitt event emitter to the global properties
app.config.globalProperties.$emitter = mitt() // Use as this.$emitter.on(event, data), this.$emitter.emit(event, data), etc.

// Register RecycleScroller globally, <bc-dropdown /> uses it as <recycle-scroller />
app.component('RecycleScroller', RecycleScroller)

// use BCQ UI
app.use(BcqUi)
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

Install the dependencies:

```sh
npm install
```

### Development

```sh
npm run dev
```

Starts the Vite dev server with hot reload for the documentation/demo site. The site uses the unbundled library sources (`src/lib.js`), so changes in `src/bcq-ui/` show up immediately.

```sh
npm run dev:bundle
```

Builds the npm bundle (`npm run build:bundle`), then starts the dev server with the docs site running on the bundled files from `lib/` instead of the sources. Use it to check that the bundle works exactly like the sources; any difference compared to `npm run dev` is a bundling bug. Add `BCQ_BUNDLE=full` to test the non-minified files instead of the minified ones.

### Building

```sh
npm run build
```

Builds everything: updates the root `CHANGELOG.md` (`npm run bcq:changelog`), copies the CSS variables to `public/code/variables.css` (`npm run bcq:variables`), builds the docs site into `dist/` (including the sitemap), generates `dist/llms.txt` and the pre-rendered static pages in `snapshots/`, then runs `npm run build:bundle` (component types + the npm bundle in `lib/`).

```sh
npm run build:bundle
```

Generates the component types (`npm run bcq:types`), then builds the library bundle that is published to npm into `lib/`:

- `bcq-ui.js` / `bcq-ui.min.js` - the library as an ES module (readable and minified)
- `bcq-ui.css` / `bcq-ui.min.css` - the library styles (readable and minified)
- `variables.css` - the CSS variables (colors, fonts, etc.), not minified, to be copied and customized by the users
- `bcq-ui.d.ts` / `bcq-ui.min.d.ts` - TypeScript type declarations, copied from `src/lib.d.ts`
- `bcq-ui-components.d.ts` - TypeScript types for all `<bc-*>` components (props and events), generated by `npm run bcq:types`

`lib/` is emptied before each build. It is already part of `npm run build`; run it on its own for a quick library-only rebuild after changing anything in `src/bcq-ui/`.

```sh
npm run preview
```

Serves the production build from `dist/` locally. Run `npm run build` first.

### Tools

```sh
npm run bcq:create
```

Interactive scaffolder for a new UI component. Asks for a category (`content`, `ui` or `forms`) and a name, creates the component, its demo page, documentation, page metadata and code snippet from the templates in `bcq-cli/templates/`, generates a random social-sharing thumbnail (`npm run bcq:thumbnail`), and prints the remaining manual steps.

```sh
npm run bcq:types
```

Generates `src/bcq-ui-components.d.ts`, the TypeScript types for every component installed by the library, from the `name`, `props` and `emits` of each `.vue` file listed in `src/bcq-ui/components/index.js`. Gives TypeScript users prop autocomplete and type checking for `<bc-*>` components in their templates. Already part of `npm run build:bundle`; never edit the generated file by hand.

```sh
npm run bcq:thumbnail -- <kebab-name> [--force]
```

Generates a random 1200x630 PNG (the social-sharing / `og:image` size) of geometric shapes in the brand colors on a `#212121` background and saves it as `public/images/thumbnails/<kebab-name>.png`. Refuses to overwrite an existing thumbnail unless `--force` is given, so run it again with `--force` until you like the result. Already part of `npm run bcq:create`.

```sh
npm run bcq:changelog
```

Copies `public/data/components-md/CHANGELOG.md` (the changelog shown on the docs site) over the root `CHANGELOG.md`. Edit the changelog only in `public/data/components-md/CHANGELOG.md`. Already part of `npm run build`.

```sh
npm run bcq:variables
```

Copies `src/bcq-ui/styles/variables.css` (the library's CSS variables) unchanged to `public/code/variables.css`, so the docs site always shows the current version. Edit the variables only in `src/bcq-ui/styles/variables.css`. Already part of `npm run build`.

```sh
npm run bcq:llms
```

Regenerates `dist/llms.txt`, an LLM-readable summary of the documentation in `public/data/pages-md/`. Already part of `npm run build`.

```sh
npm run bcq:ssr
```

Regenerates the pre-rendered static HTML pages in `snapshots/` (used by crawlers and social media previews). Already part of `npm run build`.

### Publishing

`prepublishOnly` is not meant to be run manually: npm runs it automatically before `npm publish`, and it rebuilds the bundle (`npm run build:bundle`), so the published package always contains the latest bundle.
