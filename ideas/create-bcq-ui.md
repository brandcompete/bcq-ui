# Idea: `pnpm create bcq-ui` project scaffolder

Status: **under consideration, nothing built yet** (notes from 2026-11-20).

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
  | `pnpm create bcq-ui` | `create-bcq-ui` |
  | `pnpm create @scope` | `@scope/create` |
  | `pnpm create @scope/bcq-ui` | `@scope/create-bcq-ui` |

- Usage the script should support:

  ```sh
  pnpm create bcq-ui my-app   # creates ./my-app
  pnpm create bcq-ui .        # scaffolds into the current (empty) folder
  pnpm create bcq-ui          # asks for the name
  ```

## Package managers: npm, pnpm, yarn, bun

The user picks the package manager, not us. The same `create-bcq-ui` package works with all four, so the docs
show all four commands (like Vuetify does):

```sh
npm create bcq-ui@latest my-app
pnpm create bcq-ui my-app
yarn create bcq-ui my-app
bun create bcq-ui my-app
```

(`npm create x@latest` makes npm skip a possibly outdated cached version; `npm init bcq-ui` is the same thing.)

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

## Decisions to make

1. **Package name / scope.** `create-bcq-ui` (unscoped; check it's free: `npm view create-bcq-ui`) gives the short
   `pnpm create bcq-ui`. The library lives under the personal scope `@martin.ivanov.brandcompete`, which would make the
   scoped form long. If a move to a company scope (e.g. `@brandcompete`) is planned, decide that first.
2. **Where the code lives.** A `create-bcq-ui/` folder in this repo (easy to keep in sync, must stay out of the
   library's `files`) or its own repo.
3. **Scope of options.** Recommendation: start with one opinionated JS template (Vite + Vue + bcq-ui, maybe vue-router),
   add TypeScript / router / pinia options later. Every option multiplies the combinations to test.

## What needs to be built

### The package
- `package.json`: `"name": "create-bcq-ui"`, `"bin": { "create-bcq-ui": "index.js" }`, `"engines"` (Node >= 18/20),
  `"files": ["index.js", "template"]`. Keep dependencies minimal (fast download): Node's `util.parseArgs` + `readline`,
  or a small prompt lib (`@clack/prompts`, `prompts`).

### The CLI script (`index.js`)
1. Take the target folder from argv or ask; `.` = current folder. Refuse/confirm if the folder isn't empty
   (allowing e.g. `.git`, README, like `create-vite` does).
2. Optional prompts, each also available as a flag for non-interactive use (`--ts --router -y`):
   JS/TS, vue-router, pinia, install dependencies now, `git init`.
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
  cd create-bcq-ui && npm pack                 # -> create-bcq-ui-1.0.0.tgz
  mkdir /tmp/test-app && cd /tmp/test-app
  pnpm dlx /path/to/create-bcq-ui-1.0.0.tgz .   # or: npx, yarn dlx, bunx with the same path
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
