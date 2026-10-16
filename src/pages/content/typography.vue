<template>
  <bc-grid>
    <bc-grid-col v-if="config">
      <typography-treatments v-for="(swatches, type) in config.scalesAndWeights" :key="type" :type="type" :swatches="swatches" />
      <template v-for="item in Object.keys(config.classes)">
        <utility-css-classes-others :config="config.classes[item]" :sub-title="item" />
      </template>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import TypographyTreatments from '../../components/typography-treatments/index.vue'

// @todo: add anything useful from typography.css
// @todo use grid and card
export default {
  name: 'PageBcTypography',
  components: {
    TypographyTreatments
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
        data.config.scalesAndWeights.scales.items = this.copyShallow(this.getSizes).reverse()
        data.config.scalesAndWeights.weights.items = this.getWeights
        this.config = data.config
      })
    }
  }
}
</script>
