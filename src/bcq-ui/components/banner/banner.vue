<template>
  <bc-container :class="componentCssClasses" v-if="visible">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell full-width :x-align="xAlign">
          <slot />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="dismissible" x-align="center" :class="[`${baseCss}-icon-cell`, padding]">
          <bc-icon @click="dismiss" :name="dismissIcon" :provider="iconProvider" :class="['cursor-pointer']" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBanner',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('banner')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.padding,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontSize(this.size)
      ]
    }
  },
  emits: [
    'update:visible'
  ],
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    dismissible: {
      type: Boolean
    },
    dismissIcon: {
      type: String,
      default: 'close'
    },
    elevation: {
      type: String,
      default: 'none'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    padding: {
      type: Array,
      default () {
        return [
          'p-2'
        ]
      }
    },
    roundness: {
      type: String,
      default: 'none'
    },
    size: {
      type: String,
      default: 'lg'
    },
    variant: {
      type: String,
      default: 'solid'
    },
    visible: {
      type: Boolean
    },
    xAlign: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    dismiss () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style>
.bc-banner .bc-banner-icon-cell
{
  width: var(--icon-cell-width);
}
</style>
