<template>
  <bc-container :tag="tag" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import cardProps from '../card/mixins/props.js'
import cardComputed from '../card/mixins/computed.js'

export default {
  name: 'BcCardActions',
  mixins: [
    cardProps,
    methods,
    cardComputed
  ],
  props: {
    color: {
      type: String,
      default: 'none'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.cssClasses,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `text-${this.fontSize}`,
        'select-none'
      ]
    }
  },
  data () {
    return {
      baseCss: this.componentBaseCss('card-actions')
    }
  }
}
</script>
<style>
.bc-card-actions
{
  border-radius: inherit;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
