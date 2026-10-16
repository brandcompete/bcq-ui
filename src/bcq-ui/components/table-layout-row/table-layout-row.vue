<template>
  <bc-container display="unset" role="row" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTableLayoutRow',
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'table-layout-row'
      ]
    }
  },
  data () {
    return {
      baseCss: this.componentBaseCss('table-layout-row'),
    }
  }
}
</script>
