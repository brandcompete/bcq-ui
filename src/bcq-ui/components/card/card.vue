<template>
  <bc-container :tag="tag" :class="componentCssClasses" :style="style" :to="to" :href="href">
    <slot />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import cardProps from './mixins/card-props.js'

export default {
  name: 'BcCard',
  mixins: [
    methods,
    cardProps
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('card')
    }
  },
  computed: {
    style () {
      return {
        borderWidth: `${this.borderWidth}px`
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        ['a', 'router-link'].includes(this.tag) ? 'cursor-pointer' : null,
        'border-solid'
      ]
    }
  }
}
</script>
<style>
.bc-card
{
  border-color: var(--border-color-light);
  background: var(--card-background-light);
}

.bc-app-theme-dark .bc-card
{
  border-color: var(--border-color-dark);
  background: var(--card-background-dark);
}
</style>
