<template>
  <bc-container :class="componentCssClasses">
    <bc-text-field-label v-if="label" :text="label" :class="labelsCssClasses('label')" />
    <bc-container :style="componentStyle" :class="trackCssClasses" :wrap="false">
      <slot />
    </bc-container>
    <ul v-if="ifLabels" :class="labelsListCssClasses">
      <li v-for="item in items" :class="['align-middle', 'inline-block', 'py-1']">
        <slot name="label" :data="item" />
      </li>
    </ul>
    <bc-text-field-label v-if="hint" :text="hint" :class="labelsCssClasses('hint')" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcMeterGroup',
  mixins: [
    methods
  ],
  data () {
    return {
      items: [],
      baseCss: this.componentBaseCss('meter-group')
    }
  },
  computed: {
    ifLabels () {
      return this.items.filter(item => item.label).length
    },
    componentCssClasses () {
      return [
        this.baseCss
      ]
    },
    componentStyle () {
      return {
        height: this.height
      }
    },
    trackCssClasses () {
      return [
        `${this.baseCss}-track`,
        this.makeBorderRadius(this.roundness),
        this.makeElevation(this.elevation),
        this.clickable ? 'cursor-pointer' : null,
        'overflow-hidden',
        'white-space-nowrap'
      ]
    },
    labelsListCssClasses () {
      return [
        this.makeFontSize(this.meterLabelSize),
        'inline-list',
        'align-middle',
        'truncate'
      ]
    }
  },
  props: {
    clickable: {
      type: Boolean
    },
    height: {
      type: String,
      default: '6px'
    },
    hint: {
      type: String
    },
    elevation: {
      type: String,
      default: 'none'
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    meterLabelSize: {
      type: String,
      default: 'sm'
    },
    roundness: {
      type: String,
      default: 'full'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$slots.default) {
        this.$slots.default()[0].children.filter(tabsPanel => tabsPanel.type.name === 'BcMeterGroupItem').forEach(child => {
          this.items.push(child.props)
        })
      }
    },
    labelsCssClasses (labelType) {
      return [
        labelType === 'label' ? ['mb-1', 'align-left'] : ['mt-1', 'align-right'],
        this.labelsUppercase ? 'uppercase' : null
      ]
    }
  }
}
</script>
<style>
.bc-meter-group .bc-meter-group-item.col
{
  flex-basis: unset;
}

.bc-meter-group .bc-meter-group-track
{
  background: var(--meter-track-light);
}

.bc-app-theme-dark .bc-meter-group .bc-meter-group-track
{
  background: var(--meter-track-dark);
}
</style>
