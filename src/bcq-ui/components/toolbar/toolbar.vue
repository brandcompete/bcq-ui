<template>
  <div :class="componentCssClasses" :inert="inert">
    <bc-table-layout y-align="middle" x-align="left" :style="componentStyle">
      <bc-table-layout-row>
        <slot />
      </bc-table-layout-row>
    </bc-table-layout>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcToolbar',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('toolbar')
    }
  },
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'md'
    },
    height: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default () {
        return ['py-1', 'px-2']
      }
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: 'md'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontSize(this.size),
        this.disabled && !this.inert ? 'disabled' : null,
        'select-none',
        'bc-container'
      ]
    },
    componentStyle () {
      return {
        height: this.height
      }
    }
  }
}
</script>
<style>
.bc-toolbar .bc-toolbar-icon + .bc-toolbar-title,
.bc-toolbar .bc-toolbar-title + .bc-toolbar-actions
{
  padding-left: 0;
}
</style>
