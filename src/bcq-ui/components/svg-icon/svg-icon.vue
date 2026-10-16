<template>
  <svg :class="componentCssClasses" :width="size" :height="size">
    <use :xlink:href="`#${name}`" :stroke="color" :fill="color" />
  </svg>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSvgIcon',
  data () {
    return {
      baseCss: this.componentBaseCss('svg-icon')
    }
  },
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? 'block' : ['inline-block', 'align-middle'],
        'select-none'
      ]
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#000000'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24px'
    }
  }
}
</script>
