<template>
  <flat-card :title="getLang[type] || type" :class="[baseCss]">
    <bc-grid :data-anchor="type">
      <bc-grid-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" v-for="(item, index) in swatches.items" :class="['p-2']">
        <bc-card :class="['h-full']" elevation="none">
          <bc-card-text :class="['flex', 'h-full', 'align-items-center', 'justify-content-center']">
            <bc-container :class="[makeCssClass(item), 'word-break-all', 'text-center']">.{{ makeCssClass(item) }}</bc-container>
          </bc-card-text>
        </bc-card>
      </bc-grid-col>
    </bc-grid>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'TypographyTreatments',
  mixins: [
    methods,
    computed
  ],
  props: {
    type: {
      type: String,
      required: true
    },
    swatches: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      baseCss: 'typography-treatments',
    }
  },
  methods: {
    makeCssClass (swatch) {
      const prefix = this.swatches.prefix
      return `${prefix ? prefix + '-' : ''}${swatch}`
    }
  }
}
</script>
