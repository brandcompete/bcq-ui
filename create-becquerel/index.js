#!/usr/bin/env node
// create-becquerel: scaffolds a new Vue 3 + Vite project with Becquerel UI preconfigured.
// Usage: npm create becquerel@latest [dir] | pnpm create becquerel [dir] | yarn create becquerel [dir] | bun create becquerel [dir]
import { existsSync, readdirSync, mkdirSync, copyFileSync, rmSync, readFileSync, writeFileSync, statSync, renameSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { parseArgs } from 'node:util'
import * as p from '@clack/prompts'

const DEFAULT_NAME = 'becquerel-app'
const DOCS_URL = 'https://bcq-ui.brandcompete.com/'
const TEMPLATE_DIR = fileURLToPath(new URL('./template', import.meta.url))
// files allowed in a target folder that otherwise counts as empty
const IGNORED_EXISTING = ['.git', '.DS_Store', 'Thumbs.db']
// local leftovers in template/ that must never be copied into a new project
const SKIPPED_TEMPLATE_FILES = ['node_modules', 'dist', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'bun.lockb']
const RENAMED_TEMPLATE_FILES = { _gitignore: '.gitignore' }

// Optional features, applied on top of the base template: the files in overlays/<name>/ are copied over the project,
// `dependencies` are added to its package.json and `edits` ([find, replace] pairs) are applied to its files.
// An edit whose `find` text is missing throws, so changes to the template that break a feature don't go unnoticed.
const OVERLAYS_DIR = fileURLToPath(new URL('./overlays', import.meta.url))
// Anchor comments in template/src/pages/hello-world.vue: features insert their lines before them,
// then the CLI removes them (see ANCHOR_LINES).
const INSTALLED_ANCHOR = '<!-- installed options -->'
const EXAMPLES_ANCHOR = '<!-- examples -->'
const ANCHOR_LINES = { 'src/pages/hello-world.vue': [INSTALLED_ANCHOR, EXAMPLES_ANCHOR] }

// edit that adds a line to the "What's installed" list of hello-world.vue
function installedLine (html) {
  return [INSTALLED_ANCHOR, `<li>${html}</li>\n      ${INSTALLED_ANCHOR}`]
}

const FEATURES = [
  {
    name: 'router',
    message: 'Add vue-router?',
    initialValue: true,
    dependencies: { 'vue-router': '^4.6.5' },
    edits: {
      'src/main.js': [
        ["import App from './App.vue'\n", "import App from './App.vue'\nimport router from './router'\n"],
        ['app.use(BcqUi)\n', 'app.use(router)\napp.use(BcqUi)\n']
      ],
      // the page is now rendered by the router (route "/"), not by App.vue itself
      'src/App.vue': [
        ['<template v-slot:main><page-hello-world /></template>', '<template v-slot:main><router-view /></template>'],
        ["import PageHelloWorld from './pages/hello-world.vue'\n\n", ''],
        ['  components: {\n    PageHelloWorld\n  },\n', '']
      ],
      'src/pages/hello-world.vue': [
        installedLine('<span :class="[\'font-semibold\']">vue-router</span>: this page is the <code>/</code> route, add more pages in <code>src/pages/</code> and register them in <code>src/router/index.js</code>')
      ]
    }
  },
  {
    name: 'axios',
    message: 'Add axios + vue-axios?',
    initialValue: true,
    dependencies: { axios: '^1.21.1', 'vue-axios': '^3.6.0' },
    edits: {
      'src/main.js': [
        ["import BcqUi from '@martin.ivanov.brandcompete/bcq-ui'\n", "import axios from 'axios'\nimport VueAxios from 'vue-axios'\nimport BcqUi from '@martin.ivanov.brandcompete/bcq-ui'\n"],
        ['app.use(BcqUi)\n', '// HTTP client, available in components as this.axios and this.$http\napp.use(VueAxios, axios)\napp.use(BcqUi)\n']
      ],
      // vue-axios's "ES module" build ends with a CommonJS/AMD fallback (module.exports = ...) that never runs in Vite,
      // but makes every build print a COMMONJS_VARIABLE_IN_ESM warning: hide that one warning, only for vue-axios
      'vite.config.js': [
        ['  plugins: [vue()]\n', [
          '  plugins: [vue()],',
          '  build: {',
          '    rolldownOptions: {',
          '      onLog (level, log, handler) {',
          '        // vue-axios\'s ES module build contains a CommonJS fallback that never runs in Vite: hide its harmless warning',
          '        if (log.code === \'COMMONJS_VARIABLE_IN_ESM\' && log.id?.includes(\'vue-axios\')) {',
          '          return',
          '        }',
          '        handler(level, log)',
          '      }',
          '    }',
          '  }',
          ''
        ].join('\n')]
      ],
      'src/pages/hello-world.vue': [
        installedLine('<span :class="[\'font-semibold\']">axios</span> + <span :class="[\'font-semibold\']">vue-axios</span>: make HTTP requests with <code>this.axios</code> or <code>this.$http</code> in any component')
      ]
    }
  },
  {
    name: 'pinia',
    message: 'Add Pinia?',
    initialValue: true,
    // @vue/devtools-api is a required peer of Pinia 4; declared explicitly because vue-router 4 brings in v6 of it
    dependencies: { pinia: '^4.1.0', '@vue/devtools-api': '^8.2.1' },
    edits: {
      'src/main.js': [
        ["import BcqUi from '@martin.ivanov.brandcompete/bcq-ui'\n", "import { createPinia } from 'pinia'\nimport BcqUi from '@martin.ivanov.brandcompete/bcq-ui'\n"],
        ['app.use(BcqUi)\n', '// state management, stores live in ./stores\napp.use(createPinia())\napp.use(BcqUi)\n']
      ],
      'src/pages/hello-world.vue': [
        installedLine('<span :class="[\'font-semibold\']">Pinia</span>: stores in <code>src/stores/</code>, see the counter example below'),
        [EXAMPLES_ANCHOR, `<pinia-counter />\n    ${EXAMPLES_ANCHOR}`],
        ['<script>\n', "<script>\nimport PiniaCounter from '../components/pinia-counter.vue'\n\n"],
        ["  name: 'PageHelloWorld'\n", "  name: 'PageHelloWorld',\n  components: {\n    PiniaCounter\n  }\n"]
      ]
    }
  }
]

const HELP = `Usage: create-becquerel [dir] [options]

Scaffold a new Vue 3 + Vite project with Becquerel UI preconfigured.
Use "." as dir to scaffold into the current folder.

Options:
  --theme <theme>  "dark" or "light" theme, without asking (default: dark)
  --ts             TypeScript project, without asking
  --js             JavaScript project, without asking (default)
  --router         add vue-router without asking
  --no-router      don't add vue-router
  --axios          add axios + vue-axios without asking
  --no-axios       don't add axios + vue-axios
  --install        install dependencies without asking
  --no-install     skip installing dependencies
  -f, --force      empty the target folder if it is not empty (keeps .git)
  -h, --help       show this help
  -v, --version    show the version

Docs: ${DOCS_URL}`

function parseCliArgs () {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      ...Object.fromEntries(FEATURES.flatMap(({ name }) => [[name, { type: 'boolean' }], [`no-${name}`, { type: 'boolean' }]])),
      install: { type: 'boolean' },
      'no-install': { type: 'boolean' },
      theme: { type: 'string' },
      ts: { type: 'boolean' },
      js: { type: 'boolean' },
      force: { type: 'boolean', short: 'f' },
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' }
    }
  })
  return {
    dir: positionals[0],
    // feature name -> true (--x), false (--no-x) or undefined (ask)
    features: Object.fromEntries(FEATURES.map(({ name }) => [name, values[`no-${name}`] ? false : values[name]])),
    install: values['no-install'] ? false : values.install,
    theme: values.theme === undefined ? undefined : values.theme.trim().toLowerCase(),
    // true (--ts), false (--js) or undefined (ask)
    typescript: values.js ? false : values.ts,
    force: Boolean(values.force),
    help: Boolean(values.help),
    version: Boolean(values.version)
  }
}

