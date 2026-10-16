<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12" v-for="(gradient, framework) in config.items">
      <flat-card :content-padding="['px-4']">
        <bc-heading :class="['word-break-all']" :truncate="false" v-gradient-text="gradient" :divider="false" font-weight="bold" font-size="6xl">{{ framework }}</bc-heading>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcGradientText',
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
