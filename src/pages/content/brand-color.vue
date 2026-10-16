<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <color-swatches :colors="config.colorSwatches" :title="false" :margin="[]" />
      <bc-brand-color v-for="(hex, name) in config.colors" :name="name" :hex="hex" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBrandColor',
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
        this.config = {
          ...data.config,
          colorSwatches: Object.keys(data.config.colors)
        }
      })
    }
  }
}
</script>
