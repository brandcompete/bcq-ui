<template>
  <bc-grid v-if="config && config.images.length">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid>
          <bc-grid-col :span="6" v-for="image in config.images" :class="['p-1']">
            <bc-card>
              <bc-card-text>
                <bc-lazy-image :src="image" v-intersect="{root: null, rootMargin: '0px', scrollMargin: '0px', threshold: 1.0, onIntersect}" />
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
  name: 'PageBcIntersect',
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
        this.getPageMeta('/ui/lazy-image', false).then(data => {
          this.config.images = data.config.images
        })
      })
    },
    onIntersect ($event) {
      this.log('v-intersect', 'isIntersecting:', $event.isIntersecting, $event)
    }
  }
}
</script>
