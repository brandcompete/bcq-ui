<template>
  <flat-card :class="[baseCss]" v-if="show.includes(subTitle)" :title="subTitle" :data-anchor="subTitle">
    <bc-grid>
      <bc-grid-col :span="12">
        <bc-grid v-for="modifier in config.modifiers">
          <bc-grid-col :xl="1" :lg="2" :md="3" :sm="4" :xs="6" v-for="swatch in config.swatches" :class="['p-1']">
            <bc-card elevation="none" :title="getLang.copy" :class="['text-center', 'flex', 'flex-column', 'h-full', 'align-content-center', 'justify-content-center']">
              <bc-container @click="copyClass(label(prefix, modifier, swatch).replace('.', ''))" v-for="prefix in config.prefixes" :class="[isSwatchUnsupported(swatch) ? ['opacity-20', 'pointer-events-none'] : 'cursor-pointer']">
                <bc-card-text :class="['truncate']">
                  <bc-icon v-if="isSwatchUnsupported(swatch)" :name="$icons.cancel" />
                  <code-chunk v-else>{{ label(prefix, modifier, swatch) }}</code-chunk>
                </bc-card-text>
                <bc-divider v-if="!isPrefixNegative(prefix) && swatch > 1" />
              </bc-container>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </bc-grid-col>
    </bc-grid>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'UtilityCssClassesSpacing',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'utility-css-classes-spacing',
    }
  },
  props: {
    config: {
      type: Object
    },
    subTitle: {
      type: String
    },
    show: {
      type: Array,
      default: [
        'padding',
        'margin',
        'border'
      ]
    }
  },
  methods: {
    label (prefix, modifier, swatch) {
      return this.isPrefixNegative(prefix) && swatch === 1 ? '' : `.${prefix}${modifier}-${swatch - 1}`
    },
    isPrefixNegative (prefix) {
      return prefix.indexOf('-') > -1
    },
    isSwatchUnsupported (swatch, modifier = 9) {
      return swatch > modifier
    }
  }
}
</script>
