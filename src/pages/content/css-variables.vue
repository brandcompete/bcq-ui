<template>
  <bc-grid>
    <bc-grid-col v-if="config">
      <css-variables-editor :class="['mb-4']" />
      <syntax-highlight :url="config.url" language="css" title="variables.css" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import CssVariablesEditor from '../../components/css-variables-editor/index.vue'

export default {
  name: 'PageBcCssVariables',
  components: {
    CssVariablesEditor
  },
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
    }
  },
  mounted () {
    this.init()
    // console.log(this.config)
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
