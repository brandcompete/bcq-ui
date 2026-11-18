import { readFileSync } from "node:fs"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// Copies src/bcq-ui/styles/variables.css to lib/variables.css as-is (not minified).
// becquerel.min.css doesn't contain the CSS variables, so they are shipped as a separate file.
function copyVariablesCss () {
  const source = fileURLToPath(new URL("./src/bcq-ui/styles/variables.css", import.meta.url))

  return {
    name: "bcq-copy-variables-css",
    generateBundle () {
      this.emitFile({
        type: "asset",
        fileName: "variables.css",
        source: readFileSync(source, "utf8")
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    copyVariablesCss()
  ],
  publicDir: false,
  build: {
    outDir: 'lib',
    // lib/ also holds the npm bundle (bcq-ui*.js/css) from build:bundle, so never empty it
    emptyOutDir: false,
    lib: {
      entry: "./src/lib.js",
      name: "becquerel",
      formats: ["iife"],
      fileName: () => "becquerel.min.js"
    },
    cssCodeSplit: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        assetFileNames: "becquerel.min.[ext]"
      }
    }
  }
})
