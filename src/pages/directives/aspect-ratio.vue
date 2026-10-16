<template>
  <bc-grid  v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid v-for="(ratio, index) in config.ratios" :key="index">
          <bc-grid-col v-for="item in ratio.items" :span="ratio.span">
            <bc-card v-ripple :class="['h-full', `bg-${ratio.color}-500`, 'text-grey-50']">
              <bc-card-text :class="['text-center']" v-if="ratio.span > 3">
                <code-chunk>v-aspect-ratio</code-chunk>
              </bc-card-text>
              <bc-divider />
              <bc-card-text v-aspect-ratio="ratio.ratio" :class="['flex', 'align-items-center', 'justify-content-center']">
                <code-chunk size="sm">{{ ratio.ratio }}</code-chunk>
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
  name: 'PageBcAspectRatio',
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
