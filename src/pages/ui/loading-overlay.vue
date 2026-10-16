<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <toolbar :divider="false" :margin="[]" :class="['pt-2', 'px-2']">
          <bc-btn block roundness="sm" @click="toggleLoadingOverlay" :loading="loading" :icon-left="$icons.reload" :title="getLang.showLoadingOverlay(config.visibilityTimeout)" color="discovery">{{ getLang.showLoadingOverlay(config.visibilityTimeout) }}</bc-btn>
        </toolbar>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcLoadingOverlay',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      loading: false,
      config: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    toggleLoadingOverlay () {
      this.showLoadingOverlay()
      this.loading = true
      this.sleep(this.config.visibilityTimeout * 1000).then(() => {
        this.hideLoadingOverlay()
        this.loading = false
      })
    },
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
