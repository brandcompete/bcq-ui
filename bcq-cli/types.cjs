/*
 * Generates src/bcq-ui-components.d.ts: TypeScript declarations for every component
 * installed by the library (Vue's `GlobalComponents` interface), so editors with Vue
 * tooling get prop autocomplete and type checking for <bc-*> components in templates.
 *
 * Source of truth:
 *   - src/bcq-ui/components/index.js  -> which components are installed
 *   - each component's .vue file       -> its `name`, `props` and `emits`
 *
 * Runtime prop types are mapped to TS types (String -> string, [String, Number] -> string | number, ...).
 * `required: true` props are mandatory, all others optional. Emits become `on*` handler props.
 *
 * Run: npm run bcq:types (also runs at the start of npm run build:bundle)
 */

const fs = require('fs')
const path = require('path')
const { parse, babelParse } = require('vue/compiler-sfc')

const root = path.resolve(__dirname, '..')
const componentsDir = path.join(root, 'src/bcq-ui/components')
const outFile = path.join(root, 'src/bcq-ui-components.d.ts')

const TYPE_MAP = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Array: 'any[]',
  Object: 'Record<string, any>',
  Function: '(...args: any[]) => any',
  Date: 'Date',
  Symbol: 'symbol'
}

const warnings = []

const parseJs = code => babelParse(code, { sourceType: 'module', plugins: ['jsx'] }).program

const keyName = prop => (prop.key.type === 'Identifier' ? prop.key.name : prop.key.value)

const camelize = str => str.replace(/-(\w)/g, (_, c) => c.toUpperCase())

const handlerName = event => 'on' + camelize(event).replace(/^./, c => c.toUpperCase())

// runtime type node (Identifier or ArrayExpression of Identifiers) -> TS type string
function tsType (node, where) {
  if (!node) return 'any'
  if (node.type === 'Identifier') {
    if (TYPE_MAP[node.name]) return TYPE_MAP[node.name]
    warnings.push(`${where}: unknown prop type "${node.name}", using any`)
    return 'any'
  }
  if (node.type === 'ArrayExpression') {
    const types = [...new Set(node.elements.map(el => tsType(el, where)))]
    return types.length ? types.join(' | ') : 'any'
  }
  if (node.type === 'NullLiteral') return 'any'
  warnings.push(`${where}: unsupported prop type expression, using any`)
  return 'any'
}

// literal default values are shown as @default in editor tooltips
function defaultDoc (node, code) {
  if (!node) return null
  if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral', 'NullLiteral'].includes(node.type)) {
    return code.slice(node.start, node.end)
  }
  return null
}

function readProps (propsNode, code, where) {
  const props = []

  // props: ['a', 'b'] -> untyped
  if (propsNode.type === 'ArrayExpression') {
    propsNode.elements.forEach(el => props.push({ name: el.value, type: 'any', required: false }))
    return props
  }

  propsNode.properties.forEach(prop => {
    const name = keyName(prop)
    const value = prop.value
    const at = `${where} prop "${name}"`

    // shorthand: foo: String / foo: [String, Number]
    if (value.type !== 'ObjectExpression') {
      props.push({ name, type: tsType(value, at), required: false })
      return
    }

    const option = key => value.properties.find(p => p.key && keyName(p) === key)
    const type = option('type')
    const required = option('required')
    const def = option('default')

    props.push({
      name,
      type: tsType(type && type.value, at),
      required: !!(required && required.value.type === 'BooleanLiteral' && required.value.value),
      default: defaultDoc(def && def.value, code)
    })
  })

  return props
}

function readEmits (emitsNode) {
  if (!emitsNode) return []
  if (emitsNode.type === 'ArrayExpression') return emitsNode.elements.map(el => el.value)
  if (emitsNode.type === 'ObjectExpression') return emitsNode.properties.map(keyName)
  return []
}

function readComponent (vueFile) {
  const where = path.relative(root, vueFile)
  const { descriptor } = parse(fs.readFileSync(vueFile, 'utf8'), { filename: vueFile })
  const code = descriptor.script && descriptor.script.content

  if (!code) throw new Error(`${where}: no <script> block`)

  const exported = parseJs(code).body.find(n => n.type === 'ExportDefaultDeclaration')

  if (!exported || exported.declaration.type !== 'ObjectExpression') {
    throw new Error(`${where}: expected "export default { ... }"`)
  }

  const option = key => exported.declaration.properties.find(p => p.key && keyName(p) === key)
  const name = option('name')
  const props = option('props')
  const emits = option('emits')

  if (!name) throw new Error(`${where}: component has no "name" option`)

  return {
    name: name.value.value,
    props: props ? readProps(props.value, code, where) : [],
    emits: readEmits(emits && emits.value)
  }
}

// installed components = exports of components/index.js (except the BcqUi installer)
function installedComponents () {
  const indexFile = path.join(componentsDir, 'index.js')
  const program = parseJs(fs.readFileSync(indexFile, 'utf8'))

  return program.body
    .filter(n => n.type === 'ExportNamedDeclaration' && n.source)
    .map(n => ({ exportName: n.specifiers[0].exported.name, dir: path.join(componentsDir, n.source.value) }))
    .filter(c => c.exportName !== 'BcqUi')
    .map(c => {
      // component folder's index.js imports the .vue file
      const index = parseJs(fs.readFileSync(path.join(c.dir, 'index.js'), 'utf8'))
      const vueImport = index.body.find(n => n.type === 'ImportDeclaration' && n.source.value.endsWith('.vue'))

      if (!vueImport) throw new Error(`${path.relative(root, c.dir)}/index.js: no .vue import found`)

      return { ...c, vueFile: path.join(c.dir, vueImport.source.value) }
    })
}

function render (components) {
  const quote = s => (/^[A-Za-z_$][\w$]*$/.test(s) ? s : `'${s}'`)

  const blocks = components.map(c => {
    const lines = []

    c.props.forEach(p => {
      if (p.default) lines.push(`      /** @default ${p.default} */`)
      lines.push(`      ${quote(p.name)}${p.required ? '' : '?'}: ${p.type}`)
    })
    c.emits.forEach(e => {
      lines.push(`      ${quote(handlerName(e))}?: (...args: any[]) => any`)
    })

    return lines.length
      ? `    ${c.name}: DefineComponent<{\n${lines.join('\n')}\n    }>`
      : `    ${c.name}: DefineComponent<{}>`
  })

  return [
    '// AUTO-GENERATED by bcq-cli/types.cjs from src/bcq-ui/components - do not edit by hand.',
    '// Regenerate with: npm run bcq:types (also part of npm run build:bundle)',
    '',
    "import type { DefineComponent } from 'vue'",
    '',
    "declare module 'vue' {",
    '  export interface GlobalComponents {',
    blocks.join('\n'),
    '  }',
    '}',
    '',
    'export {}',
    ''
  ].join('\n')
}

const components = installedComponents().map(c => {
  const component = readComponent(c.vueFile)

  if (component.name !== c.exportName) {
    warnings.push(`${path.relative(root, c.vueFile)}: name "${component.name}" differs from export "${c.exportName}" (using the name, which is what gets registered)`)
  }

  return component
})

components.sort((a, b) => a.name.localeCompare(b.name))
fs.writeFileSync(outFile, render(components))

warnings.forEach(w => console.warn(`  warning: ${w}`))
console.log(`✓ ${path.relative(root, outFile)}: ${components.length} components, ${components.reduce((n, c) => n + c.props.length, 0)} props`)
