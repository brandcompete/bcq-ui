<template>
  <bc-container :class="[baseCss]">
    <syntax-highlight title="Install BCQ, VirtualScroller, Mitt and the MDI Icon Font" url="/code/install-bcq-ui.md" language="bash" />
    <syntax-highlight title="Add to your main.js" url="/code/bcq-ui-main-js.md" language="javascript" />
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
