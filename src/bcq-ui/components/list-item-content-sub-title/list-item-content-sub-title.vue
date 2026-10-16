<template>
  <bc-container :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcListItemContentSubTitle',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list-item-content-sub-title')
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
      default: 'xs'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
}
</script>
