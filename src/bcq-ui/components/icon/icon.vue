<template>
  <component :is="tag" :class="componentCssClasses" :style="style" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcIcon',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('icon')
    }
  },
  computed: {
    componentCssClasses () {
      const provider = this.provider
      return [
        this.baseCss,
        provider,
        `${provider}-${this.name}`,
        'select-none',
        'line-height-1',
        'align-middle',
        'inline-block',
        'outline-none'
      ]
    },
    style () {
      const size = this.size
      return {
        fontSize: `${size}em`
      }
    }
  },
  props: {
    name: {
      type: String,
      default: 'home'
    },
    provider: {
      type: String,
      default: 'mdi'
    },
    size: {
      type: [
        Number,
        String
      ],
      default: 1.5
    },
    tag: {
      type: String,
      default: 'i'
    }
  }
}
</script>
