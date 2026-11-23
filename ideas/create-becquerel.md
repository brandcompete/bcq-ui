# Idea: `npm|pnpm|yarn|bun create becquerel` project scaffolder

Status: **v1 built in `create-becquerel/` on branch `create-becquerel`, not published yet** (notes from 2026-11-20, updated 2026-11-23).

v1 (2026-11-23): `index.js` (`@clack/prompts`; asks for the project name, what to do with a folder that isn't empty,
and "install now?" (default yes); flags `--install`, `--no-install`, `-f/--force`, `-h`, `-v`; non-interactive
(no TTY) uses defaults and doesn't install unless `--install`), `template/` (starter page: card with buttons,
theme toggle, docs link), `scripts/sync.js` (`npm run sync`, prepublishOnly). Tested: `npm pack` + scaffold +
install + build with npm and pnpm (strict), page renders in headless Chrome without console errors. Not tested yet:
yarn, bun, Windows, the interactive prompts in a real terminal. `vue-virtual-scroller` is pinned to `^2.0.0`
(same major as the library repo); 3.x exists but is untested with `<bc-dropdown>`.

vue-router option (2026-11-23): `--router`/`--no-router`, prompt "Add vue-router?" defaults to yes (non-interactive:
only with `--router`). Installs `vue-router` (now `^4.6.5`, see "npm warnings" below), adds `src/router/index.js`
(`createWebHistory`, one route `/` → `src/pages/hello-world.vue`) and `app.use(router)` in `main.js`, and puts
`<router-view />` into `<bc-layout>`'s `main` slot of `App.vue`. Built as an overlay (`overlays/router/` + `FEATURES`
in `index.js`), the pattern axios and pinia will follow. Tested with npm and pnpm (build + headless render).
The starter `App.vue` is now a `<bc-layout>` skeleton (header, sidebars, main, footer placeholders).

axios option (2026-11-23): `--axios`/`--no-axios`, prompt "Add axios + vue-axios?" defaults to yes. Adds
`axios@^1.21.1` + `vue-axios@^3.6.0` and, as in the docs site's `src/main.js`, `import axios`/`import VueAxios`
plus `app.use(VueAxios, axios)` (gives `this.axios` and `this.$http`). Edits only, no overlay files. Tested alone and
combined with the router (pnpm build, `this.$http`/`this.axios` checked at runtime).

Project name (2026-11-23): the "Project name:" prompt (only when no folder is passed) shows `e.g. my-app` and is
required (no silent default; without a TTY it still falls back to `becquerel-app`). Whatever is typed (or passed
as argument) becomes ONE name via `toProjectName()`: accents stripped, lowercase, anything but `a-z0-9._~` -> a single
dash, no separators at the ends (`My Café App!` -> `my-cafe-app`), always a valid npm package name. It's used for the
new folder (parent folders untouched), `package.json` `name`, `App.vue`'s `<template v-slot:header>` and
`index.html`'s `<title>`; the CLI prints `Project name: <name>` when it differs from the input. Names with nothing
usable left (e.g. `???`) are rejected. The separate "Package name:" prompt and the HTML escaping were dropped as no
longer needed. With `.` the existing folder keeps its own name; only the project name is cleaned up.

Pinia + hello-world page (2026-11-23): `--pinia`/`--no-pinia`, prompt "Add Pinia?" defaults to yes. Adds
`pinia@^4.1.0` (v4; its required peer `@vue/devtools-api` is auto-installed by npm and pnpm), `app.use(createPinia())`
in `main.js`, and from `overlays/pinia/` an options-API store `src/stores/counter.js` (state, getter, actions) plus
`src/components/pinia-counter.vue` (`mapState`/`mapActions`), shown on the hello-world page. `src/pages/hello-world.vue`
moved from the router overlay into the base template (decided: every project gets it): without the router `App.vue`'s
main slot renders `<page-hello-world />`, with the router that becomes `<router-view />` (route `/`). The page lists
what's installed (Vue 3 + Vite, Becquerel UI, then one line per chosen option), inserted before
`<!-- installed options -->` / `<!-- examples -->` anchor comments that the CLI removes afterwards. All 4 combinations
tested (none, router only, pinia only, all): pnpm install + build, headless render, counter store works.

Theme (2026-11-23): "Theme:" select prompt (Dark / Light, default Dark, the library default) and `--theme dark|light`
(case-insensitive; an unknown value exits with an error; non-interactive default dark). Sets `dark: true|false` in
`App.vue`'s `data()`, which drives `<bc-app :dark="dark">`. Asked after the folder check, before the feature prompts.
Tested: both values, default, invalid value; light theme rendered in headless Chrome.

npm warnings (2026-11-23): vue-router 5 depends on its file-based-routing tooling (`ast-walker-scope`, `chokidar@6`,
`@babel/parser@8`, ...), which requires Node 22.18+, so `npm install` printed 7 EBADENGINE warnings on Node 20.
Decided: use vue-router `^4.6.5` (same router API, same as the docs site, ~35 fewer packages, no warnings). Pinia 4
then needs its required peer `@vue/devtools-api@^8` declared explicitly (vue-router 4 depends on v6 of it, and pnpm
would hand Pinia that one: "unmet peer"). Result: npm and pnpm install without any warning for every combination.

