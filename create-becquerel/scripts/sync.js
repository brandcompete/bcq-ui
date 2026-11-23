// Syncs the template with the Becquerel UI library in this repository:
// - sets the @martin.ivanov.brandcompete/bcq-ui version in template/package.json to ^<library version>
// - copies lib/variables.css to template/src/styles/variables.css
// Runs automatically before `npm publish` (prepublishOnly); run it manually with `npm run sync`.
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '../..')
const templateDir = resolve(here, '../template')

const library = JSON.parse(readFileSync(resolve(repoRoot, 'package.json'), 'utf8'))

const templatePkgPath = resolve(templateDir, 'package.json')
const templatePkg = JSON.parse(readFileSync(templatePkgPath, 'utf8'))
templatePkg.dependencies[library.name] = `^${library.version}`
writeFileSync(templatePkgPath, `${JSON.stringify(templatePkg, null, 2)}\n`)
console.log(`template/package.json: ${library.name} -> ^${library.version}`)

copyFileSync(resolve(repoRoot, 'lib/variables.css'), resolve(templateDir, 'src/styles/variables.css'))
console.log('template/src/styles/variables.css: copied from lib/variables.css')
