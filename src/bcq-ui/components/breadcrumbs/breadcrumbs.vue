<template>
  <div :class="componentCssClasses">
    <ul :class="listCssClasses">
      <slot />
    </ul>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBreadcrumbs',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('breadcrumbs')
    }
  },
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.lastItemDisabled ? `${baseCss}-last-item-disabled` : null,
        `text-${this.fontSize}`,
        `text-${this.xAlign}`,
        'bc-container',
        'select-none'
      ]
    },
    listCssClasses () {
      return [
        `${this.baseCss}-list`,
        'inline-block',
        'truncate'
      ]
    }
  },
  props: {
    xAlign: {
      type: String,
      default: 'left'
    },
    useRouter: {
      type: Boolean,
      default: true
    },
    underline: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: 'sm'
    },
    lastItemDisabled: {
      type: Boolean,
      default: true
    },
    target: {
      type: String,
      default: '_self'
    },
    divider: {
      type: String,
      default: '&raquo;'
    }
  }
}
</script>
<style>
.bc-breadcrumbs.bc-breadcrumbs-last-item-disabled li:last-of-type
{
  opacity: .5;
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}

.bc-breadcrumbs li:only-of-type
{
  margin-right: 0;
  margin-left: 0;
}

.bc-breadcrumbs li:first-of-type
{
  margin-left: 0;
}

.bc-breadcrumbs li:last-of-type
{
  margin-right: 0;
}

.bc-breadcrumbs li:only-of-type .bc-breadcrumbs-item-divider,
.bc-breadcrumbs li:last-of-type .bc-breadcrumbs-item-divider
{
  display: none;
}
</style>
