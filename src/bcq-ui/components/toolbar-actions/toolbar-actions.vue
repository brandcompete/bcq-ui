<template>
  <bc-table-layout-cell :class="componentCssClasses" :x-align="xAlign">
    <slot />
  </bc-table-layout-cell>
</template>
<script>
import methods from '../../mixins/methods'
import toolbarComputed from '../toolbar/mixins/computed.js'

export default {
  name: 'BcToolbarActions',
  mixins: [
    methods,
    toolbarComputed
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('toolbar-actions')
    }
  },
  props: {
    xAlign: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.parentProps.padding
      ]
    }
  }
}
</script>
