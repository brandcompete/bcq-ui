<template>
  <bc-grid v-if="config && category">
    <bc-grid-col>
      <install-bcq v-if="category === 'getting-started'" />
      <ui-category-page v-if="getConfig.pageCategories.includes(category)" :category="category" />
      <sitemap v-else-if="category === 'sitemap'" :class="['mb-4']" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../mixins/methods.js'
import computed from '../mixins/computed.js'
import props from '../mixins/props.js'

export default {
  name: 'PageBcCategoryPage',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null,
      category: null
    }
  },
  watch: {
    '$route.path' () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
        this.category = this.$route.params.category
      })
    }
  }
}
</script>
