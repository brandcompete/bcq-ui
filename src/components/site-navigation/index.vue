<template>
  <bc-container :class="[baseCss]">
    <bc-container :class="['mb-2', `${baseCss}-search-field`]">
      <bc-text-field clearable :icon-left="$icons.search" :placeholder="getLang.search" v-model:value="search" size="sm" @focusin="showSearchResults" @focusout="hideSearchResults" />
    </bc-container>
    <bc-container :class="[`${baseCss}-search-results`, 'overflow-auto']">
      <bc-container v-for="(items, category) in categories" v-if="!searchFocused">
        <bc-container>
          <bc-heading tag="router-link" :to="`/${category}/`" :href="`/${category}/`" :class="['opacity-70', 'cursor-pointer']" :margin="['mb-2']" :padding="['pb-2']" font-size="sm">{{ getLang[category] }}</bc-heading>
          <bc-list :class="['mb-2']">
            <bc-list-item v-for="(route, index) in items.routes" :data-route-path="makeDataRoutePathAttribute(route)" :key="index" tag="router-link" :to="route.path" :href="makeHref(route.path)">
              <bc-list-item-icon>
                <bc-icon :name="route.icon" :class="['opacity-80']" />
              </bc-list-item-icon>
              <bc-list-item-content>
                <bc-list-item-content-title font-weight="normal" v-text="removeForVue(route.meta.pageTitle)" />
              </bc-list-item-content>
            </bc-list-item>
          </bc-list>
        </bc-container>
      </bc-container>
      <bc-container v-else>
        <bc-list v-if="searchRoutes.length">
          <bc-list-item v-for="(route, index) in searchRoutes" :key="index" tag="router-link" :href="makeHref(route.path)" :to="route.path">
            <bc-list-item-icon>
              <bc-icon :name="route.icon" :class="['opacity-80']" />
            </bc-list-item-icon>
            <bc-list-item-content>
              <bc-list-item-content-title v-text="removeForVue(route.meta.pageTitle)" />
              <bc-list-item-content-sub-title v-text="route.category ? getLang[route.category] : route.meta.description" font-weight="bold" :class="['uppercase', 'opacity-50']" />
            </bc-list-item-content>
          </bc-list-item>
        </bc-list>
        <bc-alert v-else :dismissible="false" :icon="$icons.alert" color="caution" variant="soft">
          <p :class="['font-bold']">{{ getLang.noDocumentationFound }}</p>
          <p :class="['opacity-75']">{{ getLang.tryDifferentSearch }}</p>
        </bc-alert>
      </bc-container>
    </bc-container>
    <copyright-notice />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import CopyrightNotice from '@/components/copyright-notice/index.vue'

export default {
  name: 'SiteNavigation',
  components: {
    CopyrightNotice
  },
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'site-navigation',
      categories: null,
      search: '',
      searchFocused: false
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    searchRoutes () {
      // const routes = this.arrayUniqueBy(this.getRoutes, 'path')
      return this.arrayUniqueBy(this.getRoutes, 'path')
        .filter(route => route.render)
        .filter(route => route.meta)
        .filter(route => {
          const meta = route.meta
          const search = this.search
          const term = search ? search.toLowerCase() : ''
          return meta.pageTitle.toLowerCase().indexOf(term) > -1 ||
            meta.keywords.join(' ').toLowerCase().indexOf(term) > -1
        }).sort(this.sortArray('name'))
    }
  },
  methods: {
    init () {
      const routes = this.getRoutes.filter(route => route.render)
      const categories = {}
      routes.forEach(route => {
        const category = route.category
        if (!categories[category]) {
          categories[category] = {
            label: category,
            routes: routes.filter(item => item.category === category)
          }
        }
      })
      this.categories = categories
      this.sleep(200).then(() => {
        this.scrollToElement(this.getRouterLinkNode(), {block: 'center', container: 'all', inline: 'nearest', behavior: 'smooth'})
      })
    },
    getRouterLinkNode (path) {
      return `[data-route-path="${path || this.$route.path}"]`
    },
    showSearchResults () {
      this.searchFocused = true
    },
    hideSearchResults () {
      this.sleep(500).then(() => {
        this.search = ''
        this.searchFocused = false
      })
    },
    makeHref (path) {
      return `${path}${this.getConfig.addTrailingSlashToUrl ? '/' : ''}`
    },
    makeDataRoutePathAttribute (route) {
      return `${route.path}${this.getConfig.addTrailingSlashToUrl ? '/' : ''}`
    }
  }
}
</script>
<style>
.site-navigation .site-navigation-search-results
{
  height: calc(100dvh - 238px);
}

@media screen and (max-width: 880px)
{
  aside .logo,
  footer,
  .site-navigation .site-navigation-search-field
  {
    display: none;
  }

  .categories
  {
    visibility: hidden;
  }

  .site-navigation .site-navigation-search-results
  {
    height: calc(100dvh - 86px);
  }
}
</style>
