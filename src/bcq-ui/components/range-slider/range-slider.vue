<template>
  <bc-container :data-name="name" :data-range-slider-id="id" :class="componentCssClasses" :inert="inert" :style="componentStyle">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row v-if="label">
        <bc-table-layout-cell v-if="minMaxLabels" :class="minMaxLabelsCssClasses" />
        <bc-table-layout-cell :class="['w-full', 'p-1']">
          <bc-text-field-label :text="label" :class="[`${baseCss}-label`, 'text-left', labelsUppercase ? 'uppercase' : null]" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="minMaxLabels" :class="minMaxLabelsCssClasses" />
      </bc-table-layout-row>
      <bc-table-layout-row>
        <bc-table-layout-cell x-align="right" v-if="minMaxLabels" :class="minMaxLabelsCssClasses" v-text="min" />
        <bc-table-layout-cell :class="['w-full', 'p-1', 'bcq-tooltip-top']" :data-tooltip="makeTooltip">
          <input @input="onInput" :min="min" :max="max" :value="value[0]" :step="step" :name="makeName('top')" :class="[inputSliderCssClasses, `${baseCss}-top-slider`]" type="range" />
          <input @input="onInput" :min="min" :max="max" :value="value[1]" :step="step" :name="makeName('bottom')" :class="[inputSliderCssClasses, `${baseCss}-bottom-slider`]" type="range" :style="bottomSliderStyles" />
          <bc-container :style="rangeStyle" :class="rangeCssClasses" v-if="showSelectedRange" />
        </bc-table-layout-cell>
        <bc-table-layout-cell x-align="left" v-if="minMaxLabels" :class="minMaxLabelsCssClasses" v-text="max" />
      </bc-table-layout-row>
      <bc-table-layout-row v-if="hint">
        <bc-table-layout-cell v-if="minMaxLabels" :class="minMaxLabelsCssClasses" />
        <bc-table-layout-cell :class="['w-full', 'p-1']">
          <bc-text-field-label :text="hint" :class="[`${baseCss}-label`, 'text-right', labelsUppercase ? 'uppercase' : null]" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="minMaxLabels" :class="minMaxLabelsCssClasses" />
      </bc-table-layout-row>
    </bc-table-layout>
    <bc-reactive-style>
    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-runnable-track
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height }}px;
    }

    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-moz-range-track
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height }}px;
    }

    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height * 2 }}px;
      width: {{ height * 2 }}px;
      margin-top: -{{ height / 2 }}px;
    }

    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height * 2 }}px;
      width: {{ height * 2 }}px;
      margin-top: -{{ height / 2 }}px;
    }

    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }} );
    }

    .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }} );
    }

    .bc-app-theme-dark .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }}-dark );
    }

    .bc-app-theme-dark .bc-range-slider[data-range-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }}-dark );
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import sliderProps from '../slider/mixins/sliderProps.js'

export default {
  name: 'BcRangeSlider',
  mixins: [
    methods,
    sliderProps
  ],
  data () {
    return {
      id: `bc-range-slider-${this.uuid()}`,
      baseCss: this.componentBaseCss('range-slider')
    }
  },
  computed: {
    minMaxLabelsCssClasses () {
      return [
        `${this.baseCss}-label-cell`,
        'p-1'
      ]
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.block ? null : 'vertical-align-middle',
        this.disabled && !this.inert ? 'disabled' : null,
        this.makeFontSize(this.fontSize),
        this.tooltip ? `${baseCss}-tooltip` : null,
        'select-none',
        'bc-css-slider'
      ]
    },
    inputSliderCssClasses () {
      return [
        'block',
        'w-full',
        'appearance-none',
        // 'cursor-pointer',
        'outline-none'
      ]
    },
    bottomSliderStyles () {
      return {
        marginTop: `${this.height * -1}px`
      }
    },
    componentStyle () {
      return {
        width: this.width
      }
    },
    getSliders () {
      return this.$el.querySelectorAll('input[type="range"]')
    },
    rangeCssClasses () {
      return [
        this.makeUiColorVariant(this.color, this.variant),
        'relative',
        'border-round-full'
      ]
    },
    rangeStyle () {
      const value = this.value
      const max = this.max
      const min = this.min
      const toPercent = (value) => {
        return ((value - min) / (max - min)) * 100
      }
      const leftOffset = toPercent(value[0])
      const rightOffset = toPercent(value[1])
      const width = Math.abs(rightOffset - leftOffset)
      const height = this.height
      return {
        height: `${height}px`,
        width: `${width}%`,
        marginLeft: leftOffset + '%',
        marginRight: rightOffset + '%',
        marginTop: `${height * -1}px`
      }
    },
    makeTooltip () {
      const value = this.value
      return `${value[0]} / ${value[1]}`
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    value: {
      type: Array,
      default () {
        return [0, 100]
      }
    }
  },
  methods: {
    onInput () {
      const slides = this.getSliders
      let sliderTopValue = parseFloat(slides[0].value)
      let sliderBottomValue = parseFloat(slides[1].value)
      if (sliderTopValue > sliderBottomValue ) {
        const tempValue = sliderBottomValue
        sliderBottomValue = sliderTopValue
        sliderTopValue = tempValue
      }
      this.$emit('update:value', [sliderTopValue, sliderBottomValue])
    },
    makeName (slider = 'top') {
      const name = this.name
      return name ? `${name}-${slider}` : null
    }
  }
}
</script>
<style>
.bc-range-slider input[type="range"]
{
  pointer-events: none;
}

.bc-range-slider:not(.disabled) input[type="range"]::-webkit-slider-thumb
{
  pointer-events: all;
  position: relative;
  z-index: 5;
}

.bc-range-slider:not(.disabled) input[type="range"]::-moz-range-thumb
{
  pointer-events: all;
  position: relative;
  z-index: 5;
}
</style>
