import { fileURLToPath, URL } from 'node:url'
import Sitemap from 'vite-plugin-sitemap'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { hostname } from './package.json'
import sitemap from './sitemap.json'

// https://vite.dev/config/
// https://www.npmjs.com/package/vite-plugin-sitemap

export default defineConfig({
  plugins: [
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
  // removing this will create .css and .js files with random names, keeping it, creates /assets/index.css and /assets/index.js
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
