<template>
  <bc-container :class="componentCssClasses">
    <bc-icon v-if="icon" :name="icon" :provider="iconProvider" :class="['mb-1']" />
    <bc-heading v-if="title" :font-size="titleFontSize" :font-weight="fontWeight" :divider="false">{{ title }}</bc-heading>
    <bc-divider v-if="divider" :class="['my-1']" />
    <bc-heading v-if="subTitle" :font-size="subTitleFontSize" :font-weight="fontWeight" :divider="false">{{ subTitle }}</bc-heading>
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcEmpty',
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.grayscale ? 'grayscale' : null,
        this.makeFontSize(this.iconSize),
        this.makeOpacity(this.opacity),
        'text-center',
        'select-none'
      ]
    }
  },
  data () {
    return {
      baseCss: this.componentBaseCss('empty')
    }
  },
  props: {
    divider: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    grayscale: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconSize: {
      type: String,
      default: '2xl'
    },
    opacity: {
      type: Number,
      default: 50
    },
    subTitle: {
      type: String
    },
    subTitleFontSize: {
      type: String,
      default: 'md'
    },
    title: {
      type: String
    },
    titleFontSize: {
      type: String,
      default: 'xl'
    }
  }
}
</script>
