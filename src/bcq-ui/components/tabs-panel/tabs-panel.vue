<template>
  <div :class="componentCssClasses" role="tabpanel">
    <slot />
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTabsPanel',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('tabs-panel')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'hidden',
        'bc-container'
      ]
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    icon: {
      type: String
    },
    label: {
      type: String
    }
  }
}
</script>
