<template>
  <bc-container :class="[baseCss]">
    <bc-heading font-size="xl" font-weight="normal" :margin="['mb-4']">Installing via Becquerel CLI</bc-heading>
    <p :class="['mb-4', 'text-sm', 'page-description']">The quickest way to start is by using our <a :class="['underline']" href="https://www.npmjs.com/package/create-becquerel" target="_blank">interactive CLI</a>,
      which scaffolds a Vue 3 + Vite project with BCQ UI already installed and configured. It asks for the project name, theme (dark/light),
      JavaScript/TypeScript, and whether to add <code>vue-router</code>, <code>axios</code> + <code>vue-axios</code> and <code>pinia</code>.</p>
    <syntax-highlight title="CLI" url="/code/install-bcq-ui-cli.md" language="bash" />
    <bc-heading font-size="xl" font-weight="normal" :margin="['mb-4']">Manual Installation</bc-heading>
    <p :class="['mb-4', 'text-sm']">Or if you'd prefer, you can also install Becquerel and its dependencies manually.</p>
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
