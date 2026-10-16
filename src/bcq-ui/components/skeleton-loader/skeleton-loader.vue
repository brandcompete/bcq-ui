<template>
  <bc-container :display="block ? 'block' : 'inline-block'" :style="componentStyles" :class="componentCssClasses" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSkeletonLoader',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('skeleton-loader')
    }
  },
  props: {
    animation: {
      type: String,
      default: 'pulse'
    },
    block: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'secondary'
    },
    elevation: {
      type: String,
      default: 'md'
    },
    height: {
      type: String,
      default: '16px'
    },
    roundness: {
      type: String,
      default: 'full'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : ['align-middle'],
        this.makeUiColorVariant(this.color, this.variant),
        this.makeBorderRadius(this.roundness),
        this.makeAnimation(this.animation),
        this.makeElevation(this.elevation),
        'select-none',
        'overflow-hidden'
      ]
    },
    componentStyles () {
      return {
        height: this.height
      }
    }
  },
  methods: {
  }
}
</script>
