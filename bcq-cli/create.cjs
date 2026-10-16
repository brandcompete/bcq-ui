const fs = require('node:fs/promises')
const readline = require("readline")
const chalk = require('chalk')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = function(query) {
  return new Promise(resolve => {
    rl.question(query, resolve)
  })
}

const dryRun = false
const title = 'BCQ3 CLI'
const categories = ['content', 'ui', 'forms']
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

    await askQuestion(`\nSTEP 1: Select category. Choose one of ${categories.join(', ')}: `).then(value => {
      if (!categories.includes(value)) {
        console.error(`Category does not exist. Pick one of ${categories.join(', ')}. Exiting...`, value)
        return rl.close()
      } else {
        console.log(chalk.dim('[category]:'), accentColor(value))
        category = value
      }
    })

    await askQuestion('STEP 2: Type component name. Use SentenceCase, no spaces, hyphens, special characters or numbers: ').then(value => {
      value = value.replace(/\s/g,'')
      console.log(chalk.dim('[name]:    '), accentColor(value))
      componentName = value
    })

    kebabCaseName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    tagName = `bc-${kebabCaseName}`

    console.log(chalk.yellow('\ncreating files and folders...'))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME folder
    const folder = `./src/bcq-ui/components/${kebabCaseName}`
    if (!dryRun) {
      fs.mkdir(folder)
    }
    console.log(chalk.dim('[created directory]:'), accentColor(folder))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME/index.js
    const componentTemplate = './bcq-cli/templates/component-template/'
    indexJsFileContent = await fs.readFile(`${componentTemplate}index.md`, { encoding: 'utf8' })
    indexJsFileContent = indexJsFileContent.replace(/ComponentTemplate/g, componentName).replace(/kebabCaseName/, kebabCaseName)
    const indexJsFileName = `./src/bcq-ui/components/${kebabCaseName}/index.js`
    if (!dryRun) {
      fs.writeFile(indexJsFileName, indexJsFileContent, () => {})
    }
    console.log(chalk.dim('[created file]:     '), accentColor(indexJsFileName))

    // create /src/bcq-ui/components/CATEGORY/COMPONENT-NAME/COMPONENT-NAME.vue
    componentNameVueFileContent =  await fs.readFile(`${componentTemplate}component-template.md`, { encoding: 'utf8' })
    componentNameVueFileContent = componentNameVueFileContent
      .replace(/BcComponentTemplate/g, `Bc${componentName}`)
      .replace(/kebabCaseName/, kebabCaseName)
    const componentNameVueFileName = `./src/bcq-ui/components/${kebabCaseName}/${kebabCaseName}.vue`
    if (!dryRun) {
      fs.writeFile(componentNameVueFileName, componentNameVueFileContent, () => {})
    }
    console.log(chalk.dim('[created file]:     '), accentColor(componentNameVueFileName))

    // create /public/data/pages-md/CATEGORY/COMPONENT-NAME.md
    pageMdFileContent = await fs.readFile('./bcq-cli/templates/page.md', { encoding: 'utf8' })
    pageMdFileContent = pageMdFileContent.replace(/componentName/g, componentName)
    const pageMdFileName = `./public/data/pages-md/${category}/${kebabCaseName}.md`
    if (!dryRun) {
      fs.writeFile(pageMdFileName, pageMdFileContent, () => {})
    }
    console.log(chalk.dim('[created file]:     '), accentColor(pageMdFileName))

    // create /src/pages/CATEGORY/COMPONENT-NAME.vue
    pageVueFileContent = await fs.readFile('./bcq-cli/templates/page.vue.md', { encoding: 'utf8' })
    pageVueFileContent = pageVueFileContent
      .replace(/componentName/g, componentName)
      .replace(/tagName/g, tagName)
    const pageVueFileName = `./src/pages/${category}/${kebabCaseName}.vue`
    if (!dryRun) {
      fs.writeFile(pageVueFileName, pageVueFileContent, () => {})
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
      fs.writeFile(pageJsonFileName, pageJsonFileContent, () => {})
    }
    console.log(chalk.dim('[created file]:     '), accentColor(pageJsonFileName))

    // create /public/code/COMPONENT-NAME.md
    codeMdFileContent = await fs.readFile('./bcq-cli/templates/code.md', { encoding: 'utf8' })
    codeMdFileContent = codeMdFileContent.replace(/tagName/g, tagName)
    const codeMdFileName = `./public/code/${kebabCaseName}.md`
    if (!dryRun) {
      fs.writeFile(codeMdFileName, codeMdFileContent, () => {})
    }
    console.log(chalk.dim('[created file]:     '), accentColor(codeMdFileName))

    console.log(chalk.yellow('...done\n'))

    // open /cq-cli/manual-tasks
    manualTasksFileContent = await fs.readFile('./bcq-cli/templates/manual-tasks.md', { encoding: 'utf8' })
    manualTasksFileContent = manualTasksFileContent
      .replace(/kebabCaseName/g, kebabCaseName)
      .replace(/componentNameToCamelCase/g, kebabCaseName.replace(/-./g, x=>x[1].toUpperCase()))
      .replace(/category/g, category)
      .replace(/PageBcComponentName/g, `PageBc${componentName}`)
      .replace(/ImportBcComponentName/g, `Bc${componentName}`)
      .replace(/componentDef/, componentName)
    console.log(manualTasksFileContent)

    console.log(mainColor(`*** Thank you for using ${title}! Have fun building your ${componentName} component ***\n`))
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    rl.close()
  }
}

steps();
