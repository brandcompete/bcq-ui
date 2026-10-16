<template>
  <bc-grid v-if="config && bundlerDefs">
    <bc-grid-col>
      <library-bundler :defs="bundlerDefs" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import LibraryBundler from '@/components/library-bundler/index.vue'

export default {
  name: 'PageBcBundler',
  components: {
    LibraryBundler
  },
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null,
      bundlerDefs: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
        this.$http({
          url: this.config.bundlerDefs
        }).then(bundlerDefs => {
          this.bundlerDefs = bundlerDefs.data
        })
      })
    }
  }
}
</script>
