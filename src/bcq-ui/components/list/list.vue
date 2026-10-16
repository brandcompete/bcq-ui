<template>
  <div :class="componentCssClasses" :inert="inert" :style="{maxHeight}">
    <bc-table-layout y-align="middle">
      <slot />
    </bc-table-layout>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcList',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list', [])
    }
  },
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.hoverable ? `${baseCss}-hoverable` : null,
        this.clickable ? ['cursor-pointer'] : null,
        this.disabled && !this.inert ? ['disabled'] : null,
        this.divider ? `${baseCss}-divider` : null,
        this.maxHeight ? ['overflow-auto'] : null,
        this.makeElevation(this.elevation),
        'select-none',
        'bc-container'
      ]
    }
  },
  props: {
    clickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'none'
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String
    }
  }
}
</script>
<style>
.bc-app .bc-list a,
.bc-app .bc-list.bc-list-hoverable .bc-list-item
{
  transition: var(--router-link-transition);
}

.bc-app .bc-list a.router-link-exact-active
{
  background: var(--router-link-exact-active-light);
}

.bc-app .bc-list a:hover,
.bc-app .bc-list a.router-link-exact-active:hover,
.bc-app .bc-list.bc-list-hoverable .bc-list-item:hover
{
  background: var(--router-link\:hover-light);
}

.bc-app .bc-list a:active,
.bc-app .bc-list a.router-link-exact-active:active,
.bc-app .bc-list.bc-list-hoverable .bc-list-item:active
{
  background: var(--router-link\:active-light);
}

.bc-app.bc-app-theme-dark .bc-list a.router-link-exact-active
{
  background: var(--router-link-exact-active-dark);
}

.bc-app.bc-app-theme-dark .bc-list a:hover,
.bc-app.bc-app-theme-dark .bc-list a.router-link-exact-active:hover,
.bc-app.bc-app-theme-dark .bc-list.bc-list-hoverable .bc-list-item:hover
{
  background: var(--router-link\:hover-dark);
}

.bc-app.bc-app-theme-dark .bc-list a:active,
.bc-app.bc-app-theme-dark .bc-list a.router-link-exact-active:active,
.bc-app.bc-app-theme-dark .bc-list.bc-list-hoverable .bc-list-item:active
{
  background: var(--router-link\:active-dark);
}
</style>
