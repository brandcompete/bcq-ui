const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const packageJson = require('../package.json')

const BASE_DIR = path.join(__dirname, '../public/data/pages-md')
const HOSTNAME = packageJson.hostname
const DESCRIPTION = packageJson.description
const SPECIAL_WORDS = ['javascript', 'html', 'css', 'ui', 'svg', 'xml', 'js']
const SKIP_FILES = ['_page.md', 'index.md']
const FILE_NAME = path.join(__dirname, '../dist/llms.txt')

let md = `# ${packageJson.appName}\n\n> ${DESCRIPTION}\n\n[${packageJson.appName}](${HOSTNAME}): ${DESCRIPTION}\n\n`

function kebabToTitleCase (str) {
  if (!str) {
    return ''
  }
  return str
    .split('-')
    .map(word => {
      const lower = word.toLowerCase()
      if (SPECIAL_WORDS.includes(lower)) {
        return lower.toUpperCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

function stripHtml (input) {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\n/gm, '')
}

function renderLlmsTxt (dir) {
  return fs.promises.readdir(dir, {withFileTypes: true}).then(entries => {
    return Promise.all(entries.map(entry => {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return renderLlmsTxt(fullPath)
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        if ((dir === BASE_DIR && entry.name === SKIP_FILES[0]) || (dir === BASE_DIR && entry.name === SKIP_FILES[1])) {
          return Promise.resolve()
        }
        return fs.promises.readFile(fullPath, 'utf8').then(raw => {
          const content = stripHtml(raw)
          let url = HOSTNAME + path.relative(BASE_DIR, fullPath)
              .replace(/\\/g, '/')
              .replace('.md', '')
          md += `[${kebabToTitleCase(url.split('/').pop())}](${url}): ${content}\n\n`
        })
      }
      return Promise.resolve()
    }))
  })
}

renderLlmsTxt(BASE_DIR).then(() => {
  fs.writeFile(FILE_NAME, md, (err) => {
    if (err) {
      console.error(err)
    }
    console.log(chalk.green('✓ /dist/llms.txt added'))
  })
}).catch(err => {
  console.error(err)
})
