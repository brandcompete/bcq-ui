<template>
  <bc-grid v-if="config">
    <utility-css-classes-others show-as-prop-value="animate-" v-for="item in classes" :config="config.classes[item]" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcCssAnimations',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
    }
  },
  computed: {
    classes () {
      return Object.keys(this.config.classes)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