Goal: like `pnpm create vuetify` / `npm create vite`, let people bootstrap a new Vue 3 + Vite project
with Becquerel UI already installed and configured, with one command.

## How `create` commands work

- `pnpm create <name>` (same for `npm create` / `npm init`, `yarn create`, `bun create`) is only a naming
  convention: it downloads the npm package `create-<name>` into the package manager's cache (like `pnpm dlx` / `npx`)
  and runs its `bin` script in the current folder. Nothing is installed globally, and the user always gets the latest version.
- So the scaffolder is **a separate, ordinary npm package**, a CLI tool (has `bin`), never imported by anyone and
  not added to the generated project. The generated project depends on `@martin.ivanov.brandcompete/bcq-ui` as usual.
- The command only exists once the package is **published to npm** (or a private registry + `.npmrc`); before that it 404s.
- Name mapping:

  | Command | Package |
  |---|---|
  | `pnpm create becquerel` | `create-becquerel` |
  | `pnpm create @scope` | `@scope/create` |
  | `pnpm create @scope/becquerel` | `@scope/create-becquerel` |

- Usage the script should support:

  ```sh
  pnpm create becquerel my-app   # creates ./my-app
  pnpm create becquerel .        # scaffolds into the current (empty) folder
  pnpm create becquerel          # asks for the name
  ```

## Package managers: npm, pnpm, yarn, bun

The user picks the package manager, not us. The same `create-becquerel` package works with all four, so the docs
show all four commands (like Vuetify does):

```sh
npm create becquerel@latest my-app
pnpm create becquerel my-app
yarn create becquerel my-app
bun create becquerel my-app
```

(`npm create x@latest` makes npm skip a possibly outdated cached version; `npm init becquerel` is the same thing.)

The script detects the package manager that ran it from `process.env.npm_config_user_agent`
(starts with `npm/`, `pnpm/`, `yarn/` or `bun/`; fall back to npm), installs with it, and prints matching next steps:

| Package manager | Install | Dev server | Lockfile |
|---|---|---|---|
| npm | `npm install` | `npm run dev` | `package-lock.json` |
| pnpm | `pnpm install` | `pnpm dev` | `pnpm-lock.yaml` |
| yarn | `yarn` | `yarn dev` | `yarn.lock` |
| bun | `bun install` | `bun dev` | `bun.lock` |

Differences that matter for us:
- npm (bundled with Node) copies packages into a flat, hoisted `node_modules`, so code can import packages it never
  declared, as long as some dependency pulls them in.
- pnpm keeps one shared store on the machine and links packages into projects (faster, saves disk space), and is
  **strict**: a project can only import what its own `package.json` declares. Yarn (Plug'n'Play mode) is strict too;
  bun behaves like npm.
- Consequence: `public/code/bcq-ui-main-js.md` has users `import mitt from 'mitt'` and the `@mdi/font` CSS. These are
  bcq-ui dependencies, so the imports happen to work with npm but **fail with pnpm** unless the user installs them.
  `vue-virtual-scroller` is not a bcq-ui dependency at all and always has to be installed by the user. So:
  - the template must declare `mitt`, `@mdi/font` and `vue-virtual-scroller` itself (see below);
  - independently of the scaffolder, the getting-started docs should tell users to install everything they import,
    with one command per package manager:

    ```sh
    npm i @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
    pnpm add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
    yarn add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
    bun add @martin.ivanov.brandcompete/bcq-ui mitt @mdi/font vue-virtual-scroller
    ```
- This repo itself stays on npm (`package-lock.json`, Dockerfile); switching would gain little.

## Decisions

Decided (2026-11-20):
1. **Package name: `create-becquerel`** (unscoped), so the command is `npm|pnpm|yarn|bun create becquerel`.
   Check it's still free before publishing: `npm view create-becquerel` (a 404 means free).
2. **Location: a separate `create-becquerel/` directory in this repo**, with its own `package.json` and version,
   published on its own. Keeps the sync with the library simple (the publish script reads the root `package.json`
   and `lib/variables.css` directly). It is not part of the library package (the library's `files` is only
   `["src", "lib"]`) and the docs build doesn't touch it.

3. **Scope (decided 2026-11-23).** v1 is a single, preconfigured Vue 3 + Vite + Becquerel UI project, with no prompts
   besides the project name. Later versions add opt-in extras, each as a prompt and a flag:
   - **vue-router** (`--router`): `src/router/index.js`, a couple of example pages, `<router-view>` in `App.vue`.
   - **axios + vue-axios** (`--axios`): installed and registered in `main.js` (`app.use(VueAxios, axios)`), as the docs site does.
   - **pinia** (`--pinia`): `createPinia()` in `main.js` plus an example store in `src/stores/`.

   Every option multiplies the combinations to test, so build each one as a small additive overlay on the base template
   (extra files plus edits to `package.json`/`main.js`) instead of a separate full template. TypeScript stays out of scope for now.

