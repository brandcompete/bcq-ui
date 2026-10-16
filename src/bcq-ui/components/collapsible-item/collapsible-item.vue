<template>
  <bc-container tag="li" :class="componentCssClasses" :inert="inert">
    <bc-table-layout :class="headerCssClasses" y-align="middle" @click="toggle">
      <bc-table-layout-row>
        <bc-table-layout-cell v-if="icon" :class="[`${baseCss}-header-icon`, 'text-center', 'p-2']">
          <bc-icon :name="icon" :provider="parent.iconProvider" :class="['align-bottom']" />
        </bc-table-layout-cell>
        <bc-table-layout-cell @click.stop :class="['p-2', 'text-left']" v-if="$slots['left']">
          <slot name="left" />
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="['py-2', icon ? null : ['pl-2'], 'pr-2', 'w-full', `font-${parent.headerFontWeight}`]">
          <bc-container v-if="label" v-text="label" :class="['truncate']" />
          <bc-container v-if="subLabel" v-text="subLabel" :class="['truncate', 'text-xs', 'font-normal', 'opacity-75']" />
        </bc-table-layout-cell>
        <bc-table-layout-cell @click.stop :class="['p-2', 'text-right']" v-if="$slots['right']">
          <slot name="right" />
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="[`${baseCss}-header-icon`, 'p-2']">
          <bc-icon :name="parent[expanded ? 'iconCollapse' : 'iconExpand']" :provider="parent.iconProvider" :class="['align-bottom']" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
    <bc-container :class="contentCssClasses" :style="contentStyle">
      <bc-container :class="[parent.contentPadding, `text-${parent.contentSize}`]">
        <bc-container v-if="$slots['top']">
          <slot name="top" />
        </bc-container>
        <slot />
        <bc-container v-if="$slots['bottom']">
          <slot name="bottom" />
        </bc-container>
      </bc-container>
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

// @todo: hover for headers
export default {
  name: 'BcCollapsibleItem',
  mixins: [
    methods
  ],
  data () {
    return {
      multiple: false,
      id: this.uuid(),
      baseCss: this.componentBaseCss('collapsible-item'),
      events: {
        collapse: 'bc-collapsible-item:collapse',
        update: 'update:expanded',
        expandAll: 'bc-collapsible:expand-all',
        collapseAll: 'bc-collapsible:collapse-all',
      }
    }
  },
  emits: [
    'update:expanded'
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    subLabel: {
      type: String
    }
  },
  computed: {
    contentStyle () {
      const maxHeight = this.parent.contentMaxHeight
      return {
        maxHeight,
        overflow: maxHeight ? 'auto' : 'hidden'
      }
    },
    parent () {
      return this.$parent.$props
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        `${baseCss}-${this.expanded ? 'expanded' : 'collapsed'}`
      ]
    },
    headerCssClasses () {
      return [
        'cursor-pointer',
        'select-none',
        `${this.baseCss}-header`,
        'transition-all',
        `transition-duration-${this.parent.animationSpeed}`,
        `text-${this.parent.headerSize}`
      ]
    },
    contentCssClasses () {
      const baseCss = this.baseCss
      const expanded = this.expanded
      return [
        `${baseCss}-container`,
        'transition-all',
        `transition-duration-${this.parent.animationSpeed}`,
        expanded ? ['animate-height'] : ['h-0', 'overflow-hidden', 'p-0'],
        `${baseCss}-container-${expanded ? 'expanded' : 'collapsed'}`
      ]
    }
  },
  mounted () {
    this.init()
  },
  created () {
    this.bind()
  },
  methods: {
    init () {
      this.multiple = this.parent.multiple
    },
    toggle () {
      const events = this.events
      this.$emit(events.update, !this.expanded)
      if (!this.multiple) {
        this.$emitter.emit(events.collapse, this.id)
      }
    },
    bind () {
      const emitter = this.$emitter
      const events = this.events
      emitter.on(events.collapse, id => {
        if (this.id !== id) {
          this.$emit(events.update, false)
        }
      })
      emitter.on(events.expandAll, id => {
        this.$emit(events.update, true)
      })
      emitter.on(events.collapseAll, id => {
        this.$emit(events.update, false)
      })
    }
  }
}
</script>
<style>
.bc-collapsible-item .bc-collapsible-item-header .bc-collapsible-item-header-icon
{
  width: var(--icon-cell-width);
}

.bc-collapsible-item .bc-collapsible-item-header
{
  background: var(--collapsible-header-background-light);
  border-bottom: solid 1px var(--collapsible-header-border-light);
}

.bc-app-theme-dark .bc-collapsible-item .bc-collapsible-item-header
{
  background: var(--collapsible-header-background-dark);
  border-bottom-color: var(--collapsible-header-border-dark);
}

.bc-collapsible-item-expanded .bc-collapsible-item-header
{
  background: var(--collapsible-header-background-expanded-light);
}

.bc-app-theme-dark .bc-collapsible-item-expanded .bc-collapsible-item-header
{
  background: var(--collapsible-header-background-expanded-dark);
}
</style>
