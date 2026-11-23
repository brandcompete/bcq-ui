# create-becquerel

Scaffold a new Vue 3 + Vite project with [Becquerel UI](https://bcq-ui.brandcompete.com/) already installed and configured.

```sh
npm create becquerel@latest my-app
pnpm create becquerel my-app
yarn create becquerel my-app
bun create becquerel my-app
```

Use `.` as the folder name to scaffold into the current folder, or leave it out to be asked for a name.
The name is turned into a valid npm package name (`My Café App!` -> `my-cafe-app`) and used for the folder, `package.json`, the header of the starter page and the page title.
The dependencies are installed with the package manager you ran the command with.

## Options

| Option | Description |
|---|---|
| `--theme <dark\|light>` | theme of the new app (`dark` in `App.vue`'s `data`), without asking; default `dark` |
| `--router` | add vue-router (`src/router/index.js`, the hello-world page becomes the `/` route) without asking |
| `--no-router` | don't add vue-router |
| `--axios` | add axios + vue-axios (`app.use(VueAxios, axios)`, then `this.axios` / `this.$http` in components) without asking |
| `--no-axios` | don't add axios + vue-axios |
| `--pinia` | add Pinia (`app.use(createPinia())`, an example counter store in `src/stores/` shown on the hello-world page) without asking |
| `--no-pinia` | don't add Pinia |
| `--install` | install dependencies without asking |
| `--no-install` | skip installing dependencies |
| `-f`, `--force` | empty the target folder if it is not empty (keeps `.git`) |
| `-h`, `--help` | show the help |
| `-v`, `--version` | show the version |

## What you get

- `src/main.js` with Becquerel UI and everything it needs: the `$emitter` event bus (`mitt`), Material Design Icons
  (`@mdi/font`) and `RecycleScroller` (`vue-virtual-scroller`, used by `<bc-dropdown>`).
- `src/styles/variables.css`: the theme variables (colors, fonts, etc.), ready to customize.
- `src/App.vue`: a `<bc-layout>` with the project name in the header and `src/pages/hello-world.vue` in the main area,
  which lists what was installed (Vue, Vite, Becquerel UI and the chosen options) and shows the Pinia example if chosen.

## Development (in the bcq-ui repository)

- `template/` is a normal, runnable Vite project and exactly what new projects get:

  ```sh
  cd create-becquerel/template
  npm install
  npm run dev
  ```

  When copying it, the CLI skips `node_modules`, `dist` and lockfiles, renames `_gitignore` to `.gitignore`
  (npm strips `.gitignore` from published packages) and sets the package name.
- Optional features (`FEATURES` in `index.js`) are applied on top of the base template: the files in
  `overlays/<name>/` are copied over the project, `dependencies` are added to its `package.json`, and `edits`
  (`[find, replace]` pairs) are applied to its files, e.g. the router feature replaces
  `<page-hello-world />` in `App.vue`'s main slot with `<router-view />`. Features add their lines to
  `hello-world.vue` before the `<!-- installed options -->` and `<!-- examples -->` anchor comments, which the CLI
  removes afterwards. If a `find` text is missing
  (because the template changed), scaffolding fails with an error naming the feature and file, so keep the template
  and the edits in sync. Overlays aren't runnable on their own; test them by scaffolding, e.g.
  `node index.js playground/my-app --router` (`playground/` is git-ignored).
- `npm run sync` (also runs before `npm publish`) sets the bcq-ui version in `template/package.json` to
  `^<version of the root package.json>` and copies `lib/variables.css` to `template/src/styles/variables.css`.
- Try the whole flow without publishing:

  ```sh
  node create-becquerel/index.js /path/to/my-app
  # or exactly as users get it:
  cd create-becquerel && npm pack
  npx --package=/path/to/create-becquerel-1.0.0.tgz create-becquerel /path/to/my-app
  ```

- Publish: `cd create-becquerel && npm publish`. Versioned independently from the library.
