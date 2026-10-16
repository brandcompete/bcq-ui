<template>
  <div :class="componentCssClasses" :inert="inert || readonly" :style="{width}">
    <label :class="['block']">
      <bc-container v-if="$slots['top']">
        <slot name="top" />
      </bc-container>
      <bc-text-field-label v-if="label" :text="label" :class="[`${baseCss}-label`, 'mb-1', 'text-left', labelsCssClasses]" />
      <bc-container :class="wrapperCssClasses">
        <bc-table-layout>
          <bc-table-layout-row>
            <bc-table-layout-cell v-if="iconLeft" :y-align="iconAlign" x-align="center" :class="['p-1']">
              <bc-icon :name="iconLeft" :provider="iconProvider" :class="[`cursor-${iconCursor}`, `${baseCss}-icon-left`]" @click="$emit('icon-left-click', $event.target)" />
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="$slots.left" :y-align="iconAlign">
              <slot name="left" />
            </bc-table-layout-cell>
            <bc-table-layout-cell :class="['w-full', 'p-1']" y-align="middle">
              <component
                @input="$emit('update:value', $event.target.value)"
                @focusin="onFocusIn"
                @focusout="onFocusOut"
                @keyup="$emit('keydown', $event)"
                @keydown="$emit('keyup', $event)"
                ref="input"
                :min="minLength"
                :max="maxLength"
                :spellcheck="spellcheck"
                :is="is"
                :name="name"
                :type="type"
                :pattern="pattern"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :class="['outline-none', `${baseCss}-input`, 'w-full', 'background-none', type === 'number' ? 'text-right' : null]"
                :rows="rows"
                :cols="cols"
                :value="value"
                :readonly="readonly"
                :style="textareaStyle" />
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="$slots.right" :y-align="iconAlign">
              <slot name="right" />
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="type === 'password' && reveal && focus" :y-align="iconAlign" x-align="center" :class="['p-1']">
              <bc-icon :name="iconReveal" :provider="iconProvider" :class="['cursor-pointer']" @mousedown="toggleType('text')" @mouseup="toggleType('password')" />
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="clearable" :y-align="iconAlign" x-align="center" :class="['p-1', !value ? 'disabled' : null]">
              <bc-icon :name="iconClear" :provider="iconProvider" :class="['cursor-pointer']" @click="clearInput" />
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="iconRight" :y-align="iconAlign" x-align="center" :class="['p-1']">
              <bc-icon :name="iconRight" :provider="iconProvider" :class="[`cursor-${iconCursor}`, `${baseCss}-icon-right`]" @click="$emit('icon-right-click', $event.target)" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </bc-container>
      <bc-text-field-label v-if="hint" :text="hint" :class="[`${baseCss}-hint`, 'mt-1', 'text-right', labelsCssClasses]" />
      <bc-container v-if="$slots['bottom']">
        <slot name="bottom" />
      </bc-container>
    </label>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

// @todo: hover classes
// @todo: height should be the same with or without icons
// @todo: min, max and step for type="number"
export default {
  name: 'BcTextField',
  mixins: [
    methods
  ],
  data () {
    return {
      focus: false,
      touched: false,
      baseCss: this.componentBaseCss('text-field')
    }
  },
  computed: {
    is () {
      return this.multiline ? 'textarea' : 'input'
    },
    textareaStyle () {
      if (this.multiline) {
        return {
          resize: this.resize,
          minHeight: this.minHeight,
          fieldSizing: this.autoResize ? 'content' : null
        }
      }
    },
    labelsCssClasses () {
      return ['px-1', 'select-none', this.labelsUppercase ? 'uppercase' : null, this.error ? this.errorCssClass : null]
    },
    wrapperCssClasses () {
      return [
        `border-${this.borderWidth}`,
        this.error ? this.errorCssClass : null,
        `${this.baseCss}-wrapper`, `border-round-${this.roundness}`,
      ]
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.block ? 'block' : ['align-middle', 'inline-block'],
        this.focus ? `opacity-100` : 'opacity-50', 'transition-all',
        this.touched ? this.touchedCssClass : null,
        `text-${this.size}`,
        'transition-duration-300',
        'bc-container'
      ]
    }
  },
  watch: {
    value () {
      this.isValue()
    }
  },
  emits: [
    'update:value',
    'icon-left-click',
    'icon-right-click',
    'focusin',
    'focusout',
    'keyup',
    'keydown'
  ],
  props: {
    autocomplete: {
      // 'on', 'off', custom value
      type: String,
      default: 'on'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autoResize: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: true
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    clearable: {
      type: Boolean,
      default: false
    },
    cols: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCssClass: {
      type: String,
      default: 'bc-text-field-error'
    },
    hint: {
      type: [
        String,
        Number
      ]
    },
    iconAlign: {
      type: String,
      default: 'middle'
    },
    iconClear: {
      type: String,
      default: 'close'
    },
    iconCursor: {
      type: String,
      default: 'default'
    },
    iconLeft: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconReveal: {
      type: String,
      default: 'eye'
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: [
        String,
        Number
      ]
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number
    },
    minHeight: {
      type: String
    },
    minLength: {
      type: Number
    },
    multiline: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    pattern: {
      type: String
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: String,
      default: 'none',
      validator: value => {
        return [
          'both',
          'horizontal',
          'vertical',
          'none'
        ].includes(value)
      }
    },
    reveal: {
      type: Boolean
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    rows: {
      type: Number
    },
    size: {
      type: String,
      default: 'sm'
    },
    spellcheck: {
      type: Boolean,
      default: false
    },
    touchedCssClass: {
      type: String,
      default: 'bc-text-field-touched'
    },
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return [
          'date',
          'datetime-local',
          'email',
          'month',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'time',
          'url',
          'week'
        ].includes(value)
      }
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    width: {
      type: String
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isValue()
    },
    clearInput () {
      this.$emit('update:value', null)
    },
    onFocusIn () {
      this.focus = true
      if (!this.touched) {
        this.touched = true
      }
      this.$emit('focusin', this.$el)
    },
    onFocusOut () {
      if (!this.isValue()) {
        this.focus = false
      }
      this.$emit('focusout', this.$el)
    },
    isValue () {
      if (this.value) {
        return this.focus = true
      }
    },
    toggleType (type) {
      this.$refs.input.setAttribute('type', type)
    }
  }
}
</script>
<style>
.bc-text-field .bc-text-field-wrapper
{
  border-style: solid;
  border-color: var(--text-field-color-light);
  color: var(--text-field-color-light);
}

.bc-app-theme-dark .bc-text-field .bc-text-field-wrapper
{
  border-color: var(--text-field-color-dark);
  color: var(--text-field-color-dark);
}

.bc-text-field .bc-text-field-wrapper.bc-text-field-error
{
  border-color: var(--text-field-color-error);
  color: var(--text-field-color-error);
}

.bc-text-field .bc-text-field-label.bc-text-field-error
{
  color: var(--text-field-color-error);
}

.bc-text-field input[type=number]::-webkit-inner-spin-button,
.bc-text-field input[type=number]::-webkit-outer-spin-button
{
  opacity: 1;
}
</style>
