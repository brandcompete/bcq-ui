<template>
  <div role="radiogroup" :class="componentCssClasses" :inert="inert">
    <ul :class="[`text-${xAlign}`]">
      <slot />
    </ul>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcRadioGroup',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('radio-group')
    }
  },
  emits: [
    'update:value'
  ],
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? 'block' : ['inline-block', 'align-middle'],
        this.disabled && !this.inert ? 'disabled' : null,
        `text-${this.size}`,
        'bc-container'
      ]
    }
  },
  props: {
    block: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelFontWeight: {
      type: String,
      default: 'normal'
    },
    labelUppercase: {
      type: Boolean,
      default: false
    },
    iconChecked: {
      type: String,
      default: 'radiobox-marked'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconUnchecked: {
      type: String,
      default: 'radiobox-blank'
    },
    inert: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'sm'
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    vertical: {
      type: Boolean,
      default: true
    },
    xAlign: {
      type: String,
      default: 'left'
    }
  }
}
</script>
