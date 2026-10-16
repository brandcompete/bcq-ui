<template>
  <div :class="componentCssClasses">
    <slot />
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcGrid',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('grid')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.wrap ? 'flex-wrap': 'flex-nowrap',
        'grid', this.noGutter ? 'grid-nogutter' : null,
        'flex'
      ]
    }
  },
  props: {
    noGutter: {
      type: Boolean,
      default: true
    },
    wrap: {
      type: Boolean,
      default: true
    }
  }
}
</script>
