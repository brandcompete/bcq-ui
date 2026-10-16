<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <bc-table-layout y-align="middle" x-align="center">
          <bc-table-layout-row v-for="(row, index) in config.rows" :key="row" :class="[`bg-${getUiColors[index]}-solid`]">
            <bc-table-layout-cell :class="config.cellCssClasses" v-for="cell in config.cells" :key="cell">
              <code-chunk>{{ row }}/{{cell }}</code-chunk>
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
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
  name: 'PageBcTableLayout',
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
