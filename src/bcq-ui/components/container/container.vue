<template>
  <component :is="tag" :class="componentCssClasses">
    <slot />
  </component>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcContainer',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('container')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.display,
        this.truncate ? 'truncate' : null
      ]
    }
  },
  props: {
    display: {
      type: String,
      default: 'block'
    },
    tag: {
      type: String,
      default: 'div'
    },
    truncate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
