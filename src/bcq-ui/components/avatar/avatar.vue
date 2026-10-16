<template>
  <bc-container :display="block ? 'block' : 'inline-block'" v-aspect-ratio="1/1" :style="style" :class="componentCssClasses">
    <bc-lazy-image v-if="src" :src="src" :width="size" :height="size" />
    <bc-icon v-if="icon" :provider="iconProvider" :name="icon" :style="iconStyle" />
    <slot v-else />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcAvatar',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('avatar')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeFontSize(this.fontSize),
        this.makeFontWeight(this.fontWeight),
        this.makeElevation(this.elevation),
        this.tile ? null : 'border-round-full',
        this.block ? null : ['align-middle'],
        'select-none',
        'text-center',
        'overflow-hidden'
      ]
    },
    style () {
      const size = this.size
      const borderWidth = this.borderWidth
      const src = this.src
      return {
        width: size,
        lineHeight: size,
        outlineOffset: `-${borderWidth}px`,
        // background: src ? `url("${src}") no-repeat center/cover` : null,
        outlineWidth: `${borderWidth}px`
      }
    },
    iconStyle () {
      const lineHeight = this.size
      return {
        lineHeight,
        fontSize: 'inherit',
        verticalAlign: 'unset',
        height: lineHeight
      }
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: 'secondary'
    },
    elevation: {
      type: String,
      default: 'md'
    },
    fontSize: {
      type: String,
      default: 'md'
    },
    fontWeight: {
      type: String,
      default: 'semibold'
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String
    },
    size: {
      type: String,
      default: '48px'
    },
    src: {
      type: String
    },
    tile: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'outline'
    }
  }
}
</script>
