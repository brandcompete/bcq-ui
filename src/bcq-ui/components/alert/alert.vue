<template>
  <bc-container :class="componentCssClasses" v-if="visible">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell :class="[`${baseCss}-icon-cell`, padding]" v-if="icon" x-align="center">
          <bc-icon :name="icon" :provider="iconProvider" />
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="[padding]" x-align="left">
          <bc-container :class="[!icon || !dismissible ? 'px-1' : null]">
            <slot />
          </bc-container>
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="[`${baseCss}-icon-cell`, padding]" v-if="dismissible" x-align="center">
          <bc-icon :name="dismissIcon" :provider="iconProvider" @click="dismiss" :class="['cursor-pointer']" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcAlert',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('alert')
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
      type: Boolean,
      default: true
    },
    dismissIcon: {
      type: String,
      default: 'close-circle-outline'
    },
    elevation: {
      type: String,
      default: 'md'
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    padding: {
      type: Array,
      default: ['p-1']
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: 'sm'
    },
    unselectable: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'outline'
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.unselectable ? 'select-none' : null,
        `text-${this.size}`,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        `bg-${this.color}-${this.variant}`
      ]
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
.bc-alert .bc-alert-icon-cell
{
  width: var(--icon-cell-width);
}

.bc-alert .bc-alert-icon-cell .bc-icon
{
  font-size: inherit;
}
</style>
