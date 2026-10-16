<template>
  <bc-container :data-name="name" :data-slider-id="id" :inert="inert" :display="block ? 'block' : 'inline-block'" :class="componentCssClasses" :style="componentStyle">
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
        <bc-table-layout-cell :class="['w-full', 'p-1', 'bcq-tooltip-top']" :data-tooltip="value">
          <input type="range" :name="name" :min="min" :max="max" :step="step" :value="value" @input="$emit('update:value', parseFloat($event.target.value))" :class="inputSliderCssClasses" />
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
    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-runnable-track
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height }}px;
    }

    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-moz-range-track
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height }}px;
    }

    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height * 2 }}px;
      width: {{ height * 2 }}px;
      margin-top: -{{ height / 2 }}px;
    }

    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      border-radius: {{ rounded ? '9999px' : 0 }};
      height: {{ height * 2 }}px;
      width: {{ height * 2 }}px;
      margin-top: -{{ height / 2 }}px;
    }

    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }} );
    }

    .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }} );
    }

    .bc-app-theme-dark .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-webkit-slider-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }}-dark );
    }

    .bc-app-theme-dark .bc-slider[data-slider-id="{{ id }}"] input[type="range"]::-moz-range-thumb
    {
      background: var(--{{ makeUiColorVariant(color, variant) }}-dark );
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import sliderProps from './mixins/sliderProps.js'

export default {
  name: 'BcSlider',
  mixins: [
    methods,
    sliderProps
  ],
  data () {
    return {
      id: `bc-slider-${this.uuid()}`,
      baseCss: this.componentBaseCss('slider')
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    value: {
      type: [
        Number,
        String
      ],
      default: 0
    }
  },
  computed: {
    rangeStyle () {
      const value = this.value
      const max = this.max
      const min = this.min
      const sliderPercent = (value, min, max) => {
        const percent = ((value - min) / (max - min)) * 100;
        return Math.min(100, Math.max(0, percent));
      }
      const percent = sliderPercent(value, min, max)
      const height = this.height
      return {
        height: `${height}px`,
        width: `${percent}%`,
        marginTop: `${height * -1}px`
      }
    },
    rangeCssClasses () {
      return [
        this.makeUiColorVariant(this.color, this.variant),
        'relative',
        'border-round-full',
        'pointer-events-none'
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
    minMaxLabelsCssClasses () {
      return [
        `${this.baseCss}-label-cell`,
        'p-1'
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    },
    inputSliderCssClasses () {
      return [
        'block',
        'w-full',
        'appearance-none',
        // 'cursor-pointer',
        'outline-none'
      ]
    }
  }
}
</script>
<style>
.bc-slider input[type="range"]
{
  /*pointer-events: none;*/
}

.bc-slider:not(.disabled) input[type="range"]::-webkit-slider-thumb
{
  pointer-events: all;
  position: relative;
  z-index: 5;
}

.bc-slider:not(.disabled) input[type="range"]::-webkit-slider-thumb::before
{
  content: '123'
}

.bc-slider:not(.disabled) input[type="range"]::-moz-range-thumb
{
  pointer-events: all;
  position: relative;
  z-index: 5;
}
</style>
