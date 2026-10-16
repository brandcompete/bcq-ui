<template>
  <bc-container :class="componentCssClasses" :style="componentStyle">
    <iframe @load="$emit('load', {$event, src: this.src})" :class="['h-full', 'w-full']" :src="src" seamless frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcVid',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('vid')
    }
  },
  computed: {
    componentStyle () {
      return {
        aspectRatio: this.calculateAspectRatio(this.width, this.height)
      }
    },
    componentCssClasses () {
      return [
        this.baseCss
      ]
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 560
    },
    height: {
      type: Number,
      default: 314
    }
  }
}
</script>
