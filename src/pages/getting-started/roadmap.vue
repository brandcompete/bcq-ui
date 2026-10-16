<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <bc-timeline marker-clickable @marker-click="toPath($event.path)" color="discovery" variant="soft" :items="config.timeline" />
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcRoadmap',
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
