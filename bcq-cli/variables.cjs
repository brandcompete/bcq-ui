/*
 * Copies the library's CSS variables (src/bcq-ui/styles/variables.css) unchanged
 * to public/code/variables.css, so the docs site always shows / serves the current version.
 *
 * Run: npm run bcq:variables (also part of npm run build)
 */

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const source = path.join(root, 'src/bcq-ui/styles/variables.css')
const target = path.join(root, 'public/code/variables.css')

fs.copyFileSync(source, target)

console.log(`✓ ${path.relative(root, source)} copied to ${path.relative(root, target)}`)
