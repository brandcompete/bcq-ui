<template>
  <hr :class="baseCss" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcDivider',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('divider', ['select-none'])
    }
  }
}
</script>
<style>
.bc-divider
{
  border-bottom-color: var(--border-color-light);
}

.bc-app-theme-dark .bc-divider
{
  border-bottom-color: var(--border-color-dark);
}
</style>
