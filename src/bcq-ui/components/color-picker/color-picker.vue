<template>
  <bc-container :display="block ? 'block' : 'inline-block'" :class="componentCssClasses" :inert="inert">
    <bc-container tag="label" :class="labelWrapperCssClasses">
      <input @input="update" :disabled="disabled" :value="value" type="color" :class="colorInputCssClasses" />
      <bc-container display="inline-block" :class="colorPreviewCssClasses" v-aspect-ratio="1/1" :style="colorPreviewStyle">
        <bc-container display="flex" :class="colorPreviewInnerWrapperCssClasses">
          <bc-icon v-if="icon" :name="icon" :provider="iconProvider" :class="iconCssClasses" />
        </bc-container>
      </bc-container>
      <bc-container v-if="label" display="inline-block" v-text="valueToLowerCase" :class="labelCssClasses" />
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcColorPicker',
  mixins: [
    methods
  ],
  data () {
    return {
      model: null,
      baseCss: this.componentBaseCss('color-picker')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : 'align-middle',
        this.disabled && !this.inert ? 'disabled' : null,
        'select-none',
        'cursor-pointer',
        'align-left'
      ]
    },
    colorInputCssClasses () {
      return [
        'clip-0',
        'absolute',
        'appearance-none'
      ]
    },
    iconCssClasses () {
      return [
        this.makeUiColorVariant(this.iconColor, 'solid'),
        'background-unset'
      ]
    },
    colorPreviewStyle () {
      return {
        minHeight: this.size,
        background: this.value
      }
    },
    labelWrapperCssClasses () {
      return [
        'w-full',
        'whitespace-nowrap',
        'truncate',
        'cursor-pointer',
        'align-left'
      ]
    },
    labelCssClasses () {
      return [
        'align-middle',
        'align-left',
        this.labelPadding,
        this.makeFontSize(this.labelFontSize),
        this.makeFontWeight(this.labelFontWeight)
      ]
    },
    prepareClassName () {
      return this.value.replace('#', '').toLowerCase()
    },
    valueToLowerCase () {
      return this.value.toLowerCase()
    },
    colorPreviewCssClasses () {
      return [
        'align-middle',
        'align-center',
        'transition-all',
        'transition-duration-200',
        this.makeBorderRadius(this.roundness),
        this.makeElevation(this.elevation)
      ]
    },
    colorPreviewInnerWrapperCssClasses () {
      return [
        this.makeFontSize(this.iconSize),
        'h-full',
        'justify-content-center',
        'align-items-center'
      ]
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'sm'
    },
    icon: {
      type: String
    },
    iconColor: {
      type: String,
      default: 'secondary'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconSize: {
      type: String,
      default: 'md'
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: Boolean,
      default: true
    },
    labelFontSize: {
      type: String,
      default: 'sm'
    },
    labelFontWeight: {
      type: String,
      default: 'normal'
    },
    labelPadding: {
      type: Array,
      default: [
        'p-2'
      ]
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: '32px'
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    update ($event) {
      this.$emit('update:value', $event.target.value)
    }
  }
}
</script>
