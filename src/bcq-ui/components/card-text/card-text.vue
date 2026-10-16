<template>
  <bc-container :tag="tag" :style="styles" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import cardProps from '../card/mixins/props.js'
import cardComputed from '../card/mixins/computed.js'

export default {
  name: 'BcCardText',
  mixins: [
    methods,
    cardProps,
    cardComputed
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('card-text')
    }
  },
  computed: {
    styles () {
      return {
        height: this.height
      }
    },
    componentCssClasses () {
      const overflow = this.overflow
      return [
        this.cssClasses,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `text-${this.fontSize}`,
        overflow ? `overflow-${overflow}` : null
      ]
    }
  },
  props: {
    height: {
      type: String
    },
    overflow: {
      type: String
    },
    color: {
      type: String,
      default: 'none'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  }
}
</script>
