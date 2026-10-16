<template>
  <bc-container :class="componentCssClasses" :style="style">
    <bc-icon :name="icon" :provider="iconProvider" :class="spinnerCssClasses" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcLoadingOverlay',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('loading-overlay')
    }
  },
  computed: {
    style () {
      return {
        zIndex: this.zIndex
      }
    },
    spinnerCssClasses () {
      return [
        'animate-spin',
        'line-height-screen'
      ]
    },
    componentCssClasses () {
      return [
        this.baseCss,
        'fixed',
        'top-0',
        'right-0',
        'bottom-0',
        'w-screen',
        'h-screen',
        'left-0',
        'select-none',
        'cursor-wait',
        'text-center',
        this.makeFontSize(this.size),
        this.visible ? null : ['invisible', 'pointer-events-none']
      ]
    }
  },
  emits: [
    'update:visible'
  ],
  props: {
    icon: {
      type: String,
      default: 'loading'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    size: {
      type: String,
      default: '3xl'
    },
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1100
    }
  }
}
</script>
<style>
.bc-loading-overlay
{
  background: var(--semi-transparent-light);
}

.bc-app-theme-dark .bc-loading-overlay
{
  background: var(--semi-transparent-dark);
}

.bc-loading-overlay .bc-icon
{
  font-size: inherit;
}
</style>
