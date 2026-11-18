<template>
  <bc-container :class="[baseCss]">
    <syntax-highlight title="Install BCQ, VirtualScroller, Mitt and the MDI Icon Font" url="/code/install-bcq-ui.md" language="bash" />
    <syntax-highlight title="ES6: Add to your main.js" url="/code/bcq-ui-main-js.md" language="javascript" />
    <syntax-highlight title="TypeScript: add to your main.ts instead of main.js" url="/code/bcq-ui-main-ts.md" language="typescript" />
    <syntax-highlight title="TypeScript: create src/bcq-ui-env.d.ts (types this.$emitter)" url="/code/bcq-ui-env-d-ts.md" language="typescript" />
    <syntax-highlight title="TypeScript: create src/vue-virtual-scroller.d.ts (the package ships without types)" url="/code/vue-virtual-scroller-d-ts.md" language="typescript" />
    <syntax-highlight title="Add to your App.vue" url="/code/layout.md" language="xml" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'InstallBcq',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'install-bcq',
    }
  }
}
</script>
