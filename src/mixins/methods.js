import {
  PageStore
} from '@/stores/page.js'
import copy from 'clipboard-copy'

const methods = {
  methods: {
    /**
     * method emit
     * @params event String
     * @params data Object
     * */
    emit (event, data) {
      this.$emitter.emit(event, data)
    },
    arrayFrom (length, zeroIndex = true) {
      return Array.from(Array(length).keys()).map(value => {
        return value + (zeroIndex ? 0 : 1)
      })
    },
    removeForVue (string) {
      return string.replace(' for Vue3', '')
    },
    htmlToEntity (html) {
      return html
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    },
    toPath (path) {
      this.$router.push({path})
    },
    buildConsoleArguments (...args) {
      return { args }
    },
    objectToStyle (object) {
      const style = []
      Object.keys(object).forEach(property => {
        style.push(`${property}: ${object[property]}`)
      })
      return style.join(';')
    },
    log (...args) {
      const data = this.buildConsoleArguments(...args)
      // console.log(...data.args)
      this.emit('page-console:message', data)
    },
    body () {
      return document.querySelector('body')
    },
    isStringHex (value) {
      return typeof value === 'string' && /^(#|0x)?[0-9A-Fa-f]+$/i.test(value)
    },
    copyClass (cssClass) {
      this.copyToClipboard(cssClass).then(() => {
        this.$emitter.emit('bc-snackbar:message', {
          message: this.getLang.copiedToClipboard,
          autoCloseDelay: 5000,
          color: 'success',
          variant: 'solid'
        })
      })
    },
    makeSliderLabel (name, model) {
      return `${name}: ${this.config[model]}`
    },
    arrayUniqueBy(arr, key) {
      const seen = new Set()
      return arr.filter(item => {
        const value = item[key]
        if (seen.has(value)) {
          return false
        }
        seen.add(value)
        return true
      })
    },
    viewport () {
      const w = window
      const d = document
      const e = d.documentElement
      const g = d.querySelector('body')
      const width = w.innerWidth || e.clientWidth || g.clientWidth
      const height = w.innerHeight || e.clientHeight || g.clientHeight
      return {
        width,
        height
      }
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    toggleAppTheme () {
      this.$emitter.emit('theme:toggle')
    },
    setLocalData (key, value = null) {
      if (key) {
        localStorage.setItem(key, JSON.stringify(value))
      }
    },
    getLocalData (key) {
      if (key) {
        return JSON.parse(localStorage.getItem(key))
      }
    },
    deleteLocalData (key) {
      if (key) {
        localStorage.removeItem(key)
      }
    },
    sortArray (key, descending = false) {
      /* usage: Array.sort(sortArray(key, descending)) */
      return function (a, b) {
        if (a[key].toString().toLowerCase() > b[key].toString().toLowerCase()) {
          return descending ? -1 : 1
        }
        if (a[key].toString().toLowerCase() < b[key].toString().toLowerCase()) {
          return descending ? 1 : -1
        }
        return 0
      }
    },
    isOdd (number) {
      return number % 2
    },
    rnd () {
      return `rnd=${this.uuid()}`
    },
    showLoadingOverlay () {
      this.$emitter.emit('loading-overlay:show', true)
    },
    hideLoadingOverlay () {
      this.$emitter.emit('loading-overlay:hide', true)
    },
    emulateVueRouterLinks () {
      document.querySelector('.bc-app').addEventListener("click", (event) => {
        const target = event.target
        if(target.hasAttribute('v-link')) {
          event.preventDefault()
          this.$router.push({
            path: target.getAttribute('href')
          })
        }
      })
    },
    camelCaseToWords(string) {
      const result = string.replace(/([A-Z])/g, ' $1')
      return result.charAt(0).toUpperCase() + result.slice(1)
    },
    uuid () {
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      )
    },
    copyToClipboard (value) {
      if (value) {
        return new Promise(resolve => {
          copy(value).then(() => {
            resolve()
          })
        })
      }
    },
    sleep (milliseconds = 1000) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    trimLineBreaks (string) {
      return string.replace(/(\r\n|\n|\r)/gm, '').trim()
    },
    setDocumentMeta (data) {
      const appName = this.getConfig.appName
      const metaKeywords = this.getMetaKeywords()
      document.title = data && this.$route.name !== 'PageIndex' ? `${this.removeForVue(data.pageTitle)} | ${appName}` : appName
      if (metaKeywords) {
        metaKeywords.setAttribute('content', data.keywords.join(', '))
      }
    },
    stripHtml (html) {
      let tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    },
    getMetaDescription () {
      return document.querySelector('meta[name="description"]')
    },
    getMetaKeywords () {
      return document.querySelector('meta[name="keywords"]')
    },
    toTitleCase (string) {
      return string.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      )
    },
    capitalizeFirstLetter (string) {
      return String(string).charAt(0).toUpperCase() + String(string).slice(1)
    },
    objectNotEmpty (object) {
      return Object.keys(object).length !== 0
    },
    makeBgColor (color = 'red', lightness = 500) {
      return `bg-${color}-${lightness}`
    },
    hasTrailingSlash (string) {
      return /\/$/.test(string)
    },
    removeTrailingSlash (string) {
      return string.replace(/\/+$/, '')
    },
    getPageMeta (slug = this.$route.path, setData = true) {
      const store = PageStore()
      const url = `/data/pages${this.removeTrailingSlash(slug)}.json`
      return new Promise((resolve, reject) => {
        this.$http({
          url,
          method: 'GET'
        }).then(response => {
          if (setData) {
            store.setPageData(response.data)
          }
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    copyShallow (observable) {
      return JSON.parse(JSON.stringify(observable))
    },
    scrollToTop () {
      this.doScroll()
    },
    scrollToElement (selector, options = {block: 'start', container: 'all', inline: 'nearest', behavior: 'smooth'}) {
      selector = document.querySelector(selector)
      if (selector) {
        selector.scrollIntoView(options)
      }
    },
    doScroll (x = 0, y = 0) {
      window.scrollTo(x, y)
    },
    mapToDropdownArray (array) {
      return array.map(value => {
        return {
          value,
          label: value
        }
      })
    },
    makeShadowClass (swatch) {
      return `shadow-${swatch}`
    },
    removeDashes (string) {
      return string.replace(/-/g, ' ')
    },
    formatByteSize (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
      ]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    getRandomArrayItem (array) {
      return array.sort(() => 0.5 - Math.random())[0]
    }
  }
}

export default methods