## What needs to be built

### The package
- `package.json`: `"name": "create-becquerel"`, `"bin": { "create-becquerel": "index.js" }`, `"engines"` (Node >= 18/20),
  `"files": ["index.js", "template"]`. Keep dependencies minimal (fast download): Node's `util.parseArgs` + `readline`,
  or a small prompt lib (`@clack/prompts`, `prompts`).

### The CLI script (`index.js`)
1. Take the target folder from argv or ask; `.` = current folder. Refuse/confirm if the folder isn't empty
   (allowing e.g. `.git`, README, like `create-vite` does).
2. v1: no extra prompts. Later: optional prompts, each also available as a flag for non-interactive use
   (`--router --axios --pinia -y`): vue-router, axios + vue-axios, pinia, install dependencies now, `git init`.
3. Copy the template, replace placeholders (project name, versions).
4. Rename `_gitignore` -> `.gitignore` (npm strips `.gitignore` from published packages).
5. Detect the package manager from `process.env.npm_config_user_agent` (see "Package managers" above),
   optionally install with it.
6. Print next steps for that package manager (`cd my-app`, then `npm run dev` / `pnpm dev` / `yarn dev` / `bun dev`).

### The template (Vite + Vue 3, pre-wired as in `public/code/bcq-ui-main-js.md`)
- `package.json` dependencies: `vue`, `@martin.ivanov.brandcompete/bcq-ui`, `mitt`, `@mdi/font`, and
  **`vue-virtual-scroller`** (needed by `<bc-dropdown>` but not a library dependency, so the template must add it).
  devDependencies: `vite`, `@vitejs/plugin-vue`.
- `src/main.js`: import `./styles/variables.css` FIRST, then `@martin.ivanov.brandcompete/bcq-ui/style.css`, `BcqUi`,
  `@mdi/font/css/materialdesignicons.css`, register `RecycleScroller`, set `app.config.globalProperties.$emitter = mitt()`,
  `app.use(BcqUi)`.
- `src/styles/variables.css`: a copy of `lib/variables.css` for the user to customize (removes the most error-prone
  manual step of the current getting-started guide).
- `src/App.vue`: small starter page (`<bc-app>`, a card, a few `<bc-btn>`s) so it's obvious everything works.
- `index.html`, `vite.config.js`, `_gitignore`, README. TS variant later (`main.ts`, `env.d.ts`, see `public/code/bcq-ui-main-ts.md`).

### The template is a runnable Vue project (fine-tune without publishing)
The `template/` folder must work as a normal Vite project, so it can be edited and checked like any app:

```sh
cd create-becquerel/template
npm install
npm run dev     # edit App.vue, main.js, variables.css... with hot reload
```

What's in `template/` is exactly what new projects get; publishing is only needed to ship changes to users.
Rules that keep it runnable:
- No placeholders that break it: use real values (e.g. `"name": "becquerel-app"`) that the CLI replaces when
  scaffolding, not `{{name}}` markers.
- Local leftovers (`node_modules`, lockfiles, `dist`) are excluded from the published package (`files` / `.npmignore`)
  and skipped by the CLI when copying.
- `_gitignore` is the only renamed file (npm strips `.gitignore`); it doesn't affect running the project.
- By default the template uses the published bcq-ui from npm, like a real user. Optionally add a script that points
  it at this repo's local `lib/` bundle, to check it against unreleased library changes.
- The full flow can be run without publishing: `node create-becquerel/index.js /tmp/my-app` scaffolds from the current template.

## Keeping it in sync with the library (the part that silently rots)
- bcq-ui version in the template: a prepublish script writes `^<library version>` from the root `package.json`
  (or use `"latest"`).
- `variables.css`: copy it into the template at publish time (same idea as `bcq-cli/variables.cjs`).
- If the required consumer setup changes (e.g. `vue-virtual-scroller` becomes a real dependency, `$emitter` no longer
  needed), update the template together with `public/code/bcq-ui-main-js.md`.
- Optional CI job: on each library release, scaffold a project and run `install` + `build`.

## Testing and publishing
- Local test without publishing:

  ```sh
  cd create-becquerel && npm pack                 # -> create-becquerel-1.0.0.tgz
  mkdir /tmp/test-app && cd /tmp/test-app
  pnpm dlx /path/to/create-becquerel-1.0.0.tgz .   # or: npx, yarn dlx, bunx with the same path
  pnpm i && pnpm dev && pnpm build
  ```

  Test with all four (npm, pnpm, yarn, bun); pnpm is the one that catches undeclared dependencies.
- Publish: `npm publish` (`--access public` if scoped). Versioned independently from the library.

## Docs
- Quick-start page: make the create command the recommended way to start, shown for npm, pnpm, yarn and bun
  (e.g. as tabs); keep the manual steps for adding the library to an existing project, with the install command
  for each package manager listing all imported packages (see "Package managers").

## Effort
About a day for a JS-only version with 2-3 prompts, mostly spent on the template and testing.