// npm, pnpm, yarn and bun all set npm_config_user_agent to e.g. "pnpm/9.15.0 npm/? node/v22.12.0 darwin arm64"
function detectPackageManager () {
  const name = (process.env.npm_config_user_agent || '').split(' ')[0].split('/')[0]
  return ['npm', 'pnpm', 'yarn', 'bun'].includes(name) ? name : 'npm'
}

function commandsFor (pm) {
  return {
    install: pm === 'yarn' ? 'yarn' : `${pm} install`,
    dev: pm === 'npm' ? 'npm run dev' : `${pm} dev`
  }
}

// "My Cool App!" -> "my-cool-app": the one name used for the folder, package.json, the page header and <title>.
// Always a valid npm package name: lowercase, only a-z, 0-9, ".", "_", "~" and single dashes, none of them at the ends
// (so it is also safe to write into App.vue and index.html as is). Empty if nothing usable is left.
function toProjectName (name) {
  return name
    .trim()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '') // "Über Café" -> "Uber Cafe"
    .toLowerCase()
    .replace(/[^a-z\d._~-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-._~]+|[-._~]+$/g, '')
}

const THEMES = ['dark', 'light']
const INVALID_NAME = 'Please use letters or digits, e.g. my-app'

// removes the lines that hold only an anchor comment (they're for the CLI, not for the new project)
function removeAnchorLines (root) {
  for (const [file, anchors] of Object.entries(ANCHOR_LINES)) {
    const path = join(root, file)
    const lines = readFileSync(path, 'utf8').split('\n')
    writeFileSync(path, lines.filter((line) => !anchors.includes(line.trim())).join('\n'))
  }
}

