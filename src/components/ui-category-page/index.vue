<template>
  <flat-card :title="setTitle" v-if="routes.length" :class="[baseCss]" :data-anchor="category">
    <bc-grid>
      <bc-grid-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3" v-for="(route, index) in routes" :class="['p-1', cols(index)]">
        <bc-card elevation="none" tag="router-link" :href="`${route.path}/`" :to="route.path" :class="['text-center', route.render ? null : 'disabled']" :title="removeForVue(route.meta.pageTitle)">
          <bc-card-title font-weight="normal">{{ removeForVue(route.meta.pageTitle) }}</bc-card-title>
          <bc-divider />
          <bc-card-text :class="['p-3']">
            <bc-icon :name="route.icon" :size="3" />
          </bc-card-text>
        </bc-card>
      </bc-grid-col>
    </bc-grid>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'UiCategoryPage',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      routes: [],
      baseCss: 'ui-category-page',
    }
  },
  props: {
    category: {
      type: String,
      required: true
    },
    iconSize: {
      type: Number,
      default: 4
    },
    title: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    category () {
      this.init()
    }
  },
  computed: {
    // span () {
    //   return this.routes.length <= 2 ? 6 : 3
    // },
    setTitle () {
      const category = this.category
      const lang = this.getLang
      return lang.uiCategoryPageTitle(lang[category], this.routes.length, category)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.routes = this.getRoutes.filter(route => route.category === this.category)
    },
    cols (index) {
      const length = this.routes.length
      return (index === length - 1 || index === length - 2) && !this.isOdd(length) ? 'col' : null
    }
  }
}
</script>
