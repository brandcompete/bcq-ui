<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-card v-resize="onResize">
          <bc-card-text x-align="center" :padding="['p-3']">
            <code-chunk>viewport: {{ JSON.stringify(config.viewport) }}</code-chunk>
          </bc-card-text>
        </bc-card>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcResize',
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
        data.config.viewport = this.viewport()
        this.config = data.config
      })
    },
    onResize ($event) {
      if ($event) {
        const viewport = this.viewport()
        this.config.viewport = viewport
        this.log('@resize', 'v-resize', $event, 'viewport:', viewport)
      }
    }
  }
}
</script>
