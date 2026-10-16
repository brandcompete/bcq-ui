<template>
  <bc-table-layout-cell :class="componentCssClasses" :x-align="xAlign" :style="componentStyle">
    <slot />
  </bc-table-layout-cell>
</template>
<script>
import methods from '../../mixins/methods'
import toolbarComputed from '../toolbar/mixins/computed.js'

export default {
  name: 'BcToolbarIcon',
  mixins: [
    methods,
    toolbarComputed
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('toolbar-icon')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.parentProps.padding
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    }
  },
  props: {
    width: {
      type: String,
      default: '40px'
    },
    xAlign: {
      type: String,
      default: 'center'
    }
  }
}
</script>
