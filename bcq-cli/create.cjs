const fs = require('node:fs/promises')
const { existsSync } = require('node:fs')
const { select, input } = require('@inquirer/prompts')
const chalk = require('chalk')
const { createThumbnail } = require('./thumbnail.cjs')

const dryRun = false
const title = 'BCQ3 CLI'
const categories = ['content', 'ui', 'forms']
// docs-site dev server (npm run dev); vite's default port, change it here if vite.config.js gets a server.port
const devServerUrl = 'http://localhost:5173'
const mainColor = chalk.bold.hex('#42d392')
const accentColor = chalk.hex('#5f8bef')

async function steps() {
  try {
    let componentName
    let tagName
    let category
    let pageMdFileContent
    let kebabCaseName
    let pageJsonFileContent
    let codeMdFileContent
    let indexJsFileContent
    let componentNameVueFileContent
    let manualTasksFileContent
    let pageVueFileContent

    console.log(mainColor(`\n*** Welcome to ${title}! ***`))
    console.log(accentColor('This will create a boilerplate for your new component, add necessary files, initial meta data and create a demo page'))

    if (dryRun) {
      console.log(chalk.dim('*** this is a dry run, no files or folders will be created ***'))
    }

    console.log('')

    category = await select({
      message: 'STEP 1: Use the arrows to select component category',
      choices: categories.map(value => ({ name: value, value }))
    })

    componentName = await input({
      message: 'STEP 2: Component name (SentenceCase, letters only, e.g. DatePicker)',
      transformer: value => value.replace(/\s/g, ''),
      validate: value => {
        value = value.replace(/\s/g, '')
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          return 'Use SentenceCase letters only, e.g. DatePicker'
        }
        const kebab = value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        if (existsSync(`./src/bcq-ui/components/${kebab}`)) {
          return `A component named "${value}" already exists in src/bcq-ui/components/${kebab}`
        }
        // don't overwrite an existing docs page (e.g. content pages like "Colors" have no component folder)
        const existing = [
          `src/pages/${category}/${kebab}.vue`,
          `public/data/pages-md/${category}/${kebab}.md`,
          `public/data/pages/${category}/${kebab}.json`,
          `public/code/${kebab}.md`
        ].find(file => existsSync(`./${file}`))
        if (existing) {
          return `"${value}" would overwrite the existing ${existing}`
        }
        return true
      }
    })
    componentName = componentName.replace(/\s/g, '')

    kebabCaseName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    tagName = `bc-${kebabCaseName}`

    console.log(chalk.yellow('\ncreating files and folders...'))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME folder
    const folder = `./src/bcq-ui/components/${kebabCaseName}`
    if (!dryRun) {
      await fs.mkdir(folder)
    }
    console.log(chalk.dim('[created directory]:'), accentColor(folder))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME/index.js
    const componentTemplate = './bcq-cli/templates/component-template/'
    indexJsFileContent = await fs.readFile(`${componentTemplate}index.md`, { encoding: 'utf8' })
    indexJsFileContent = indexJsFileContent.replace(/ComponentTemplate/g, componentName).replace(/kebabCaseName/, kebabCaseName)
    const indexJsFileName = `./src/bcq-ui/components/${kebabCaseName}/index.js`
    if (!dryRun) {
      await fs.writeFile(indexJsFileName, indexJsFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(indexJsFileName))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME/COMPONENT-NAME.vue
    componentNameVueFileContent =  await fs.readFile(`${componentTemplate}component-template.md`, { encoding: 'utf8' })
    componentNameVueFileContent = componentNameVueFileContent
      .replace(/BcComponentTemplate/g, `Bc${componentName}`)
      .replace(/kebabCaseName/, kebabCaseName)
    const componentNameVueFileName = `./src/bcq-ui/components/${kebabCaseName}/${kebabCaseName}.vue`
    if (!dryRun) {
      await fs.writeFile(componentNameVueFileName, componentNameVueFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(componentNameVueFileName))

    // create /public/data/pages-md/CATEGORY/COMPONENT-NAME.md
    pageMdFileContent = await fs.readFile('./bcq-cli/templates/page.md', { encoding: 'utf8' })
    pageMdFileContent = pageMdFileContent.replace(/componentName/g, componentName)
    const pageMdFileName = `./public/data/pages-md/${category}/${kebabCaseName}.md`
    if (!dryRun) {
      await fs.writeFile(pageMdFileName, pageMdFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(pageMdFileName))

    // create /src/pages/CATEGORY/COMPONENT-NAME.vue
    pageVueFileContent = await fs.readFile('./bcq-cli/templates/page.vue.md', { encoding: 'utf8' })
    pageVueFileContent = pageVueFileContent
      .replace(/componentName/g, componentName)
      .replace(/tagName/g, tagName)
    const pageVueFileName = `./src/pages/${category}/${kebabCaseName}.vue`
    if (!dryRun) {
      await fs.writeFile(pageVueFileName, pageVueFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(pageVueFileName))

    // create /public/data/pages/CATEGORY/COMPONENT-NAME.json
    pageJsonFileContent = await fs.readFile('./bcq-cli/templates/page.json.md', { encoding: 'utf8' })
    pageJsonFileContent = pageJsonFileContent
      .replace(/componentName/g, componentName)
      .replace(/tagName/g, tagName)
      .replace(/kebabCaseName/g, kebabCaseName)
    const pageJsonFileName = `./public/data/pages/${category}/${kebabCaseName}.json`
    if (!dryRun) {
      await fs.writeFile(pageJsonFileName, pageJsonFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(pageJsonFileName))

    // create /public/code/COMPONENT-NAME.md
    codeMdFileContent = await fs.readFile('./bcq-cli/templates/code.md', { encoding: 'utf8' })
    codeMdFileContent = codeMdFileContent.replace(/tagName/g, tagName)
    const codeMdFileName = `./public/code/${kebabCaseName}.md`
    if (!dryRun) {
      await fs.writeFile(codeMdFileName, codeMdFileContent)
    }
    console.log(chalk.dim('[created file]:     '), accentColor(codeMdFileName))

    // create /public/images/thumbnails/COMPONENT-NAME.png (random social-sharing image, see bcq-cli/thumbnail.cjs)
    const thumbnailFileName = `./public/images/thumbnails/${kebabCaseName}.png`
    if (existsSync(thumbnailFileName)) {
      console.log(chalk.dim('[already exists]:   '), accentColor(thumbnailFileName))
    } else {
      createThumbnail(kebabCaseName, { dryRun })
      console.log(chalk.dim('[created file]:     '), accentColor(thumbnailFileName))
    }

    // register in /src/bcq-ui/components/index.js: export { default as BcComponentName } from './kebab-case-name'
    // inserted alphabetically among the other component exports (commented-out exports count too)
    const componentsIndexFileName = './src/bcq-ui/components/index.js'
    const exportName = `Bc${componentName}`
    const exportLine = `export { default as ${exportName} } from './${kebabCaseName}'`
    const indexLines = (await fs.readFile(componentsIndexFileName, { encoding: 'utf8' })).split('\n')
    const exportRegex = /^(?:\/\/\s*)?export \{ default as (Bc\w+) \} from '\.\/[\w-]+'/
    const isComponentExport = line => {
      const match = line.match(exportRegex)
      // BcqUi (installer) and BcApp are pinned at the top of the file
      return match && !['BcqUi', 'BcApp'].includes(match[1]) ? match[1] : null
    }
    if (indexLines.some(line => line.match(exportRegex)?.[1] === exportName)) {
      console.log(chalk.dim('[already registered]:'), accentColor(`${exportName} in ${componentsIndexFileName}`))
    } else {
      let insertAt = indexLines.findIndex(line => {
        const name = isComponentExport(line)
        return name && name.localeCompare(exportName) > 0
      })
      if (insertAt === -1) {
        // goes last: right after the last component export
        insertAt = indexLines.findLastIndex(line => line.match(exportRegex)) + 1
      }
      indexLines.splice(insertAt, 0, exportLine)
      if (!dryRun) {
        await fs.writeFile(componentsIndexFileName, indexLines.join('\n'))
      }
      console.log(chalk.dim('[registered]:       '), accentColor(`${exportName} in ${componentsIndexFileName} (line ${insertAt + 1})`))
    }

    // register the demo page in /src/helpers/router.js: import the page and add its route,
    // both inserted alphabetically among the pages of the same category
    const routerFileName = './src/helpers/router.js'
    const pageName = `PageBc${componentName}`
    const camelCaseName = kebabCaseName.replace(/-./g, x => x[1].toUpperCase())
    const routerLines = (await fs.readFile(routerFileName, { encoding: 'utf8' })).split('\n')

    if (routerLines.some(line => line.trim() === `name: '${pageName}',`)) {
      console.log(chalk.dim('[already registered]:'), accentColor(`${pageName} in ${routerFileName}`))
    } else {
      // routes: each route block runs from its "  path:" line to its closing "}, {" / "}]" line
      const blocks = []
      routerLines.forEach((line, i) => {
        if (line.startsWith('  path: ')) {
          blocks.push({ start: i })
        }
        const block = blocks[blocks.length - 1]
        if (!block || block.end !== undefined) {
          return
        }
        const field = line.match(/^  (name|category): '([^']*)',?$/)
        if (field) {
          block[field[1]] = field[2]
        }
        if (line === '}, {' || line === '}]') {
          block.end = i
        }
      })
      const sameCategory = blocks.filter(block => block.category === category)
      if (!sameCategory.length) {
        throw new Error(`no routes with category '${category}' found in ${routerFileName}`)
      }
      const routeFields = [
        `  path: '/${category}/${kebabCaseName}',`,
        `  component: ${pageName},`,
        '  render: true,',
        `  category: '${category}',`,
        "  icon: 'home',",
        `  name: '${pageName}',`,
        `  meta: meta.${camelCaseName}`
      ]
      const before = sameCategory.find(block => block.name && block.name.localeCompare(pageName) > 0)
      const after = sameCategory[sameCategory.length - 1]
      let routeAt
      if (before) {
        routeAt = before.start
        routerLines.splice(routeAt, 0, ...routeFields, '}, {')
      } else if (routerLines[after.end] === '}, {') {
        routeAt = after.end + 1
        routerLines.splice(routeAt, 0, ...routeFields, '}, {')
      } else {
        // last route of the array: close it and append
        routeAt = after.end
        routerLines.splice(routeAt, 0, '}, {', ...routeFields)
        routeAt++
      }

      // imports: among "import PageBc... from '../pages/CATEGORY/...'" (done after the routes, as it shifts line numbers)
      const importLine = `import ${pageName} from '../pages/${category}/${kebabCaseName}.vue'`
      const importRegex = new RegExp(`^import (PageBc\\w+) from '\\.\\./pages/${category}/[\\w-]+\\.vue'$`)
      const categoryImports = routerLines.map((line, i) => ({ i, name: (line.match(importRegex) || [])[1] })).filter(item => item.name)
      if (!categoryImports.length) {
        throw new Error(`no page imports for category '${category}' found in ${routerFileName}`)
      }
      const importBefore = categoryImports.find(item => item.name.localeCompare(pageName) > 0)
      const importAt = importBefore ? importBefore.i : categoryImports[categoryImports.length - 1].i + 1
      routerLines.splice(importAt, 0, importLine)
      routeAt++

      if (!dryRun) {
        await fs.writeFile(routerFileName, routerLines.join('\n'))
      }
      console.log(chalk.dim('[registered]:       '), accentColor(`${pageName} import in ${routerFileName} (line ${importAt + 1})`))
      console.log(chalk.dim('[registered]:       '), accentColor(`/${category}/${kebabCaseName} route in ${routerFileName} (line ${routeAt + 1})`))
    }

    // export the page meta from /src/helpers/meta.js (the route above references meta.camelCaseName),
    // inserted alphabetically among the exports of the same category
    const metaFileName = './src/helpers/meta.js'
    const metaLine = `export { meta as ${camelCaseName} } from '../../public/data/pages/${category}/${kebabCaseName}.json'`
    const metaLines = (await fs.readFile(metaFileName, { encoding: 'utf8' })).split('\n')
    const metaRegex = /^export \{ meta as (\w+) \} from '\.\.\/\.\.\/public\/data\/pages\/([\w-]+)\/[\w-]+\.json'$/

    if (metaLines.some(line => (line.match(metaRegex) || [])[1] === camelCaseName)) {
      console.log(chalk.dim('[already registered]:'), accentColor(`meta.${camelCaseName} in ${metaFileName}`))
    } else {
      const categoryMetas = metaLines
        .map((line, i) => ({ i, match: line.match(metaRegex) }))
        .filter(item => item.match && item.match[2] === category)
      if (!categoryMetas.length) {
        throw new Error(`no meta exports for category '${category}' found in ${metaFileName}`)
      }
      const metaBefore = categoryMetas.find(item => item.match[1].localeCompare(camelCaseName) > 0)
      const metaAt = metaBefore ? metaBefore.i : categoryMetas[categoryMetas.length - 1].i + 1
      metaLines.splice(metaAt, 0, metaLine)
      if (!dryRun) {
        await fs.writeFile(metaFileName, metaLines.join('\n'))
      }
      console.log(chalk.dim('[registered]:       '), accentColor(`meta.${camelCaseName} in ${metaFileName} (line ${metaAt + 1})`))
    }

    // add the page path to /sitemap.json, alphabetically among the paths of the same category
    // (edited line by line to keep the file's formatting: one path per line, blank lines between categories)
    const sitemapFileName = './sitemap.json'
    const sitemapPath = `/${category}/${kebabCaseName}`
    const sitemapContent = await fs.readFile(sitemapFileName, { encoding: 'utf8' })

    if (JSON.parse(sitemapContent).includes(sitemapPath)) {
      console.log(chalk.dim('[already registered]:'), accentColor(`${sitemapPath} in ${sitemapFileName}`))
    } else {
      const sitemapLines = sitemapContent.split('\n')
      const sitemapRegex = new RegExp(`^\\s*"(/${category}/[\\w-]+)",$`)
      const categoryPaths = sitemapLines
        .map((line, i) => ({ i, path: (line.match(sitemapRegex) || [])[1] }))
        .filter(item => item.path)
      if (!categoryPaths.length) {
        throw new Error(`no '/${category}/...' paths found in ${sitemapFileName}`)
      }
      const pathBefore = categoryPaths.find(item => item.path.localeCompare(sitemapPath) > 0)
      const sitemapAt = pathBefore ? pathBefore.i : categoryPaths[categoryPaths.length - 1].i + 1
      sitemapLines.splice(sitemapAt, 0, `  "${sitemapPath}",`)
      const newSitemapContent = sitemapLines.join('\n')
      JSON.parse(newSitemapContent) // never write invalid JSON
      if (!dryRun) {
        await fs.writeFile(sitemapFileName, newSitemapContent)
      }
      console.log(chalk.dim('[registered]:       '), accentColor(`${sitemapPath} in ${sitemapFileName} (line ${sitemapAt + 1})`))
    }

    console.log(chalk.yellow('...done\n'))

    // open /cq-cli/manual-tasks
    manualTasksFileContent = await fs.readFile('./bcq-cli/templates/manual-tasks.md', { encoding: 'utf8' })
    manualTasksFileContent = manualTasksFileContent
      .replace(/kebabCaseName/g, kebabCaseName)
      .replace(/category/g, category)
      .replace(/componentDef/, componentName)
    console.log(manualTasksFileContent)

    // link to the new demo page on the dev server (vite's default port, as vite.config.js sets none;
    // trailing slash because the docs site adds one to every URL, see addTrailingSlashToUrl in src/helpers/config.js)
    const demoPageUrl = `${devServerUrl}/${category}/${kebabCaseName}/`
    console.log(mainColor(dryRun
      ? `✔ Dry run finished: the ${componentName} component boilerplate would be ready at:`
      : `✔ The ${componentName} component boilerplate is ready!`))
    console.log(`  Run ${accentColor('npm run dev')} and open: ${accentColor.underline(demoPageUrl)}`)
    console.log(chalk.dim(`  (if port ${new URL(devServerUrl).port} is already in use, Vite picks the next free one - use the port shown in the npm run dev output)\n`))

    console.log(mainColor(`*** Thank you for using ${title}! Have fun building your ${componentName} component ***\n`))
  } catch (error) {
    // Ctrl+C while a prompt is open
    if (error.name === 'ExitPromptError') {
      console.log(chalk.dim('\nCancelled, nothing was created.'))
      return
    }
    console.error('An error occurred:', error)
  }
}

steps();
