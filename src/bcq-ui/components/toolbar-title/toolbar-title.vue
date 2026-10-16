<template>
  <bc-table-layout-cell :class="componentCssClasses" :x-align="xAlign">
    <slot />
  </bc-table-layout-cell>
</template>
<script>
import methods from '../../mixins/methods'
import toolbarComputed from '../toolbar/mixins/computed.js'

export default {
  name: 'BcToolbarTitle',
  mixins: [
    methods,
    toolbarComputed
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('toolbar-title')
    }
  },
  props: {
    fontWeight: {
      type: String,
      default: 'semibold'
    },
    width: {
      type: String,
      default: 'w-full'
    },
    xAlign: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.width,
        this.parentProps.padding,
        this.makeFontWeight(this.fontWeight)
      ]
    }
  }
}
</script>
