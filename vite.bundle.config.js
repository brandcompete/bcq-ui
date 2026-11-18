import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// Builds the npm-consumable bundle of the library into lib/.
// Run twice by `npm run build:bundle`:
//   default mode -> bcq-ui.js     + bcq-ui.css      (readable, not minified; empties lib/ first)
//   --mode min   -> bcq-ui.min.js + bcq-ui.min.css  (minified; keeps the files from the first pass)
//   both         -> variables.css                   (copied as-is, see below)
//   each pass    -> bcq-ui.d.ts / bcq-ui.min.d.ts   (copied from src/lib.d.ts)
// Every package in `dependencies` / `peerDependencies` stays external (imported, not bundled),
// so the consumer's package manager installs them (e.g. `vue`, `mitt`).
// The unbundled entry (src/lib.js) is left untouched for the docs site / development.

const externals = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

// variables.css (theme colors, fonts, ...) is NOT part of the bundle CSS: users copy/import it
// themselves so they can customize it, and it must load BEFORE bcq-ui(.min).css.
// It is shipped unchanged (not minified) as lib/variables.css.
function copyVariablesCss () {
  const source = fileURLToPath(new URL('./src/bcq-ui/styles/variables.css', import.meta.url))

  return {
    name: 'bcq-copy-variables-css',
    generateBundle () {
      this.emitFile({ type: 'asset', fileName: 'variables.css', source: readFileSync(source, 'utf8') })
    }
  }
}

// Type declarations: src/lib.d.ts is copied next to each bundle file (bcq-ui.d.ts, bcq-ui.min.d.ts),
// so TypeScript users get types for both the package entry and the direct lib/* imports.
function copyTypes (name) {
  const source = fileURLToPath(new URL('./src/lib.d.ts', import.meta.url))

  return {
    name: 'bcq-copy-types',
    generateBundle () {
      this.emitFile({ type: 'asset', fileName: `${name}.d.ts`, source: readFileSync(source, 'utf8') })
    }
  }
}

export default defineConfig(({ mode }) => {
  const min = mode === 'min'
  const name = min ? 'bcq-ui.min' : 'bcq-ui'

  return {
    plugins: [
      vue(),
      copyVariablesCss(),
      copyTypes(name)
    ],
    publicDir: false,
    build: {
      outDir: fileURLToPath(new URL('./lib', import.meta.url)),
      // the first (readable) pass empties lib/, the min pass keeps its files
      emptyOutDir: !min,
      lib: {
        entry: fileURLToPath(new URL('./src/lib.js', import.meta.url)),
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
