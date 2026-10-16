const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const packageJson = require('../package.json')
const HOSTNAME = packageJson.hostname
const APP_NAME = packageJson.appName
const THEME_COLOR = packageJson.themeColor
const VENDOR = packageJson.vendor
const VENDOR_URL = packageJson.vendorUrl
const DESCRIPTION = packageJson.description
const INDEX_FILE_TEMPLATE = path.join(__dirname, '../bcq-cli/ssr/index.html')
const START_YEAR = 2026
const SPECIAL_WORDS = ['javascript', 'html', 'css', 'ui', 'svg', 'xml', 'js']
const JSON_FILES_DIR = path.join(__dirname, '../public/data/pages')
const MD_FILES_DIR = path.join(__dirname, '../public/data/pages-md')
const SNAPSHOTS_DIR = path.join(__dirname, '../snapshots')
const DIST_DIR = path.join(__dirname, '../dist')

class SSR {
  constructor (indexFileTemplate, appName, minify = true) {
    this.minify = minify
    this.sitemap = require('../sitemap.json')
    this.snapshotsDir = SNAPSHOTS_DIR
    this.indexFileTemplate = indexFileTemplate
    this.appName = appName
    this.links = []
  }

  minifyHTML (html) {
    const protectedTags = []
    const placeholders = []
    let index = 0
    // 1. Protect sensitive blocks
    html = html.replace(
      new RegExp(
        `<(${protectedTags.join("|")})([\\s\\S]*?)</\\1>`,
        "gi"
      ),
      (match) => {
        const token = `___HTML_MIN_${index++}___`
        placeholders.push(match)
        return token
      }
    )
    // 2. Remove comments
    // html = html.replace(/<!--[\s\S]*?-->/g, "")
    // 3. Collapse whitespace between tags
    html = html.replace(/>\s+</g, "><")
    // 4. Collapse multiple spaces (but keep single spaces)
    html = html.replace(/\s{2,}/g, " ")
    // 5. Trim
    html = html.trim()
    // 6. Restore protected blocks
    html = html.replace(/___HTML_MIN_(\d+)___/g, (_, i) => placeholders[i])
    return html
  }

  kebabToTitleCase (str) {
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

  stripHtml (input) {
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

  makeLinks () {
    return new Promise((resolve, reject) => {
      this.sitemap.forEach(item => {
        const label = this.kebabToTitleCase(item.split('/').pop())
        this.links.push(`<li><a href="${item}/" title="${label}">${label}</a></li>`)
      })
      resolve(this.links)
    })
  }

  makeDocumentTitle (pageTitle) {
    if (pageTitle === this.appName) {
      return this.appName
    }
    return `${pageTitle} | ${this.appName}`
  }

  makeFileUrl (item, type, category) {
    const dir = type === 'json' ? JSON_FILES_DIR : MD_FILES_DIR
    return category ? `${dir}/${item.split('/').pop()}.${type}` : `${dir}${item}.${type}`
  }

  makePageDescriptionMeta (md) {
    const cap = 158
    md = this.stripHtml(md)
    return `${this.stripHtml(md).substring(0, cap > md.length ? 999 : cap)}...`
  }

  removeTrailingSlash (string) {
    return string.replace(/\/+$/, '')
  }

  createSnapshot (item, dir) {
    const dataFile = this.makeFileUrl(item, 'json', item.split('/').length === 2)
    const mdFile = this.makeFileUrl(item, 'md', item.split('/').length === 2)
    let indexFileTemplateCopy = this.indexFileTemplate

    fs.readFile(mdFile, 'utf8', (err, md) => {
      if (err) {
        return
      }
      fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) {
          return
        }
        data = JSON.parse(data).meta

        indexFileTemplateCopy = indexFileTemplateCopy
          .replace(/{{links}}/g, this.links.join('\n'))
          .replace(/{{pageTitle}}/g, data.pageTitle)
          .replace(/{{keywords}}/g, data.keywords.join(', '))
          .replace(/{{documentTitle}}/g, this.makeDocumentTitle(data.pageTitle))
          .replace(/{{pageDescription}}/g, md)
          .replace(/{{pageDescriptionMeta}}/g, this.makePageDescriptionMeta(md))
          .replace(/{{canonical}}/g, `${this.removeTrailingSlash(HOSTNAME)}${item.replace(/\/index/g, '')}`)
          .replace(/{{thumbnail}}/g, item.split('/').pop())
          .replace(/{{datestring}}/g, new Date())

        if (this.minify) {
          indexFileTemplateCopy = this.minifyHTML(indexFileTemplateCopy)
        }

        fs.writeFile(`${dir}/index.html`, indexFileTemplateCopy, (err) => {
          if (err) {
            throw err
          }
        })
      })
    })
  }

  async init () {
    for (const item of this.sitemap) {
      const dir = `${this.snapshotsDir}${item}`
      try {
        await fs.mkdir(dir, {recursive: true}, () => {
          this.createSnapshot(item, dir)
        })
      } catch (err) {
        console.error(err, dir)
      }
    }
  }
}

function uuid () {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  )
}

function startSsrRendering () {
  console.log(chalk.red('Starting SSR rendering...'))
  fs.readFile(INDEX_FILE_TEMPLATE, 'utf8', (err, indexFileTemplate) => {
    if (err) {
      throw err
    }
    const date = new Date()
    const currentYear = date.getFullYear()
    indexFileTemplate = indexFileTemplate
      .replace(/{{date}}/g, date.toISOString().slice(0, 10))
      .replace(/{{hostname}}/g, HOSTNAME)
      .replace(/{{vendor}}/g, VENDOR)
      .replace(/{{themeColor}}/g, THEME_COLOR)
      .replace(/{{appName}}/g, APP_NAME)
      .replace(/{{appDescripion}}/g, DESCRIPTION)
      .replace(/{{years}}/g, START_YEAR !== currentYear ? `${START_YEAR} - ${currentYear}` : currentYear)
      .replace(/{{copyright}}/g, `<a href="${VENDOR_URL}" target="_blank" rel="noopener" title="${VENDOR}">${VENDOR}</a>`)
      .replace(/{{rnd}}/g, uuid())

    const ssr = new SSR(indexFileTemplate, APP_NAME, true)
    ssr.makeLinks().then(() => {
      ssr.init().then(() => {
        ssr.createSnapshot('/index', SNAPSHOTS_DIR) // create the index page
        setTimeout(() => {
          fs.cp(SNAPSHOTS_DIR, DIST_DIR, {recursive: true}, (err) => {
            if (err) {
              console.error(err, SNAPSHOTS_DIR, DIST_DIR)
            }
            console.log(chalk.green('✓ SSR rendering complete'))
          })
        }, 1000)
      })
    })
  })
}

if (!fs.existsSync(SNAPSHOTS_DIR)) {
  console.log(chalk.yellow(`${SNAPSHOTS_DIR} does not exist, creating...`))
  fs.mkdir(SNAPSHOTS_DIR, { recursive: true }, (err) => {
    if (err) {
      throw err
    }
    startSsrRendering()
  })
} else {
  startSsrRendering()
}