function applyEdits (root, edits, label) {
  for (const [file, fileEdits] of Object.entries(edits)) {
    const path = join(root, file)
    let content = readFileSync(path, 'utf8')
    for (const [find, replace] of fileEdits) {
      if (!content.includes(find)) {
        throw new Error(`${label}: "${find.trim()}" not found in ${file}`)
      }
      content = content.replace(find, () => replace)
    }
    writeFileSync(path, content)
  }
}

function isEmptyDir (dir) {
  return !existsSync(dir) || readdirSync(dir).every((file) => IGNORED_EXISTING.includes(file))
}

function emptyDir (dir) {
  for (const file of readdirSync(dir)) {
    if (file !== '.git') {
      rmSync(join(dir, file), { recursive: true, force: true })
    }
  }
}

function copyDir (from, to) {
  mkdirSync(to, { recursive: true })
  for (const file of readdirSync(from)) {
    if (SKIPPED_TEMPLATE_FILES.includes(file)) {
      continue
    }
    const source = join(from, file)
    const target = join(to, RENAMED_TEMPLATE_FILES[file] || file)
    if (statSync(source).isDirectory()) {
      copyDir(source, target)
    } else {
      copyFileSync(source, target)
    }
  }
}

function applyFeature (root, feature, pkg) {
  const overlay = join(OVERLAYS_DIR, feature.name)
  if (existsSync(overlay)) {
    copyDir(overlay, root)
  }
  Object.assign(pkg.dependencies, feature.dependencies)
  applyEdits(root, feature.edits || {}, `Feature "${feature.name}"`)
}

// TypeScript is applied last, after the features: it converts whatever the project ended up with.
// Files renamed from .js to .ts when they exist (mentions of their paths in the project's files are updated too).
const TS_RENAMED_FILES = ['src/main.js', 'vite.config.js', 'src/router/index.js', 'src/stores/counter.js']
// TypeScript 7 (the native compiler) has no JS API, which vue-tsc 3 needs, so stay on 6.x until vue-tsc supports 7
const TS_DEV_DEPENDENCIES = { typescript: '^6.0.3', 'vue-tsc': '^3.3.14' }
// file types in which paths of renamed files are updated
const TS_TEXT_FILES = ['.vue', '.ts', '.html', '.md', '.json']

