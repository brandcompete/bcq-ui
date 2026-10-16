<template>
  <component :is="tag" :to="to" :href="href" :style="style" :disabled="tag === 'button' ? disabled : null" :type="tag === 'button' ? type : null" :class="componentCssClasses">
    <bc-table-layout :class="[`text-${size}`, 'inline-table', 'w-auto']" y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell v-if="iconLeft" x-align="right" :class="[`${baseCss}-icon`, `${baseCss}-icon-left`]">
          <bc-icon v-if="iconLeft" :name="iconLeft" :provider="iconProvider" />
        </bc-table-layout-cell>
        <bc-table-layout-cell x-align="center" :class="['px-1']">
          <template v-if="icon && (!iconLeft && !iconRight) && !loading">
            <div :class="labelCssClasses">{{ baseCss }}</div>
            <bc-icon :provider="iconProvider" :name="icon" :class="[`${baseCss}-icon-only`]" />
          </template>
          <div :class="labelCssClasses" v-else>
            <slot />
          </div>
          <bc-icon v-if="loading" :provider="iconProvider" :name="iconLoading" :class="['animate-spin']" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="iconRight" x-align="left" :class="[`${baseCss}-icon`, `${baseCss}-icon-right`]">
          <bc-icon v-if="iconRight" :name="iconRight" :provider="iconProvider" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </component>
</template>
<script>
import methods from '../../mixins/methods'

// @todo: fix the paddings when there are icons (also for icon only buttons)
export default {
  name: 'BcBtn',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('btn')
    }
  },
  computed: {
    style () {
      return {
        width: this.width
      }
    },
    paddingLabels () {
      const iconLeft = this.iconLeft
      const iconRight = this.iconRight
      const paddings = {
        '3xs': [iconLeft ? null : 'pl-1', iconRight ? null : 'pr-1', 'py-1'],
        '2xs': [iconLeft ? null : 'pl-2', iconRight ? null : 'pr-2', 'py-1'],
        'xs': [iconLeft ? null : 'pl-2', iconRight ? null : 'pr-2', 'py-1'],
        'sm': [iconLeft ? null : 'pl-2', iconRight ? null : 'pr-2', 'py-1'],
        'md': [iconLeft ? null : 'pl-2', iconRight ? null : 'pr-2', 'py-1'],
        'lg': [iconLeft ? null : 'pl-3', iconRight ? null : 'pr-3', 'py-1'],
        'xl': [iconLeft ? null : 'pl-3', iconRight ? null : 'pr-3', 'py-2'],
        '2xl': [iconLeft ? null : 'pl-3', iconRight ? null : 'pr-3', 'py-2'],
        '3xl': [iconLeft ? null : 'pl-3', iconRight ? null : 'pr-3', 'py-2'],
        '4xl': [iconLeft ? null : 'pl-4', iconRight ? null : 'pr-4', 'py-3'],
        '5xl': [iconLeft ? null : 'pl-4', iconRight ? null : 'pr-4', 'py-3'],
        '6xl': [iconLeft ? null : 'pl-5', iconRight ? null : 'pr-5', 'py-4'],
        '7xl': [iconLeft ? null : 'pl-5', iconRight ? null : 'pr-5', 'py-4'],
        '8xl': [iconLeft ? null : 'pl-6', iconRight ? null : 'pr-6', 'py-5']
      }
      return paddings[this.size] || []
    },
    labelCssClasses () {
      return [
        `${this.baseCss}-label`,
        'truncate',
        `font-${this.fontWeight}`,
        this.paddingLabels]
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      const inert = this.inert
      return [
        baseCss,
        this.loading ? `${baseCss}-loading` : null,
        this.icon ? `${baseCss}-icon-only` : null,
        this.block ? ['block', 'w-full'] : ['inline-block', 'align-middle'],
        this.uppercase ? 'uppercase' : null,
        this.disabled && !this.inert ? ['disabled'] : null,
        this.loading ? ['cursor-default', 'pointer-events-none'] : null,
        inert ? ['cursor-default', 'pointer-events-none'] : 'cursor-pointer',
        `${baseCss}-${this.size}`,
        `shadow-${this.elevation}`,
        `bg-${this.color}-${this.variant}`,
        `border-round-${this.roundness}`,
        'select-none',
        'text-center',
        'align-middle',
        'outline-none',
        'relative',
        'overflow-hidden',
        'transition-ease-out',
        'transition-all'
      ]
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'medium'
    },
    href: {
      type: String
    },
    icon: {
      type: String
    },
    iconLeft: {
      type: String
    },
    iconLoading: {
      type: String,
      default: 'loading'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: 'full'
    },
    tag: {
      type: String,
      default: 'button'
    },
    to: {
      type: String
    },
    type: {
      type: String,
      default: 'button',
      validator: value => {
        return ['button', 'submit', 'reset'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'sm'
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'solid'
    },
    width: {
      type: String
    }
  }
}
</script>
<style>
.bc-btn:active
{
  outline: solid 1px var(--text-theme-dark);
  outline-offset: -1px;
  box-shadow: none;
}

.bc-app-theme-dark .bc-btn:active
{
  outline-color: var(--text-theme-light);
}

.bc-btn::before
{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, .1);
  transition: all .2s ease-in-out;
}

.bc-btn:hover::before
{
  background: rgba(255, 255, 255, 0);
}

.bc-btn.bc-btn-loading .bc-btn-icon
{
  display: none;
}

.bc-btn.bc-btn-loading .bc-btn-label,
.bc-btn.bc-btn-icon-only .bc-btn-label
{
  display: inline-block;
  vertical-align: middle;
  width: 21px;
  margin-left: -21px;
  overflow: hidden;
  visibility: hidden;
  padding-left: 0;
  padding-right: 0;
}
</style>
