<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card :margin="[]">
        <bc-grid>
          <bc-grid-col v-for="video in config.videos" :xl="6" :lg="6" :md="6" :sm="12" :xs="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text :padding="[]">
                <bc-vid @load="onLoad" :src="video" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcVid',
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
    },
    onLoad ($event) {
      console.log($event)
      this.log('@load', 'bc-vid', $event)
    }
  }
}
</script>
