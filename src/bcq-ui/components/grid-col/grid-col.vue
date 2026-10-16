<template>
  <div :class="componentCssClasses" :style="style">
    <slot />
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcGridCol',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('grid-col')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.fixed ? 'col-fixed': null,
        this.responsiveColumns,
        `${this.span ? 'col-' + this.span : 'col'}`,
        `col-offset-${this.offset}`,
        'bc-container'
      ]
    },
    style () {
      return {
        width: this.width
      }
    },
    responsiveColumns () {
      const swatches = ['xs', 'sm', 'md', 'lg', 'xl']
      const columns = []
      swatches.forEach(swatch => {
        const value = this[swatch]
        if (value) {
          columns.push(`${swatch}:col${value ? '-' + value : ''}`)
        }
      })
      return columns
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0,
      validator: value => {
        return value >= 0 && value <= 12
      }
    },
    span: {
      type: [
        String,
        Number
      ],
      validator: value => {
        return value >= 0 && value <= 12
      }
    },
    width: {
      type: String
    },
    xs: {
      type: Number
    },
    sm: {
      type: Number
    },
    md: {
      type: Number
    },
    lg: {
      type: Number
    },
    xl: {
      type: Number
    }
  }
}
</script>
