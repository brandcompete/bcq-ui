<template>
  <bc-grid>
    <bc-grid-col>
      <install-bcq />
      <ui-category-page :title="true" v-for="category in getConfig.pageCategories" :category="category" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../mixins/methods.js'
import computed from '../mixins/computed.js'
import props from '../mixins/props.js'

export default {
  name: 'PageIndex',
  mixins: [
    props,
    methods,
    computed
  ],
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta('/index').then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
