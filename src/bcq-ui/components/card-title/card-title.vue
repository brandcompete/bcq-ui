<template>
  <bc-container :tag="tag" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import cardProps from '../card/mixins/props.js'
import cardComputed from '../card/mixins/computed.js'

// @todo color support
export default {
  name: 'BcCardTitle',
  mixins: [
    cardProps,
    methods,
    cardComputed
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('card-title')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.cssClasses,
        this.truncate ? 'truncate' : null,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `font-${this.fontWeight}`,
        `text-${this.fontSize}`
      ]
    }
  },
  props: {
    truncate: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: 'semibold'
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
<style>
.bc-card-title
{
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
