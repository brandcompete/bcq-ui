<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid :class="['p-1']">
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" v-for="color in getUiColors.filter(color => color !== 'primary')" :class="['p-1']">
            <bc-btn v-ripple block :color="color">{{ getLang.clickToViewRipple }}</bc-btn>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcRipple',
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
