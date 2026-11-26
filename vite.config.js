import { fileURLToPath, URL } from 'node:url'
import Sitemap from 'vite-plugin-sitemap'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { hostname } from './package.json'
import sitemap from './sitemap.json'

// https://vite.dev/config/
// https://www.npmjs.com/package/vite-plugin-sitemap

// `--mode bundle` (npm run dev:bundle) runs the docs site against the built npm bundle
// in lib/ instead of the library sources, to verify the bundle works.
// Only the library imports in src/main.js are swapped; nothing else from the sources is loaded.
const BUNDLE_ENTRY = '\0bcq-ui-bundle-entry'
const EMPTY_MODULE = '\0bcq-ui-bundle-empty'
const VARIABLES_CSS = fileURLToPath(new URL('./lib/variables.css', import.meta.url))

function useLibraryBundle () {
  const mainJs = fileURLToPath(new URL('./src/main.js', import.meta.url))
  const variant = process.env.BCQ_BUNDLE === 'full' ? 'bcq-ui' : 'bcq-ui.min'

  return {
    name: 'bcq-use-library-bundle',
    enforce: 'pre',
    resolveId (source, importer) {
      if (importer !== mainJs) return null
      if (source === './lib.js') return BUNDLE_ENTRY
      // variables.css is shipped separately in lib/ (users import it themselves), so use that copy
      if (source === './bcq-ui/styles/variables.css') return VARIABLES_CSS
      // the bundle must be self-sufficient, so don't let the site load any other library CSS from the sources
      if (source.startsWith('./bcq-ui/')) return EMPTY_MODULE
      return null
    },
    load (id) {
      if (id === BUNDLE_ENTRY) {
        return `import '/lib/${variant}.css'\nexport { default } from '/lib/${variant}.js'\n`
      }
      if (id === EMPTY_MODULE) return ''
      return null
    },
    configResolved () {
      console.log(`\n  [bcq] docs site is using the library bundle: lib/${variant}.{js,css}\n`)
    }
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    mode === 'bundle' && useLibraryBundle(),
    vue(),
    vueDevTools(),
    Sitemap({
      hostname,
      dynamicRoutes: sitemap,
      readable: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // the entry keeps fixed names (/assets/index.js + /assets/index.css): bcq-cli/ssr/index.html links them directly.
  // Lazy-loaded chunks (the demo pages, see src/helpers/router.js) and their CSS get a content hash, so browsers
  // never combine a new index.js with an old cached chunk after a deploy.
  build: {
    chunkSizeWarningLimit: 666, // kB, default 500
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: assetInfo => assetInfo.names?.includes('index.css') ? 'assets/[name].[ext]' : 'assets/[name]-[hash].[ext]',
      },
    },
  },
}))
