<template>
  <bc-container display="unset" role="table" :style="style" :class="componentCssClasses">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTableLayout',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('table-layout'),
    }
  },
  computed: {
    style () {
      return {
        width: this.width,
        height: this.height
      }
    },
    componentCssClasses () {
      const xAlign = this.xAlign
      const yAlign = this.yAlign
      return [
        this.baseCss,
        'table-layout',
        xAlign ? `text-${xAlign}` : null,
        yAlign ? `align-${yAlign}` : null,
        this.width ? null : 'w-full',
        this.equalCells ? 'table-layout-fixed' : null,
        this.borderCollapse ? 'table-layout-border-collapse' : 'table-layout-border-separate'
      ]
    }
  },
  props: {
    borderCollapse: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    equalCells: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    yAlign: {
      // 'top', 'middle', 'bottom', 'baseline', 'auto'
      type: String
    },
    xAlign: {
      // 'left', 'center', 'right', 'auto', 'justify'
      type: String
    }
  }
}
</script>
<style>
.bc-table-layout-row
{
  vertical-align: inherit;
}

.bc-table-layout-cell
{
  vertical-align: inherit;
}
</style>
