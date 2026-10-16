<template>
  <bc-container :tag="tag" :class="componentCssClasses" :style="componentStyle">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcMultilineEllipsis',
  mixins: [
    methods
  ],
  data () {
    return {
      clamp: null,
      baseCss: this.componentBaseCss('multiline-ellipsis')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'overflow-hidden',
        'white-space-normal',
        'text-overflow-ellipsis'
      ]
    },
    componentStyle () {
      return {
        lineClamp: this.lineClamp
      }
    }
  },
  props: {
    lineClamp: {
      type: Number
    },
    tag: {
      type: String,
      default: 'p'
    }
  }
}
</script>
<style>
.bc-multiline-ellipsis
{
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
}
</style>
