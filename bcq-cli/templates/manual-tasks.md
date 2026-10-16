STEP 3: Remaining Manual Tasks:
     3.1: From /src/bcq-ui/components/index.js, export:
          export { default as ImportBcComponentName } from './kebabCaseName'
     3.2: In /src/helpers/router.js import and register the new page route:
          import PageBcComponentName from '../pages/category/kebabCaseName.vue'
     3.3: In /src/helpers/meta.js, add:
          export { meta as componentNameToCamelCase } from '../../public/data/pages/category/kebabCaseName.json'
     3.4: In /sitemap.json, add:
          "/category/kebabCaseName"
     3.5: Add componentDef and its dependencies to /public/data/miscellaneous/bundler-defs.json
     3.6: Create "kebabCaseName.png" thumbnail of the demo page and add it to /public/images/thumbnails. Use https://imageonline.io/random-image-generator/ (choose "cool" preset and "2048x2048" size), and then crop via https://bulkimagecrop.com/ (select width 1200 and height 630 custom size)
     3.7: Once deployed, check the sharing previews of the new page for different platforms (Facebook, WhatsApp, Google, Telegram, LinkedIn, X, Discord, etc.) on https://microlink.io/tools/sharing-debugger
