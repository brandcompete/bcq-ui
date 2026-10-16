<template>
  <bc-app :dark="dark" v-resize="onResize">
    <bc-layout :sidebar-right="sidebarRight" :sidebar-left="sidebarLeft" :floating-sidebars="floatingSidebars" :floating-sidebars-blocker-blur="getConfig.floatingSidebarsBlockerBlur">
      <template v-slot:header>
        <bc-table-layout y-align="middle">
          <bc-table-layout-row>
            <bc-table-layout-cell>
              <bc-heading :divider="false" :margin="['ml-1']" font-size="base">{{ getConfig.appName }}</bc-heading>
            </bc-table-layout-cell>
            <bc-table-layout-cell x-align="right">
              <bc-icon :name="$icons[dark ? 'light' : 'dark']" :class="['cursor-pointer']" :title="getLang.setTheme(dark)" @click="toggleTheme" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </template>
      <template v-slot:sidebar-left-controls>
        <bc-table-layout v-if="sidebarLeft.expanded" :class="['cursor-pointer', 'categories', 'white-space-nowrap', 'transition-алл', 'transition-duration-500', 'opacity-70', 'hover:opacity-100']">
          <bc-table-layout-row>
            <bc-table-layout-cell :class="['white-space-nowrap']">
              <bc-icon :title="getLang[item.category]" tag="router-link" :to="item.path" :name="$icons[item.icon]" v-for="(item, index) in sidebarLeftControls" :key="index" :class="['mr-2']" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </template>
      <template v-slot:sidebar-left>
        <logo />
        <site-navigation />
      </template>
      <template v-slot:main>
        <bc-grid v-if="siteWorkInProgress" :class="['mb-3', 'mx-1']">
          <bc-grid-col :span="12">
            <bc-alert v-model:visible="siteWorkInProgress" :icon="$icons.info" color="discovery" variant="solid">{{ getLang.siteWorkInProgress }}</bc-alert>
          </bc-grid-col>
        </bc-grid>
        <page-title :page="page" />
        <bc-grid>
          <bc-grid-col :span="12">
            <section-md set-meta-content :class="['px-1', 'page-description', 'mb-4']" />
            <bc-reactive-style>
            .page-description a,
            .page-description code,
            .ui-colors .section-md a,
            .ui-colors .section-md code,
            .color-swatches .section-md a,
            .color-swatches .section-md code
            {
              font-weight: 600;
              color: {{ getConfig.homePageGradient[dark ? 0 : 1] }};
              text-decoration: none;
            }
            .page-description a:hover
            {
              text-decoration: underline;
            }

            .page-description code
            {
              background: rgba(0, 0, 0, .05);
              padding: 0 2px;
              display: inline-block;
            }

            .bc-app-theme-dark .page-description code
            {
              background: rgba(255, 255, 255, .1);
            }
            </bc-reactive-style>
          </bc-grid-col>
        </bc-grid>
        <router-view />
        <documentation v-if="page && page.documentation && $route.name !== 'PageBcCategoryPage'" :docs="page.documentation" :page-title="page.meta.pageTitle" />
        <ui-category-page :category="$route.path.split('/')[1]" v-if="$route.name !== 'PageBcCategoryPage'" />
        <page-data :page="page" :class="['mb-4']" v-if="$config.showPageData" />
      </template>
      <template v-slot:sidebar-right>
        <page-anchors @toggle-sidebar-right="onToggleSidebarRight" :links="page.meta.links" v-if="page && page.meta && page.meta.links" />
        <random-component />
      </template>
      <template v-slot:footer>
        <page-console />
      </template>
    </bc-layout>
    <bc-snackbar />
    <bc-notification />
    <bc-tooltip />
    <bc-loading-overlay v-model:visible="loadingOverlay" />
    <bc-context-menu />
    <bc-svg-icon-sprite :color="dark ? '#fff' : '#000'" />
    <bc-navigator-online />
  </bc-app>
</template>
<script>
import computed from './mixins/computed.js'
import methods from '@/mixins/methods.js'
import PageTitle from './components/page-title/index.vue'
import Documentation from './components/documentation/index.vue'
import SiteNavigation from './components/site-navigation/index.vue'
import PageData from '@/components/page-data/index.vue'
import Logo from '@/components/logo/index.vue'
import PageAnchors from '@/components/page-anchors/index.vue'

import mitt from 'mitt'
const emitter = mitt()

import {
  PageStore
} from './stores/page.js'
import UiCategoryPage from '@/components/ui-category-page/index.vue'
import RandomComponent from '@/components/random-component/index.vue'
import BcSvgIconSprite from '@/components/bc-svg-icon-sprite/index.vue'
import PageConsole from '@/components/page-console/index.vue'

