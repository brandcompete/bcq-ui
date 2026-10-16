<template>
  <bc-container :data-tabs-id="id" v-if="$slots.default()[0]" :inert="inert" :class="componentCssClasses" role="tab">
    <bc-container :class="tabsButtonsCssClasses" v-if="tabsPanels.length">
      <bc-table-layout equal-cells x-align="center">
        <bc-table-layout-row>
          <bc-table-layout-cell @click="selectTab(index)" v-for="(tabPanel, index) in tabsPanels" :class="tabButtonCssClasses(tabPanel, index)" :title="tabPanel.label" :key="index">
            <bc-container :class="tabButtonWrapperCssClasses">
              <bc-container :class="tabButtonLabelCssClasses" v-text="tabPanel.label" />
              <bc-container :class="tabButtonIconCssClasses" v-if="tabPanel.icon">
                <bc-icon :name="tabPanel.icon" :provider="iconsProvider" />
              </bc-container>
            </bc-container>
            <bc-container :style="{height: `${selectedTabMarkerHeight}px`}" :class="selectedTabMarkerCssClasses" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </bc-container>
    <bc-container :class="[`${baseCss}-tabs-panels`, 'overflow-auto']">
      <slot />
    </bc-container>
    <bc-reactive-style>
    .{{ baseCss }}[data-tabs-id="{{ id }}"] .bc-tabs-tabs-buttons-button-selected
    {
      color: var(--tabs-{{ makeUiColorVariant(color, 'solid') }}-light);
    }
    .bc-app-theme-dark .{{ baseCss }}[data-tabs-id="{{ id }}"] .bc-tabs-tabs-buttons-button-selected
    {
      color: var(--tabs-{{ makeUiColorVariant(color, 'solid') }}-dark);
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTabs',
  mixins: [
    methods
  ],
  data () {
    return {
      id: `bc-tabs-${this.uuid()}`,
      baseCss: this.componentBaseCss('tabs'),
      tabsPanels: []
    }
  },
  emits: [
    'update:default-tab'
  ],
  watch: {
    defaultTab () {
      this.getTabsPanels().forEach(tabPanel => {
        const tabToSelect = parseInt(tabPanel.getAttribute('data-tabs-panel'), 10)
        tabPanel.classList[tabToSelect === this.defaultTab ? 'remove' : 'add']('hidden')
      })
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        'cursor-default'
      ]
    },
    tabsButtonsCssClasses () {
      return [
        `${this.baseCss}-tabs-buttons`,
        this.makeFontSize(this.size),
        'select-none'
      ]
    },
    tabButtonWrapperCssClasses () {
      return [
        'pt-1',
        this.compact ? ['flex', 'flex-row-reverse', 'align-items-center', 'justify-content-center'] : 'block'
      ]
    },
    tabButtonLabelCssClasses () {
      return [
        `${this.baseCss}-tabs-buttons-button-label`,
        this.uppercase ? 'uppercase' : null,
        this.makeFontWeight(this.fontWeight),
        'px-1',
        'truncate',
        'transition-all',
        'transition-duration-300'
      ]
    },
    selectedTabMarkerCssClasses () {
      return [
        `${this.baseCss}-tabs-buttons-button-selected-tab-marker`,
        this.makeUiColorVariant(this.color, 'solid'),
        'm-auto',
        'mt-1',
        'transition-all',
        'transition-duration-300'
      ]
    },
    tabButtonIconCssClasses () {
      return [
        `${this.baseCss}-tabs-buttons-button-icon`,
        'transition-all',
        'transition-duration-300'
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    compact: {
      type: Boolean,
      default: false
    },
    defaultTab: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'semibold'
    },
    uppercase: {
      type: Boolean,
      default: true
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    selectedTabMarkerHeight: {
      type: Number,
      default: 3
    },
    tabPanelHeight: {
      type: String
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const tabsPanelsChildren = this.$slots.default()[0].children.filter(tabsPanel => tabsPanel.type.name === 'BcTabsPanel')
      const tabsPanels = []
      tabsPanelsChildren.forEach((tabsPanel, index) => {
        tabsPanels.push({
          label: tabsPanel.props.label,
          icon: tabsPanel.props.icon || null,
          disabled: tabsPanel.props.disabled || null
        })
      })
      this.tabsPanels = tabsPanels
      this.getTabsPanels().forEach((panel, index) => {
        panel.setAttribute('data-tabs-panel', index.toString())
        if (index === this.defaultTab) {
          panel.classList.remove('hidden')
        }
        panel.style.height = this.tabPanelHeight
      })
    },
    getTabsPanels () {
      return this.$el.querySelectorAll('.bc-tabs-panel')
    },
    selectTab (index) {
      if (index !== this.defaultTab) {
        this.$emit('update:default-tab', index)
      }
    },
    isTabSelected (index) {
      return this.defaultTab === index
    },
    tabButtonCssClasses (tabPanel, index) {
      const baseCss = this.baseCss
      return [
        `${baseCss}-tabs-buttons-button`,
        this.isTabSelected(index) ? [`${baseCss}-tabs-buttons-button-selected`, 'cursor-default', this.makeUiColorVariant(this.color, 'solid')] : ['cursor-pointer'],
        tabPanel.disabled ? 'disabled' : null
      ]
    }
  }
}
</script>
<style>
.bc-tabs .bc-tabs-tabs-buttons-button-selected-tab-marker:not(.w-full)
{
  width: 0;
}

.bc-tabs .bc-tabs-tabs-buttons-button-selected .bc-tabs-tabs-buttons-button-selected-tab-marker
{
  width: 100%;
}

.bc-tabs .bc-tabs-tabs-buttons-button
{
  background: var(--bg-tab-button);
}

.bc-app-theme-dark .bc-tabs .bc-tabs-tabs-buttons-button
{
  background: var(--bg-tab-button-dark);
}

.bc-app-theme-dark .bc-tabs .bc-tabs-tabs-buttons-button-selected
{
  background: var(--bg-tab-button-selected-dark);
}
</style>
