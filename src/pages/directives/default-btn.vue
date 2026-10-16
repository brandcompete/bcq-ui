<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <bc-grid>
          <bc-grid-col :span="12" :class="['p-1']">
            <bc-btn color="discovery" roundness="sm" icon-left="button-pointer" block v-default-btn @click="onClick">{{ config.btnLabel }}</bc-btn>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcDefaultBtn',
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
    onClick ($event) {
      this.log('@click', 'v-default-btn', $event)
    }
  }
}
</script>
