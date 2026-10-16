<template>
  <bc-container v-aspect-ratio="1/1" :display="display" tag="kbd" :class="componentCssClasses" v-text="value" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcKbd',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('kbd')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.padding,
        this.makeFontSize(this.size),
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontWeight(this.fontWeight),
        'kbd',
        'select-none',
        'justify-content-center', 'align-items-center',
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    display: {
      type: String,
      default: 'flex'
    },
    elevation: {
      type: String,
      default: 'none'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    padding: {
      type: Array,
      default () {
        return [
          'p-1'
        ]
      }
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: 'sm'
    },
    value: {
      type: [
        String,
        Number
      ],
      required: true
    },
    variant: {
      type: String,
      default: 'outline'
    }
  }
}
</script>
<style>
.bc-kbd
{
  /*min-width: 29px;*/
}
</style>
