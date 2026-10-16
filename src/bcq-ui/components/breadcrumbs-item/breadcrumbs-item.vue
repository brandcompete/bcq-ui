<template>
  <li :class="componentCssClasses">
    <component :is="parent.useRouter ? 'router-link' : 'a'" :to="to" :href="to" :target="parent.target" :class="['inline-block']">
      <slot />
    </component>
    <span v-if="parent.divider" v-html="parent.divider" :class="dividerCssClasses" />
  </li>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBreadcrumbsItem',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('breadcrumbs-item')
    }
  },
  computed: {
    parent () {
      return this.$parent.$props
    },
    dividerCssClasses () {
      return [
        `${this.baseCss}-divider`,
        'inline-block',
        'ml-2',
        'opacity-50'
      ]
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.parent.underline ? 'underline' : null,
        'inline-block',
        'm-1',
        'white-space-nowrap'
      ]
    }
  },
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
