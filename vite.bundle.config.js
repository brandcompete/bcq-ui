import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// Builds the npm-consumable bundle of the library into lib/ (shared with the IIFE build from vite.lib.config.js).
// Run twice by `npm run build:bundle`:
//   default mode -> bcq-ui.js     + bcq-ui.css      (readable, not minified)
//   --mode min   -> bcq-ui.min.js + bcq-ui.min.css  (minified; keeps the files from the first pass)
// Every package in `dependencies` / `peerDependencies` stays external (imported, not bundled),
// so the consumer's package manager installs them (e.g. `vue`, `mitt`).
// The unbundled entry (src/lib.js) is left untouched for the docs site / development.

const externals = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

// The bundle's entry: the CSS variables (theme colors, fonts, ...) + src/lib.js.
// src/lib.js doesn't import variables.css (the docs site imports it separately in src/main.js),
// but the npm bundle must be self-sufficient, so it is added here.
const ENTRY = 'bcq-ui-bundle-entry'
const RESOLVED_ENTRY = '\0' + ENTRY

function bundleEntry () {
  const variables = fileURLToPath(new URL('./src/bcq-ui/styles/variables.css', import.meta.url))
  const lib = fileURLToPath(new URL('./src/lib.js', import.meta.url))

  return {
    name: 'bcq-ui-bundle-entry',
    // vite turns the lib entry into an absolute path, hence endsWith
    resolveId: id => (id.endsWith(ENTRY) ? RESOLVED_ENTRY : null),
    load: id => (id === RESOLVED_ENTRY
      ? `import ${JSON.stringify(variables)}\nexport { default } from ${JSON.stringify(lib)}\n`
      : null)
  }
}

export default defineConfig(({ mode }) => {
  const min = mode === 'min'
  const name = min ? 'bcq-ui.min' : 'bcq-ui'

  return {
    plugins: [
      bundleEntry(),
      vue()
    ],
    publicDir: false,
    build: {
      outDir: fileURLToPath(new URL('./lib', import.meta.url)),
      // lib/ also holds becquerel.min.js from build:lib, so never empty it; our files are simply overwritten
      emptyOutDir: false,
      lib: {
        entry: ENTRY,
        formats: ['es'],
        fileName: () => `${name}.js`,
        cssFileName: name
      },
      cssCodeSplit: false,
      // terser, because vite's esbuild minifier keeps whitespace in ES library builds
      minify: min ? 'terser' : false,
      cssMinify: min,
      rollupOptions: {
        external: id => externals.some(dep => id === dep || id.startsWith(`${dep}/`)),
        output: {
          inlineDynamicImports: true,
          assetFileNames: `${name}.[ext]`
        }
      }
    }
  }
})
