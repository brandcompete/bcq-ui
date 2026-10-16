<template>
  <bc-card :class="componentCssClasses" :border-width="borderWidth" :roundness="roundness" :tag="tag" :to="to" :href="href" :elevation="elevation">
    <bc-card-text :padding="[]">
      <bc-container :class="innerWrapperCssClasses">
        <template v-if="label">
          <bc-table-layout y-align="middle" :class="[makeFontSize(labelFontSize)]">
            <bc-table-layout-row>
              <bc-table-layout-cell v-if="labelIcon">
                <bc-icon :provider="iconsProvider" :name="labelIcon" />
              </bc-table-layout-cell>
              <bc-table-layout-cell :class="['w-full', labelIcon ? 'pl-1' : null]">
                <bc-heading tag="div" :divider="false" :font-size="labelFontSize" :font-weight="labelFontWeight" :truncate="labelTruncate" v-if="label" :class="['w-10']">{{ label }}</bc-heading>
              </bc-table-layout-cell>
            </bc-table-layout-row>
          </bc-table-layout>
          <bc-divider v-if="labelDivider" :class="[labelDividerMargin]" />
        </template>
        <bc-container v-if="value" v-text="prefixedAndPostfixedValue" :class="valueCssClasses" />
        <bc-container v-if="trend !== undefined">
          <bc-table-layout y-align="middle" :class="[makeFontSize(trendFontSize)]">
            <bc-table-layout-row>
              <bc-table-layout-cell :class="[`${baseCss}-trend-icon`]" x-align="center">
                <bc-icon :provider="iconsProvider" :name="trendIcon" :class="trendIconColor" />
              </bc-table-layout-cell>
              <bc-table-layout-cell :class="trendCssClasses">{{ trend }}</bc-table-layout-cell>
              <bc-table-layout-cell v-if="comparisonLabel" full-width>
                <bc-container :class="['truncate', 'w-8']" v-text="comparisonLabel" />
              </bc-table-layout-cell>
            </bc-table-layout-row>
          </bc-table-layout>
        </bc-container>
      </bc-container>
    </bc-card-text>
  </bc-card>
</template>
<script>
import methods from '../../mixins/methods'
import cardProps from '../card/mixins/card-props.js'

export default {
  name: 'BcKpi',
  mixins: [
    methods,
    cardProps
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('kpi')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'overflow-hidden'
      ]
    },
    innerWrapperCssClasses () {
      return [
        this.padding,
        this.makeXAlign(this.xAlign),
        this.makeUiColorVariant(this.color, this.variant)
      ]
    },
    formattedValue () {
      if (typeof this.value !== 'number') {
        return this.value
      }
      return new Intl.NumberFormat(this.locale ?? undefined, {
        minimumFractionDigits: this.decimals ?? 0,
        maximumFractionDigits: this.decimals ?? 0
      }).format(this.value)
    },
    prefixedAndPostfixedValue () {
      return `${this.prefix || ''}${this.formattedValue}${this.postfix || ''}`
    },
    valueCssClasses () {
      return [
        'truncate',
        this.valueMargin,
        this.makeFontSize(this.valueFontSize),
        this.makeFontWeight(this.valueFontWeight)
      ]
    },
    trendCssClasses () {
      return [
        'truncate',
        'px-1'
      ]
    },
    trendIcon () {
      const trend = this.trend
      if (trend < 0) {
        return this.iconTrendDown
      } else if (trend > 0) {
        return this.iconTrendUp
      } else {
        return this.iconTrendFlat
      }
    },
    trendIconColor () {
      const trend = this.trend
      if (trend < 0) {
        return this.makeUiLightnessColor(this.iconTrendDownColor)
      } else if (trend > 0) {
        return this.makeUiLightnessColor(this.iconTrendUpColor)
      } else {
        return this.makeUiLightnessColor(this.iconTrendFlatColor)
      }
    }
  },
  props: {
    color: {
      type: String
    },
    comparisonLabel: {
      type: String
    },
    decimals: {
      type: Number,
      default: 2
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    iconTrendUp: {
      type: String,
      default: 'arrow-up-thick'
    },
    iconTrendUpColor: {
      type: String
    },
    iconTrendDown: {
      type: String,
      default: 'arrow-down-thick'
    },
    iconTrendDownColor: {
      type: String
    },
    iconTrendFlat: {
      type: String,
      default: 'minus-box'
    },
    iconTrendFlatColor: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    labelDivider: {
      type: Boolean,
      default: false
    },
    labelDividerMargin: {
      type: Array,
      default () {
        return []
      }
    },
    labelFontSize: {
      type: String,
      default: 'md'
    },
    labelFontWeight: {
      type: String,
      default: 'normal'
    },
    labelIcon: {
      type: String
    },
    labelTruncate: {
      type: Boolean,
      default: true
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    padding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    postfix: {
      type: String
    },
    prefix: {
      type: String
    },
    trend: {
      type: Number
    },
    trendFontSize: {
      type: String,
      default: 'xs'
    },
    value: {
      type: [
        String,
        Number
      ],
      required: true
    },
    valueFontSize: {
      type: String,
      default: 'xl'
    },
    valueFontWeight: {
      type: String,
      default: 'semibold'
    },
    valueMargin: {
      type: Array,
      default () {
        return ['my-1']
      }
    },
    variant: {
      type: String,
      default: 'solid'
    },
    xAlign: {
      type: String,
      default: 'left'
    }
  }
}
</script>
