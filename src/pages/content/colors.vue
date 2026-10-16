<template>
  <bc-grid>
    <bc-grid-col v-if="config">
      <ui-colors />
      <color-swatches :colors="config.colorSwatches" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import UiColors from '@/components/ui-colors/index.vue'

export default {
  name: 'PageBcColors',
  components: {
    UiColors
  },
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
        this.config.colorSwatches = this.$config.colorSwatches
      })
    }
  }
}
</script>
