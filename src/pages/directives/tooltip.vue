<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid>
          <bc-grid-col v-for="tooltip in config.tooltips" :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['text-center', 'p-1']">
            <bc-card elevation="none" v-tooltip="makeTooltipDirective(tooltip)">
              <bc-card-title>{{ getLang.tooltipPosition(tooltip) }}</bc-card-title>
              <bc-divider />
              <bc-card-text>
                <code-chunk>{{ JSON.stringify(makeTooltipDirective(tooltip)) }}</code-chunk>
              </bc-card-text>
            </bc-card>
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
  name: 'PageBcTooltipDirective',
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
    },
    makeTooltipDirective (position) {
      position = position.toLowerCase()
      return {
        position,
        text: `${position} tooltip`
      }
    }
  }
}
</script>
