<template>
  <div :class="componentCssClasses" :inert="inert">
    <ul>
      <slot />
    </ul>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcCollapsible',
  mixins: [
    methods
  ],
  data () {
    return {
      name: methods.methods.uuid(),
      baseCss: this.componentBaseCss('collapsible')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        'block',
        'bc-container',
        'overflow-hidden'
      ]
    }
  },
  props: {
    animationSpeed: {
      type: Number,
      default: 200 // 100 - 3000
    },
    contentMaxHeight: {
      type: String
    },
    contentSize: {
      type: String,
      default: 'sm'
    },
    contentPadding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'md'
    },
    headerFontWeight: {
      type: String,
      default: 'semibold'
    },
    headerSize: {
      type: String,
      default: 'sm'
    },
    iconCollapse: {
      type: String,
      default: 'chevron-up'
    },
    iconExpand: {
      type: String,
      default: 'chevron-down'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    inert: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: 'md'
    }
  }
}
</script>
