<template>
  <bc-container :class="componentCssClasses">
    <component :is="tag" :to="to" :href="href" :class="[`text-${fontSize}`, 'block', `font-${fontWeight}`, padding, truncate ? 'truncate' : null]">
      <slot />
    </component>
    <bc-divider v-if="divider" :class="dividerMargin" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcHeading',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('bc-heading')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.margin
      ]
    }
  },
  props: {
    dividerMargin: {
      default () {
        return []
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    fontSize: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'semibold'
    },
    divider: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Array,
      default () {
        return []
      }
    },
    margin: {
      type: Array,
      default () {
        return []
      }
    },
    truncate: {
      type: Boolean,
      default: true
    },
    to: {
      type: String
    },
    href: {
      type: String
    }
  }
}
</script>
