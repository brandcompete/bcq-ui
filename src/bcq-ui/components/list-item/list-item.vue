<template>
  <component role="row" :inert="inert" :is="tag" :to="to" :href="href" :class="componentCssClasses">
    <slot />
  </component>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcListItem',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('list-item')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        ['a', 'router-link'].includes(this.tag) ? 'cursor-pointer' : null,
        'table-layout-row',
        'bc-table-layout-row'
      ]
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    href: {
      type: String
    },
    inert: {
      type: Boolean
    },
    tag: {
      type: String,
      default: 'div'
    },
    to: {
      type: String
    }
  }
}
</script>
<style>
.bc-list.bc-list-divider .bc-list-item
{
  border-bottom: solid 1px var(--border-color-light);
}

.bc-app-theme-dark .bc-list.bc-list-divider .bc-list-item
{
  border-bottom-color: var(--border-color-dark);
}

.bc-list.bc-list-divider .bc-list-item:last-of-type
{
  border: 0;
}
</style>