export default {
  name: 'App',
  components: {
    Logo,
    PageData,
    PageTitle,
    PageAnchors,
    PageConsole,
    Documentation,
    BcSvgIconSprite,
    SiteNavigation,
    UiCategoryPage,
    RandomComponent
  },
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      floatingSidebars: false,
      loadingOverlay: false,
      siteWorkInProgress: this.$config.siteWorkInProgress,
      dark: this.$config.dark,
      page: null,
      sidebarLeftControls: [{
        icon: 'home',
        path: '/',
        category: 'home'
      }, {
        icon: 'gettingStarted',
        path: '/getting-started',
        category: 'getting-started'
      }, {
        icon: 'content',
        path: '/content',
        category: 'content'
      }, {
        icon: 'ui',
        path: '/ui',
        category: 'ui'
      }, {
        icon: 'forms',
        path: '/forms',
        category: 'forms'
      }, {
        icon: 'directives',
        path: '/directives', // @todo: /directives
        category: 'directives'
      }],
      sidebarLeft: {
        width: 260,
        elevation: 'none',
        iconOpen: 'menu-close',
        iconClose: 'menu-open',
        expanded: true,
        zIndex: this.$config.defaultSidebarsZIndex,
        overflow: 'hidden'
      },
      sidebarRight: {
        width: 260,
        elevation: 'none',
        iconOpen: 'menu-open',
        iconClose: 'menu-close',
        expanded: false,
        zIndex: this.$config.defaultSidebarsZIndex,
        overflow: 'hidden'
      }
    }
  },
  watch: {
    '$route.path' () {
      this.scrollToTop()
      this.$nextTick(() => {
        this.onResize()
      })
    },
    'sidebarLeft.expanded' () {
      this.toggleSidebarsZIndexes('Left')
    },
    'sidebarRight.expanded' () {
      this.toggleSidebarsZIndexes('Right')
    },
    dark () {
      this.toggleHighlightJsCssTheme()
    }
  },
  created () {
    this.bind()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.toggleHighlightJsCssTheme()
      this.emulateVueRouterLinks()
      this.onResize()
      if (!this.getConfig.showPageData) {
        this.awaitForElement('main').then(main => {
          main.classList.add('mb-4')
        })
      }
    },
    awaitForElement (selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector))
        }
        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            observer.disconnect()
            resolve(document.querySelector(selector))
          }
        })
        observer.observe(document.body, {childList: true, subtree: true})
      })
    },
    toggleSidebarsZIndexes (sidebar = 'Left') {
      const config = this.getConfig
      const body = this.body()
      const toggledSidebar = this[`sidebar${sidebar === 'Left' ? 'Right' : 'Left'}`]
      const overflowHidden = 'overflow-hidden'
      if (this.floatingSidebars && this[`sidebar${sidebar}`].expanded) {
        body.classList.add(overflowHidden)
        toggledSidebar.zIndex = config.defaultFloatingSidebarsCollapsedZIndex
      } else {
        body.classList.remove(overflowHidden)
        toggledSidebar.zIndex = config.defaultSidebarsZIndex
      }
    },
    bind () {
      PageStore().$subscribe((mutation, state) => {
        this.page = PageStore().getPageData()
      })
      this.$emitter.on('*', (type, data) => {
        const observedEvents = ['loading-overlay:show', 'loading-overlay:hide']
        switch (type) {
          case observedEvents[0]:
            this.loadingOverlay = true
            break
          case observedEvents[1]:
            this.loadingOverlay = false
            break
          case 'theme:toggle':
            this.toggleTheme()
            break
          // default:
            // console.log(`@${type}`, data)
        }
        if (observedEvents.includes(type)) {
          this.log(`@${type}`, 'bc-loading-overlay', data || null)
        }
      })
    },
    onResize () {
      const width = this.viewport().width
      if (width < this.getConfig.mobileThreshold) {
        this.sidebarLeft.expanded = false
        this.sidebarRight.expanded = false
        this.floatingSidebars = true
      } else {
        this.sidebarLeft.expanded = true
        this.floatingSidebars = false
      }
    },
    toggleTheme () {
      this.dark = !this.dark
      this.setLocalData(this.getLocalDataKeys.theme, this.dark)
    },
    onToggleSidebarRight ($event) {
      // this.sidebarRight.expanded = $event
    },
    toggleHighlightJsCssTheme () {
      const dark = this.dark
      const config = this.getConfig.highlightJs
      const stylesheetDark = config.stylesheetDark
      const stylesheetLight = config.stylesheetLight
      const attr = 'data-highlight-js'
      const href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${config.version}/styles/${dark ? stylesheetDark : stylesheetLight}.min.css`
      const stylesheetNode = document.querySelector(`link[${attr}]`)
      const _setDataAttribute = node => {
        node.setAttribute(attr, dark ? 'dark' : 'light')
      }
      const _setHrefAttribute = node => {
        node.setAttribute('href', href)
      }
      if (!stylesheetNode) {
        const css = document.createElement('link')
        css.setAttribute('rel', 'stylesheet')
        _setHrefAttribute(css)
        _setDataAttribute(css)
        document.querySelector('head').appendChild(css)
      } else {
        _setHrefAttribute(stylesheetNode)
        _setDataAttribute(stylesheetNode)
      }
    }
  }
}
</script>
