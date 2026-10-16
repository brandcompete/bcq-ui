<template>
  <bc-container display="unset" role="cell" :style="style" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTableLayoutCell',
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss('table-layout-cell'),
    }
  },
  computed: {
    componentCssClasses () {
      const xAlign = this.xAlign
      const yAlign = this.yAlign
      return [
        this.baseCss, 'table-layout-cell',
        xAlign ? `text-${xAlign}` : null,
        yAlign ? `vertical-align-${yAlign}` : null,
        this.fullWidth ? 'w-full' : null
      ]
    },
    style () {
      return {
        width: this.width
      }
    }
  },
  props: {
    xAlign: {
      // 'left', 'center', 'right', 'auto', 'justify'
      type: String
    },
    yAlign: {
      // 'top', 'middle', 'bottom', 'baseline', 'auto'
      type: String
    },
    fullWidth: {
      type: Boolean
    },
    width: {
      type: String
    }
  }
}
</script>