function listFiles (dir) {
  return readdirSync(dir).flatMap((file) => {
    const path = join(dir, file)
    if (file === 'node_modules' || file === '.git') {
      return []
    }
    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}

function convertToTypeScript (root, pkg) {
  // tsconfig.json, src/env.d.ts
  copyDir(join(OVERLAYS_DIR, 'typescript'), root)
  // vue-axios's own types break the other packages' types for `this` (see the comment in this file),
  // so tsconfig.json points 'vue-axios' to corrected types (types only, Vite still uses the real package)
  if (pkg.dependencies['vue-axios']) {
    copyDir(join(OVERLAYS_DIR, 'typescript-axios'), root)
    const tsconfigPath = join(root, 'tsconfig.json')
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'))
    tsconfig.compilerOptions.paths = { 'vue-axios': ['./src/types/vue-axios.d.ts'] }
    writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`)
  }

  const renamed = TS_RENAMED_FILES.filter((file) => existsSync(join(root, file)))
  for (const file of renamed) {
    renameSync(join(root, file), join(root, file.replace(/\.js$/, '.ts')))
  }

  for (const path of listFiles(root)) {
    if (!TS_TEXT_FILES.some((extension) => path.endsWith(extension))) {
      continue
    }
    let content = readFileSync(path, 'utf8')
    const original = content
    for (const file of renamed) {
      content = content.replaceAll(file, file.replace(/\.js$/, '.ts'))
    }
    // <script> -> <script lang="ts"> + defineComponent(), so `this` is typed in the Options API
    if (path.endsWith('.vue') && content.includes('<script>')) {
      const file = relative(root, path)
      for (const find of ['<script>\n', 'export default {\n', '}\n</script>']) {
        if (!content.includes(find)) {
          throw new Error(`TypeScript: "${find.trim()}" not found in ${file}`)
        }
      }
      content = content
        .replace('<script>\n', "<script lang=\"ts\">\nimport { defineComponent } from 'vue'\n")
        .replace('export default {\n', 'export default defineComponent({\n')
        .replace('}\n</script>', '})\n</script>')
        .replace("from 'vue'\nexport default", "from 'vue'\n\nexport default")
    }
    if (content !== original) {
      writeFileSync(path, content)
    }
  }

  applyEdits(root, {
    'src/pages/hello-world.vue': [
      installedLine('<span :class="[\'font-semibold\']">TypeScript</span>: types are checked by <code>vue-tsc</code> when you build, settings in <code>tsconfig.json</code>')
    ]
  }, 'TypeScript')

  pkg.devDependencies = sortKeys({ ...pkg.devDependencies, ...TS_DEV_DEPENDENCIES })
  pkg.scripts.build = `vue-tsc --noEmit && ${pkg.scripts.build}`
}

function sortKeys (object) {
  return Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)))
}

function cancelled (value) {
  if (p.isCancel(value)) {
    p.cancel('Cancelled.')
    process.exit(1)
  }
  return value
}

async function main () {
  const args = parseCliArgs()
  if (args.help) {
    console.log(HELP)
    return
  }
  if (args.version) {
    console.log(JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version)
    return
  }

  const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY)
  const pm = detectPackageManager()
  const commands = commandsFor(pm)

  p.intro('Becquerel UI: new Vue 3 + Vite project')

  // 1. project name = target folder
  let dir = args.dir
  if (!dir) {
    dir = interactive
      ? cancelled(await p.text({
        message: 'Project name:',
        placeholder: 'e.g. my-app',
        validate: (value) => toProjectName(basename(value || '')) ? undefined : INVALID_NAME
      }))
      : DEFAULT_NAME
  }
  dir = dir.trim().replace(/[/\\]+$/, '') || '.'
  const inCurrentDir = resolve(dir) === process.cwd()
  let projectName
  let root
  if (inCurrentDir) {
    // the existing folder keeps its own name, only the project name is cleaned up
    root = process.cwd()
    projectName = toProjectName(basename(root)) || DEFAULT_NAME
  } else {
    // the new folder's own name is cleaned up, its parent folders are left alone
    const typedName = basename(dir)
    projectName = toProjectName(typedName)
    if (!projectName) {
      p.cancel(`"${typedName}" can't be used as a project name. ${INVALID_NAME}.`)
      process.exit(1)
    }
    dir = dir.slice(0, dir.length - typedName.length) + projectName
    root = resolve(dir)
    if (projectName !== typedName) {
      p.log.info(`Project name: ${projectName}`)
    }
  }

  // 2. a target folder that is not empty
  if (!isEmptyDir(root)) {
    const where = inCurrentDir ? 'The current folder' : `Folder "${dir}"`
    let action = args.force ? 'empty' : 'cancel'
    if (!args.force && interactive) {
      action = cancelled(await p.select({
        message: `${where} is not empty. What should happen?`,
        initialValue: 'cancel',
        options: [
          { value: 'cancel', label: 'Cancel' },
          { value: 'empty', label: 'Remove existing files and continue', hint: 'keeps .git' },
          { value: 'merge', label: 'Keep existing files and continue', hint: 'files from the template overwrite files with the same name' }
        ]
      }))
    }
    if (action === 'cancel') {
      p.cancel(`${where} is not empty.${interactive ? '' : ' Use --force to empty it.'}`)
      process.exit(1)
    }
    if (action === 'empty') {
      emptyDir(root)
    }
  }

  // 3. theme (<bc-app :dark="dark"> in App.vue)
  let theme = args.theme
  if (theme !== undefined && !THEMES.includes(theme)) {
    p.cancel(`Unknown theme "${args.theme}". Use ${THEMES.map((name) => `--theme ${name}`).join(' or ')}.`)
    process.exit(1)
  }
  if (theme === undefined) {
    theme = interactive
      ? cancelled(await p.select({
        message: 'Theme:',
        initialValue: 'dark',
        options: [
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' }
        ]
      }))
      : 'dark'
  }

  // 4. JavaScript or TypeScript
  let typescript = args.typescript
  if (typescript === undefined) {
    typescript = interactive
      ? cancelled(await p.select({
        message: 'Language:',
        initialValue: false,
        options: [
          { value: false, label: 'JavaScript' },
          { value: true, label: 'TypeScript' }
        ]
      }))
      : false
  }

  // 5. optional features (non-interactive: only the ones passed as flags)
  const features = []
  for (const feature of FEATURES) {
    let enabled = args.features[feature.name]
    if (enabled === undefined) {
      enabled = interactive
        ? cancelled(await p.confirm({ message: feature.message, initialValue: feature.initialValue }))
        : false
    }
    if (enabled) {
      features.push(feature)
    }
  }

  // 6. install now?
  let install = args.install
  if (install === undefined) {
    install = interactive
      ? cancelled(await p.confirm({ message: `Install dependencies with ${pm}?`, initialValue: true }))
      : false
  }

  // 7. copy the template, apply the features (and TypeScript)
  copyDir(TEMPLATE_DIR, root)
  const pkgPath = join(root, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.name = projectName
  applyEdits(root, {
    'src/App.vue': [
      ['<template v-slot:header><!-- header --></template>', `<template v-slot:header>${projectName}</template>`],
      ['      dark: true\n', `      dark: ${theme === 'dark'}\n`]
    ],
    'index.html': [
      ['<title>Becquerel App</title>', `<title>${projectName}</title>`]
    ]
  }, 'Project name and theme')
  for (const feature of features) {
    applyFeature(root, feature, pkg)
  }
  if (typescript) {
    convertToTypeScript(root, pkg)
  }
  removeAnchorLines(root)
  pkg.dependencies = sortKeys(pkg.dependencies)
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  const extras = [typescript ? 'TypeScript' : null, ...features.map(({ name }) => name)].filter(Boolean)
  p.log.success(`Project created in ${root}${extras.length ? ` (with ${extras.join(', ')})` : ''}`)

  // 8. install
  let installed = false
  if (install) {
    p.log.step(`Running ${commands.install}...`)
    const [command, ...commandArgs] = commands.install.split(' ')
    const result = spawnSync(command, commandArgs, {
      cwd: root,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
    installed = result.status === 0
    if (!installed) {
      p.log.error(`${commands.install} failed. Run it yourself in the project folder.`)
    }
  }

  // 9. next steps
  const steps = []
  if (!inCurrentDir) {
    const cdPath = relative(process.cwd(), root)
    steps.push(`cd ${cdPath.includes(' ') ? `"${cdPath}"` : cdPath}`)
  }
  if (!installed) {
    steps.push(commands.install)
  }
  steps.push(commands.dev)
  p.note(steps.join('\n'), 'Next steps')
  p.outro(`Docs: ${DOCS_URL}`)
}

main().catch((error) => {
  p.log.error(error.message)
  process.exit(1)
})
