import { createApp, h } from 'vue'
import App from './app.vue'
import router from './helpers/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  RecycleScroller
} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import mitt from 'mitt'

import {
  createPinia
} from 'pinia'

import './bcq-ui/styles/variables.css'
import BcqUi from './lib.js'
import '@mdi/font/css/materialdesignicons.css'

import en from './helpers/en.js'
import icons from './helpers/icons.js'
import config from './helpers/config.js'

import CodeChunk from '@/components/code-chunk/index.vue'
import SectionMd from '@/components/section-md/index.vue'
import Toolbar from '@/components/toolbar/index.vue'
import ColorSwatches from '@/components/color-swatches/index.vue'
import UiCategoryPage from '@/components/ui-category-page/index.vue'
import UtilityCssClassesOthers from '@/components/utility-css-classes-others/index.vue'
import Sitemap from '@/components/sitemap/index.vue'
import FlatCard from '@/components/flat-card/index.vue'
import SyntaxHighlight from '@/components/syntax-highlight/index.vue'
import InstallBcq from '@/components/install-bcq/index.vue'
import ComponentWorkInProgress from '@/components/component-work-in-progress/index.vue'
import CodeFiles from '@/components/code-files/index.vue'

import methods from '@/mixins/methods.js'
import computed from '@/mixins/computed.js'

const app = createApp({
  render: () => h(App),
  mixins: [
    methods,
    computed
  ],
  created () {
    if (this.getConfig.showLoadingOverlayInHttpRequests) {
      this.addAxiosInterceptors()
    }
  },
  watch: {
    '$route.path' (newPath) {
      const path = this.$route.path
      if (!this.hasTrailingSlash(path) && this.getConfig.addTrailingSlashToUrl) {
        window.history.replaceState(newPath, null,`${path}/`)
      }
    }
  },
  methods: {
    addAxiosInterceptors () {
      const interceptors = this.$http.interceptors
      interceptors.request.use(config => {
        this.showLoadingOverlay()
        return config
      }, error => {
        this.hideLoadingOverlay()
        return Promise.reject(error)
      })
      interceptors.response.use(async response => {
        this.hideLoadingOverlay()
        return response
      }, error => {
        this.hideLoadingOverlay()
        return Promise.reject(error)
      })
    }
  }
})

app.component('RecycleScroller', RecycleScroller)

app.component('code-chunk', CodeChunk)
app.component('section-md', SectionMd)
app.component('toolbar', Toolbar)
app.component('color-swatches', ColorSwatches)
app.component('ui-category-page', UiCategoryPage)
app.component('utility-css-classes-others', UtilityCssClassesOthers)
app.component('sitemap', Sitemap)
app.component('flat-card', FlatCard)
app.component('syntax-highlight', SyntaxHighlight)
app.component('install-bcq', InstallBcq)
app.component('component-work-in-progress', ComponentWorkInProgress)
app.component('code-files', CodeFiles)

app.config.globalProperties.$lang = en
app.config.globalProperties.$icons = icons
app.config.globalProperties.$config = config
// app.config.globalProperties.$dark = true
app.config.globalProperties.$emitter = mitt()

app
  .use(router)
  .use(createPinia())
  .use(VueAxios, axios)
  .use(BcqUi)
  .mount('#app')
