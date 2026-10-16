<template>
  <label role="checkbox" :class="componentClasses" :inert="inert">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell :class="[`${baseCss}-icon-cell`, 'p-1']" x-align="center">
          <bc-icon :provider="iconProvider" :name="icons" />
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="['p-1', 'pl-0', label ? null : ['pointer-events-none', 'invisible']]">
          <bc-container :class="labelCssClasses" v-text="label" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
    <input type="checkbox" tabindex="-1" :aria-checked="checked" @change="onChange" :checked="checked" :class="['hidden']" :indeterminate="indeterminate" :name="name" :id="id" />
  </label>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcCheckbox',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('checkbox'),
    }
  },
  emits: [
    'update:checked',
    'update:indeterminate'
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    iconChecked: {
      type: String,
      default: 'checkbox-marked-outline'
    },
    iconIndeterminate: {
      type: String,
      default: 'checkbox-intermediate'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconUnchecked: {
      type: String,
      default: 'checkbox-blank-outline'
    },
    id: {
      type: String
    },
    indeterminate: {
      type: Boolean
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelFontWeight: {
      type: String,
      default: 'normal'
    },
    labelUppercase: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    size: {
      type: String,
      default: 'sm'
    }
  },
  computed: {
    componentClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.block ? 'block' : ['inline-block', 'align-middle'],
        `text-${this.size}`,
        'select-none',
        'cursor-pointer',
      ]
    },
    icons () {
      return this.indeterminate ? this.iconIndeterminate : this.checked ? this.iconChecked : this.iconUnchecked
    },
    labelCssClasses () {
      return [
        this.labelUppercase ? 'uppercase' : null,
        'truncate',
        'text-left',
        `font-${this.labelFontWeight}`
      ]
    }
  },
  methods: {
    onChange () {
      this.$emit('update:indeterminate', false)
      this.$emit('update:checked', !this.checked)
    }
  }
}
</script>
<style>
.bc-checkbox-icon-cell
{
  width: var(--icon-cell-width);
}
</style>
