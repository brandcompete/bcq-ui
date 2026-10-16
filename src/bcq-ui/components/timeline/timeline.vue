<template>
  <bc-container :class="componentCssClasses">
    <bc-grid v-for="(item, index) in items" :wrap="false">
      <bc-grid-col :xs="5" :class="[sidesCssClasses(item, index)]" v-if="item.label">
        <bc-container v-if="item.label.date" v-text="item.label.date" :class="[dateCssClasses(item)]" />
        <bc-container v-if="item.label.tagline" v-text="item.label.tagline" :class="['opacity-50', 'truncate', `text-${item.label.taglineSize || 'sm'}`]" />
      </bc-grid-col>
      <bc-grid-col :xl="1" :lg="1" :md="1" :sm="1" :xs="2" :class="timeLineUiCssClasses(index)">
        <bc-container :class="barCssClasses" :style="barStyle" />
        <bc-container @click="$emit('marker-click', item)" display="inline-block" :class="markerCssClasses(item)" :style="markerStyle(item)">
          <bc-icon v-if="item.label.icon" :name="item.label.icon" />
        </bc-container>
      </bc-grid-col>
      <bc-grid-col :xs="5" :class="sidesCssClasses(item, index, 'right')" v-text="item.event.text" />
    </bc-grid>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

const defaultRoundness = 'sm'

export default {
  name: 'BcTimeline',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('timeline')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.unselectable ? 'select-none' : null
      ]
    },
    barStyle () {
      return {
        width: `${this.barWidth}px`
      }
    },
    barCssClasses () {
      return [
        `${this.baseCss}-bar`,
        'h-full',
        'm-auto',
        'absolute',
        'top-0',
        'left-50',
        '-translate-x-50',
        'pointer-events-none'
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    barWidth: {
      type: Number,
      default: 4
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    markerClickable: {
      type: Boolean,
      default: false
    },
    markerElevation: {
      type: String,
      default: 'sm'
    },
    markerRoundness: {
      type: String,
      default: defaultRoundness
    },
    padding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    paddingVertical: {
      type: Array,
      default () {
        return [
          'pt-4',
          'pb-4'
        ]
      }
    },
    unselectable: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  methods: {
    dateCssClasses (item) {
      return [
        this.makeFontSize(item.label.dateSize || defaultRoundness),
        'truncate'
      ]
    },
    paddings (index) {
      const paddingVertical = this.paddingVertical
      return [
        this.padding,
        index === 0 ? paddingVertical[0] : null,
        index === this.items.length - 1 ? paddingVertical[1] : null
      ]
    },
    markerCssClasses (item) {
      const cssClass = `${this.baseCss}-marker`
      const icon = item.label.icon
      return [
        cssClass,
        this.padding,
        this.makeBorderRadius(this.markerRoundness),
        this.makeFontSize(item.label.iconSize || 'sm'),
        this.markerClickable ? 'cursor-pointer' : null,
        icon ? this.makeUiColorVariant(this.color, this.variant) : `${cssClass}-no-icon`,
        icon ? this.makeElevation(this.markerElevation) : null,
        icon ? null : ['translate-y-25'],
        'relative'
      ]
    },
    markerStyle(item) {
      const icon = item.label.icon
      return {
        width: !icon ? `${this.barWidth * 4}px` : null,
        aspectRatio: !icon ? '1/1' : null
      }
    },
    sidesCssClasses (item, index, side = 'left') {
      const sideCssClass = `${this.baseCss}-side`
      return [
        this.paddings(index),
        'align-content-center',
        `text-${side === 'left' ? 'right' : 'left'}`,
        sideCssClass,
        `${sideCssClass}-${side}`
      ]
    },
    timeLineUiCssClasses (index) {
      return [
        this.paddings(index),
        'relative',
        'text-center',
        'select-none',
        'align-content-center'
      ]
    }
  }
}
</script>
<style>
.bc-timeline .bc-timeline-bar,
.bc-timeline .bc-timeline-marker.bc-timeline-marker-no-icon
{
  background: var(--border-color-light);
}

.bc-app-theme-dark .bc-timeline .bc-timeline-bar,
.bc-app-theme-dark .bc-timeline .bc-timeline-marker.bc-timeline-marker-no-icon
{
  background: var(--border-color-dark);
}

@media screen and (max-width: 576px)
{
  .bc-timeline .bc-timeline-side-right
  {
    word-break: break-all;
  }
}
</style>
