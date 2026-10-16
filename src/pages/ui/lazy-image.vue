<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid>
          <bc-grid-col :span="config.span" v-for="image in config.images" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-lazy-image @load="onLoad" @error="onError" :aspect-ratio="config.aspectRatio" :title="image" :src="`${image}?${rnd()}`" />
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
  name: 'PageBcLazyImage',
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
      this.log('@load', 'bc-lazy-image', $event)
    },
    onError ($event) {
      this.log('@error', 'bc-lazy-image', $event)
    }
  }
}
</script>
