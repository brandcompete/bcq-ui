# Idea: project configurator page on the docs site

Status: idea (2026-11-23), not started.

A page on the docs site (bcq-ui.brandcompete.com, e.g. linked from "Getting started") where people pick their
project options in a form built with BCQ components. The page generates the matching `create becquerel` command,
they copy it and paste it into their terminal. The CLI ([create-becquerel](./create-becquerel.md)) already supports
every option as a flag, so nothing in the CLI has to change.

Chosen over a local web UI inside the CLI (`npm create becquerel -- --ui`, a local server + browser page): that needs a
server, a folder picker, security (localhost only + token) and a bigger package, while people running a create command
are already in a terminal. Vue CLI's `vue ui` was rarely used and was not carried over to create-vue.

## The form

| Field | Control | Options | Default | Flag on | Flag off |
|---|---|---|---|---|---|
| Package manager | tabs or select | npm, pnpm, yarn, bun | npm | - | - |
| Project name | text field | any text, cleaned live (see below); `.` = current folder | `becquerel-app` | `<name>` (positional) | - |
| Theme | select / radio | dark, light | dark | `--theme dark` | `--theme light` |
| Language | select / radio | JavaScript, TypeScript | JavaScript | `--ts` | `--js` |
| vue-router | switch | on / off | on | `--router` | `--no-router` |
| axios + vue-axios | switch | on / off | on | `--axios` | `--no-axios` |
| Pinia | switch | on / off | on | `--pinia` | `--no-pinia` |
| Install dependencies | switch | on / off | on | `--install` | `--no-install` |
| Empty the folder if it is not empty | switch (advanced, with a warning) | on / off | off | `--force` | (no flag) |

Defaults match the CLI's prompt defaults (dark, JavaScript, all features on, install on).

## Building the command

Rules:

1. **Always write every option**, including the ones that are off (`--no-router`, `--js`, `--no-install`, ...). A missing
   option makes the CLI ask about it, so the command would no longer run without questions.
2. **npm needs `--`** between the package and the options (otherwise npm takes the options itself). pnpm, yarn and bun
   don't.
3. **npm uses `becquerel@latest`**, the others plain `becquerel` (npm may otherwise reuse an older cached version).
4. Order: name, then theme, language, router, axios, Pinia, install, force. Any order works; a fixed one keeps the
   output stable and readable.
5. `--force` only when the switch is on (there is no `--no-force`). Without it, a non-empty folder stops the CLI with
   "Use --force to empty it." when it runs non-interactively, or asks what to do in a terminal.

Per package manager (`<name>` and `<options>` filled in):

```bash
npm create becquerel@latest <name> -- <options>
pnpm create becquerel <name> <options>
yarn create becquerel <name> <options>
bun create becquerel <name> <options>
```

Sketch:

```js
function buildCommand ({ pm, name, theme, typescript, router, axios, pinia, install, force }) {
  const options = [
    `--theme ${theme}`,
    typescript ? '--ts' : '--js',
    router ? '--router' : '--no-router',
    axios ? '--axios' : '--no-axios',
    pinia ? '--pinia' : '--no-pinia',
    install ? '--install' : '--no-install',
    ...(force ? ['--force'] : [])
  ].join(' ')
  const project = toProjectName(name) || 'becquerel-app'
  return pm === 'npm'
    ? `npm create becquerel@latest ${project} -- ${options}`
    : `${pm} create becquerel ${project} ${options}`
}
```

## Project name

Clean the name exactly like the CLI does, so the command never contains spaces or characters the shell would
misread, and show the cleaned name under the field ("Project name: my-cafe-app"). Copy of `toProjectName()` from
`create-becquerel/index.js` (keep the two in sync):

```js
function toProjectName (name) {
  return name
    .trim()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '') // "Über Café" -> "Uber Cafe"
    .toLowerCase()
    .replace(/[^a-z\d._~-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-._~]+|[-._~]+$/g, '')
}
```

Keep `.` as it is (it means "the current folder"; `toProjectName('.')` would return an empty string). An empty
result falls back to `becquerel-app`, like the CLI.

## Examples

All defaults (npm):

```bash
npm create becquerel@latest becquerel-app -- --theme dark --js --router --axios --pinia --install
```

Everything off, light theme, TypeScript (pnpm):

```bash
pnpm create becquerel my-app --theme light --ts --no-router --no-axios --no-pinia --install
```

Router + Pinia only, no install, name "My Café App" (yarn):

```bash
yarn create becquerel my-cafe-app --theme dark --js --router --no-axios --pinia --no-install
```

Current folder, emptied first, TypeScript, everything on (bun):

```bash
bun create becquerel . --theme dark --ts --router --axios --pinia --install --force
```

Each option on and off, everything else at its default (npm):

| Option | Resulting command |
|---|---|
| Theme dark | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| Theme light | `npm create becquerel@latest my-app -- --theme light --js --router --axios --pinia --install` |
| JavaScript | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| TypeScript | `npm create becquerel@latest my-app -- --theme dark --ts --router --axios --pinia --install` |
| vue-router on | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| vue-router off | `npm create becquerel@latest my-app -- --theme dark --js --no-router --axios --pinia --install` |
| axios on | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| axios off | `npm create becquerel@latest my-app -- --theme dark --js --router --no-axios --pinia --install` |
| Pinia on | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| Pinia off | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --no-pinia --install` |
| Install on | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |
| Install off | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --no-install` |
| Force on | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install --force` |
| Force off | `npm create becquerel@latest my-app -- --theme dark --js --router --axios --pinia --install` |

## Next steps shown under the command

Also copyable, depending on the package manager and the install switch:

| Package manager | Install on | Install off |
|---|---|---|
| npm | `cd my-app` + `npm run dev` | `cd my-app` + `npm install` + `npm run dev` |
| pnpm | `cd my-app` + `pnpm dev` | `cd my-app` + `pnpm install` + `pnpm dev` |
| yarn | `cd my-app` + `yarn dev` | `cd my-app` + `yarn` + `yarn dev` |
| bun | `cd my-app` + `bun dev` | `cd my-app` + `bun install` + `bun dev` |

No `cd` when the name is `.`. These match `commandsFor()` in `create-becquerel/index.js`.

## Nice to have

- Copy button with a short "Copied" confirmation (e.g. a toast).
- A live preview of the starter page (header with the project name, "What's installed" list) in the chosen theme
  next to the form.
- Remember the last choices (package manager especially) in `localStorage`.
- Later: a "Download ZIP" button that builds the project in the browser (like start.spring.io); needs the template
  files on the site and a zip library, so only if people ask for it.

## Keeping it in sync with the CLI

The page duplicates the CLI's flags, defaults, `toProjectName()` and next-step commands. When the CLI gets a new option
(e.g. the planned git option in [create-becquerel.md](./create-becquerel.md)) or changes a default, update this page
too. Check the flags against `create-becquerel/index.js` (`HELP`, `parseCliArgs()`).
