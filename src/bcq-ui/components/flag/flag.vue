<template>
  <bc-container :tag="tag" :to="to" :href="href" :display="block ? 'block' : 'inline-block'" :class="componentCssClasses" :style="componentStyle" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcFlag',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('flag')
    }
  },
  computed: {
    componentStyle () {
      return {
        width: this.width,
        aspectRatio: this.square ? '1/1' : '4/3'
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.square ? 'fis' : null,
        this.block ? null : 'align-middle',
        this.makeElevation(this.elevation),
        `fi-${this.code.toLowerCase()}`,
        'select-none',
        'fi'
      ]
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      required: true
    },
    elevation: {
      type: String,
      default: 'sm'
    },
    href: {
      type: String
    },
    square: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    },
    to: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>
<style>
.bc-flag
{
  background-size: cover !important;
}
</style>
