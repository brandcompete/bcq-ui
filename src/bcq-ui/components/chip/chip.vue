<template>
  <bc-container v-if="visible" :tag="tag" :inert="inert" :display="block ? 'block' : 'inline-block'" :class="componentCssClasses" :style="componentStyle">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell v-if="icon" :class="[`${baseCss}-icon-cell`, padding]" x-align="center">
          <bc-icon :name="icon" :provider="iconProvider" />
        </bc-table-layout-cell>
        <bc-table-layout-cell x-align="center" :class="[icon ? null : 'pl-3', dismissible ? null : 'pr-3', 'w-full', !icon && !dismissible ? 'py-1' : null]">
          <div :class="['truncate', width ? ['w-11', 'm-auto'] : null]">
            <slot />
          </div>
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="dismissible" :class="[`${baseCss}-icon-cell`, padding]" x-align="center">
          <bc-icon :name="dismissIcon" :provider="iconProvider" @click="$emit('update:visible', false)" :class="['cursor-pointer']" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcChip',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('chip')
    }
  },
  emits: [
    'update:visible'
  ],
  computed: {
    componentStyle () {
      return {
        width: this.width
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : 'align-middle',
        this.uppercase ? 'uppercase' : null,
        this.disabled && !this.inert ? 'disabled' : null,
        this.clickable ? ['cursor-pointer'] : ['cursor-default'],
        this.makeFontSize(this.fontSize),
        this.makeBorderRadius(this.roundness),
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeFontWeight(this.fontWeight),
        'overflow-hidden',
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
      default: 'primary'
    },
    clickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dismissIcon: {
      type: String,
      default: 'close-circle'
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: 'sm'
    },
    fontSize: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    inert: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    roundness: {
      type: String,
      default: 'full'
    },
    tag: {
      type: String,
      default: 'div'
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'solid'
    },
    visible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String
    }
  }
}
</script>
<style>
.bc-chip .bc-chip-icon-cell
{
  min-width: var(--icon-cell-width);
}

.bc-chip .bc-chip-icon-cell .bc-icon
{
  font-size: inherit;
}
</style>
