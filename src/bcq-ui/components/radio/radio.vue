<template>
  <li :class="componentCssClasses" role="radio" :inert="inert">
    <label :class="['block', 'cursor-pointer']">
      <input hidden @change="onChange" :class="['hidden']" type="radio" tabindex="-1" :checked="value === parent.value" :name="parent.name" :value="value" />
      <bc-table-layout y-align="middle">
        <bc-table-layout-row>
          <bc-table-layout-cell :class="[`${baseCss}-icon-cell`]" x-align="center">
            <bc-icon :provider="parent.iconProvider" :name="icon" />
          </bc-table-layout-cell>
          <bc-table-layout-cell :class="['p-1', 'pl-0', 'text-left', `${baseCss}-label`]">
            <bc-container :class="labelCssClasses" v-text="label" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </label>
  </li>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcRadio',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('radio')
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    value: {
      type: [
        String,
        Number
      ]
    }
  },
  methods: {
    onChange () {
      this.$parent.$emit('update:value', this.value)
    }
  },
  computed: {
    parent () {
      return this.$parent.$props
    },
    checked () {
      return this.value === this.parent.value
    },
    icon () {
      return this.parent[this.checked ? 'iconChecked' : 'iconUnchecked']
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.parent.vertical ? null : ['inline-block', 'align-middle']
      ]
    },
    labelCssClasses () {
      return [
        'truncate',
        this.parent.labelUppercase ? 'uppercase' : null,
        `font-${this.parent.labelFontWeight}`
      ]
    }
  }
}
</script>
<style>
.bc-radio-icon-cell
{
  width: var(--icon-cell-width);
}

.bc-radio-group .bc-radio label .bc-radio-label
{
  text-align: inherit !important;
}
</style>
