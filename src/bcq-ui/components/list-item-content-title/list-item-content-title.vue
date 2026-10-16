<template>
  <bc-container :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcListItemContentTitle',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list-item-content-title')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.makeFontSize(this.fontSize),
        this.makeFontWeight(this.fontWeight),
        this.truncate ? 'truncate' : null
      ]
    }
  },
  props: {
    fontSize: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'semibold'
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
}
</script>
