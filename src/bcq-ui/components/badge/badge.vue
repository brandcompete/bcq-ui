<template>
  <bc-container display="inline-block" :class="componentCssClasses">
    <bc-container display="inline-block" :class="[visible ? 'relative' : null]">
      <bc-container v-if="visible" display="flex" :class="valueCssClasses">
        <span v-if="!icon" v-text="getValue" :class="['h-full', makeFontWeight(this.fontWeight)]" />
        <bc-icon v-else :name="icon" :provider="iconProvider" />
      </bc-container>
      <slot />
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBadge',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('badge')
    }
  },
  emits: [
    'update:visible'
  ],
  computed: {
    getValue () {
      return this.value.toString()
    },
    componentCssClasses () {
      return [
        this.baseCss
      ]
    },
    placementCssClasses () {
      const placement = this.placement
      const offset = this.offset
      return placement.split('-')
        .map(item => {
          return item
        })
        .map(item => {
          return `${item}-0`
        })
        .concat([placement.indexOf('top') > -1 ? `-mt-${offset}` : `-mb-${offset}`])
        .concat([placement.indexOf('right') > -1 ? `-mr-${offset}` : `-ml-${offset}`])
    },
    valueCssClasses () {
      const baseCss = this.baseCss
      return [
        `${baseCss}-value`,
        `${baseCss}-${this.placement}`,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeBorderRadius(this.roundness),
        this.placementCssClasses,
        'absolute',
        'text-xs',
        'justify-content-center',
        'align-content-center',
        'select-none',
        'pointer-events-none'
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'danger'
    },
    fontWeight: {
      type: String,
      default: 'bold'
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    offset: {
      type: Number,
      default: 2
    },
    placement: {
      type: String,
      default: 'top-right',
      validator: value => {
        return [
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right'
        ].includes(value)
      }
    },
    roundness: {
      type: String,
      default: 'full'
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    variant: {
      type: String,
      default: 'solid'
    },
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style>
.bc-badge .bc-badge-value
{
  min-width: 20px;
  line-height: 20px;
  z-index: 10;
}

.bc-badge .bc-badge-value span
{
  padding: 0 3px;
}

.bc-badge .bc-badge-value .bc-icon
{
  font-size: 13px !important;
  line-height: inherit !important;
}
</style>
