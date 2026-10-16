<template>
  <label role="checkbox" :inert="inert" :class="componentCssClasses">
    <div :class="['bc-container']">
      <input type="checkbox" tabindex="-1" :aria-checked="checked" @change="onChange" :checked="checked" :class="['hidden']" :name="name" />
      <div :class="switcherWrapperCssClasses">
        <div :class="switcherThumbCssClasses" />
      </div>
      <div :class="labelCssClasses" v-text="label || '&nbsp;'" />
    </div>
  </label>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSwitcher',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('switcher')
    }
  },
  emits: [
    'update:checked'
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    labelFontWeight: {
      type: String,
      default: 'normal'
    },
    labelFontSize: {
      type: String,
      default: 'sm'
    },
    labelTruncate: {
      type: Boolean,
      default: false
    },
    labelUppercase: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.block ? 'block' : ['inline-block', 'align-middle'],
        'select-none',
        'cursor-pointer',
        'bc-container'
      ]
    },
    labelCssClasses () {
      return [
        this.labelTruncate ? 'truncate' : null,
        this.labelUppercase ? 'uppercase' : null,
        this.label ? null : ['opacity-50', 'pointer-events-none'],
        `font-${this.labelFontWeight}`,
        `text-${this.labelFontSize}`,
        'pl-2',
        'align-middle',
        'inline-block',
        'bc-container'
      ]
    },
    switcherWrapperCssClasses () {
      return [
        `${this.baseCss}-switcher`,
        'align-middle',
        'inline-block',
        'border-round-full',
        'transition-all',
        'transition-duration-300',
        'bc-container'
      ]
    },
    switcherThumbCssClasses () {
      return [
        `${this.baseCss}-switcher-pointer`,
        'border-round-full',
        'transition-all',
        'transition-duration-300',
        'bc-container'
      ]
    }
  },
  methods: {
    onChange () {
      this.$emit('update:checked', !this.checked)
    }
  }
}
</script>
<style>
.bc-switcher input + .bc-container
{
  min-width: var(--icon-cell-width);
  max-width: var(--icon-cell-width);
  outline: none;
  opacity: .5;
  filter: grayscale(100%);
  height: 19.5px;
}

.bc-switcher input:checked + .bc-container
{
  opacity: 1;
  filter: none;
}

.bc-switcher input + .bc-container .bc-container
{
  margin: 2px;
  height: 15px;
  width: 15px;
}

.bc-switcher input:checked + .bc-container .bc-container
{
  margin-left: calc(100% - 17px);
}

.bc-switcher .bc-switcher-switcher
{
  background: var(--text-field-color-light);
}

.bc-switcher .bc-switcher-switcher .bc-switcher-switcher-pointer
{
  background: var(--text-field-color-dark);
}

.bc-app-theme-dark .bc-switcher-switcher
{
  background: var(--text-field-color-dark);
}

.bc-app-theme-dark .bc-switcher .bc-switcher-switcher .bc-switcher-switcher-pointer
{
  background: var(--text-field-color-light);
}
</style>
