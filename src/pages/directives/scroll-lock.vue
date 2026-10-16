<template>
  <bc-grid v-if="config">
<!--    <bc-grid-col>-->
<!--      <flat-card :margin="[]">-->
<!--        &lt;!&ndash; component demo goes here &ndash;&gt;-->
<!--      </flat-card>-->
<!--    </bc-grid-col>-->
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcScrollLock',
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
