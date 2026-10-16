<template>
  <bc-table-layout-cell :class="componentCssClasses">
    <slot />
  </bc-table-layout-cell>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcListItemContent',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list-item-content')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.padding,
        'w-full'
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
