import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue()
  ],
  publicDir: false,
  build: {
    outDir: 'lib',
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
