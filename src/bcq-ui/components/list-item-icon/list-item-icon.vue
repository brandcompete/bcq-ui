<template>
  <bc-table-layout-cell x-align="center" :class="componentCssClasses">
    <slot />
  </bc-table-layout-cell>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcListItemIcon',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list-item-icon')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.padding
      ]
    }
  },
  props: {
    padding: {
      type: Array,
      default () {
        return ['p-1']
      }
    }
  }
}
</script>
<style>
.bc-list-item-icon
{
  min-width: var(--icon-cell-width);
}
</style>
