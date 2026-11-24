<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <project-configurator />
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import ProjectConfigurator from '../../components/project-configurator/index.vue'

export default {
  name: 'PageBcProjectConfigurator',
  components: {
    ProjectConfigurator
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
