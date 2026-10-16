<template>
  <div :class="componentCssClasses" :inert="inert" :style="componentStyle">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row v-if="label">
        <bc-table-layout-cell v-if="iconLeft" />
        <bc-table-layout-cell :class="['w-full']">
          <bc-text-field-label :text="label"  :class="[`${baseCss}-label`, 'mb-1', 'text-left', labelsCssClasses]" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="iconRight" />
      </bc-table-layout-row>
      <bc-table-layout-row>
        <bc-table-layout-cell v-if="iconLeft" x-align="center" :class="iconCellCssClasses">
          <bc-icon :provider="iconProvider" :name="iconLeft" :class="[`cursor-${iconCursor}`, `${baseCss}-icon-left`]" @click="$emit('icon-left-click', $event.target)" />
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="['w-full']">
          <bc-container :style="trackStyle" :class="trackCssClasses">
            <bc-container :class="progressCssClasses" :style="progressStyle" />
          </bc-container>
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="iconRight" x-align="center" :class="iconCellCssClasses">
          <bc-icon :provider="iconProvider" :name="iconRight" :class="[`cursor-${iconCursor}`, `${baseCss}-icon-right`]" @click="$emit('icon-right-click', $event.target)" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
      <bc-table-layout-row v-if="hint">
        <bc-table-layout-cell v-if="iconLeft" />
        <bc-table-layout-cell :class="['w-full']">
          <bc-text-field-label :text="hint" :class="[`${baseCss}-hint`, 'mt-1', 'text-right', labelsCssClasses]" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="iconRight" />
      </bc-table-layout-row>
    </bc-table-layout>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcProgressbar',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('progressbar')
    }
  },
  emits: [
    'update:value',
    'icon-left-click',
    'icon-right-click'
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    comparator: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'none'
    },
    height: {
      type: String,
      default: '8px'
    },
    hint: {
      type: String
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
    iconRight: {
      type: String
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    percentageToFixed: {
      type: Number,
      default: 0
    },
    progressColor: {
      type: String,
      default: 'secondary'
    },
    reversed: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: 'full'
    },
    size: {
      type: String,
      default: 'sm'
    },
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: Number,
      default: 0
    },
    width: {
      type: String
    }
  },
  computed: {
    getPercentage () {
      return `${(100 * this.value / this.comparator).toFixed(this.percentageToFixed)}%`
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.indeterminate ? `${baseCss}-indeterminate` : null,
        this.block ? 'block' : ['align-middle', 'inline-block'],
        `text-${this.size}`,
        'cursor-default',
        'select-none'
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    },
    iconCellCssClasses () {
      return [
        `${this.baseCss}-icon-cell`,
        'p-1'
      ]
    },
    labelsCssClasses () {
      return [
        this.labelsUppercase ? 'uppercase' : null,
        'select-none'
      ]
    },
    trackCssClasses () {
      const baseCss = this.baseCss
      return [
        `${baseCss}-track`,
        this.reversed ? `${baseCss}-track-reversed` : null,
        `border-round-${this.roundness}`,
        `shadow-${this.elevation}`,
        'overflow-hidden'
      ]
    },
    progressCssClasses () {
      return [
        `${this.baseCss}-progress`,
        `bg-${this.progressColor}-solid`,
        `border-round-${this.roundness}`,
        'transition-all',
        'transition-duration-300',
        'transition-ease-out'
      ]
    },
    trackStyle () {
      return {
        height: this.height
      }
    },
    progressStyle () {
      return {
        width: this.getPercentage,
        height: this.height
      }
    }
  }
}
</script>
<style>
.bc-progressbar .bc-progressbar-icon-cell
{
  min-width: var(--icon-cell-width);
}

.bc-progressbar .bc-progressbar-track
{
  background: var(--progressbar-track-light);
}

.bc-app-theme-dark .bc-progressbar .bc-progressbar-track
{
  background: var(--progressbar-track-dark);
}

.bc-progressbar.bc-progressbar-indeterminate .bc-progressbar-track .bc-progressbar-progress
{
  animation: indeterminate 1s linear infinite;
}

.bc-progressbar .bc-progressbar-track.bc-progressbar-track-reversed
{
  transform: scale(-1);
}

@keyframes indeterminate
{
  0%
  {
    width: 0;
    opacity: 1;
  }

  100%
  {
    width: 100%;
    opacity: 0;
  }
}
</style>
