<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <bc-card elevation="none">
          <bc-card-text>
            <bc-empty :icon="config.icon" :divider="config.divider" :title="config.title" :sub-title="config.subTitle">
              <bc-lorem-ipsum :class="['mt-1']" />
            </bc-empty>
          </bc-card-text>
        </bc-card>
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
  name: 'PageBcEmpty',
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
