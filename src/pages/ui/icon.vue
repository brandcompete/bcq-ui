<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
<!--    <bc-grid-col :span="12" v-for="file in config.codeFiles" :class="['mb-4']">-->
<!--      <syntax-highlight :url="file.uri" language="xml" :margin="file.margin" :title="getLang.codeFiles[file.title]" />-->
<!--    </bc-grid-col>-->
    <bc-grid-col :span="12">
      <flat-card v-for="provider in config.iconProviders">
        <icons :title="provider.title" :provider-url="provider.url" />
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import Icons from '@/components/icons/index.vue'

// @todo: use lazy loading, as there are too many icons
export default {
  name: 'PageBcIcon',
  components: {
    Icons
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
      this.showLoadingOverlay()
      this.getPageMeta().then(data => {
        this.config = data.config
        this.hideLoadingOverlay()
      })
    }
  }
}
</script>
