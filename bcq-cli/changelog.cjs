/*
 * Copies the changelog maintained for the docs site (public/data/components-md/CHANGELOG.md)
 * over the root CHANGELOG.md (adding a "# Changelog" heading at the top), so the repository / npm package always shows the same changelog.
 *
 * Run: npm run bcq:changelog (also part of npm run build)
 */

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const source = path.join(root, 'public/data/components-md/CHANGELOG.md')
const target = path.join(root, 'CHANGELOG.md')

// the docs-site changelog has no top-level heading, so add one (unless it already starts with it)
const content = fs.readFileSync(source, 'utf8')
const heading = '# Changelog'

fs.writeFileSync(target, content.startsWith(heading) ? content : `${heading}\n\n${content}`)

console.log(`✓ ${path.relative(root, source)} copied to ${path.relative(root, target)}`)
