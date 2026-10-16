<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid>
          <bc-grid-col :xl="3" :lg="3" :md="3" :sm="3" :xs="6" :class="['p-1']" v-for="icon in config.icons">
            <bc-card elevation="none">
              <bc-card-text x-align="center">
                <bc-svg-icon :name="icon" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
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
  name: 'PageBcSvgIcon',
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
