<template>
  <bc-container :class="componentCssClasses" v-aspect-ratio="aspectRatio" :href="href" :tag="tag" :to="to" :style="componentStyle">
    <bc-container v-aspect-ratio="aspectRatio" :class="innerWrapperCssClasses" :style="innerWrapperStyles">
      <bc-container v-aspect-ratio="aspectRatio" :style="ambienceStyles" :class="ambienceClasses" />
      <bc-lazy-image
        @load="$emit('load', $event)"
        @error="$emit('error', $event)"
        :class="lazyImageCssClasses"
        :aspect-ratio="aspectRatio"
        :background-size="backgroundSize"
        :error-icon="errorIcon"
        :height="height"
        :loading-icon="loadingIcon"
        :icons-size="iconsSize"
        :options="options"
        :icons-provider="iconsProvider"
        :src="src" />
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcAmbientImage',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('ambient-image')
    }
  },
  computed: {
    lazyImageCssClasses () {
      return [
        this.makeBorderRadius(this.roundness),
        'relative'
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.makeBorderRadius(this.roundness)
      ]
    },
    innerWrapperCssClasses () {
      return [
        'relative'
      ]
    },
    innerWrapperStyles () {
      return {
        padding: `${this.spread}px`
      }
    },
    ambienceClasses () {
      return [
        'top-0',
        'right-0',
        'bottom-0',
        'left-0',
        'absolute'
      ]
    },
    ambienceStyles () {
      return {
        filter: `blur(${this.blur}px) opacity(${this.opacity})`,
        background: `url("${this.src}") no-repeat center/${this.backgroundSize}`
      }
    }
  },
  props: {
    aspectRatio: {
      type: String,
      default: '4/3'
    },
    backgroundSize: {
      type: String,
      default: 'cover'
    },
    block: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Number,
      default: 14
    },
    errorIcon: {
      type: String,
      default: 'image-broken-variant'
    },
    height: {
      type: String
    },
    href: {
      type: String
    },
    loadingIcon: {
      type: String,
      default: 'loading'
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    iconsSize: {
      default: '3xl'
    },
    opacity: {
      type: Number,
      default: 0.9
    },
    options: {
      type: Object,
      default () {
        return {
          root: null,
          rootMargin: '0px',
          scrollMargin: '0px',
          threshold: 1
        }
      }
    },
    roundness: {
      type: String,
      default: 'xl'
    },
    spread: {
      type: Number,
      default: 14
    },
    src: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'figure'
    },
    to: {
      type: String
    },
    width: {
      type: String
    }
  }
}
</script>
