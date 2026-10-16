<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card :margin="['mb-4']">
        <toolbar :title="false" :divider="false" :margin="[]" :padding="['p-1', 'pt-2']">
          <bc-btn @click="init" block roundness="sm" color="discovery" icon-left="chart-line-variant">Re-render</bc-btn>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" v-for="item in config.items" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-sparklines @click="onClick(item)" :class="['cursor-pointer']" :height="config.height" :width="config.width" :color="item.color" :stroke-width="config.strokeWidth" :series="item.series" />
              </bc-card-text>
              <template v-if="showSeries">
                <bc-divider :class="['my-1']" />
                <bc-card-text :class="['code', 'opacity-75']">series: {{ item.series }}</bc-card-text>
              </template>
            </bc-card>
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
  name: 'PageBcSparklines',
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
  props: {
    showSeries: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        data.config.items.map(item => {
          item.series = this.random(item.iterations)
          return item
        })
        this.config = data.config
      })
    },
    random (iterations, toFixed) {
      const numbers = []
      for (let i = 0; i < iterations; i += 1) {
        numbers.push(parseFloat((Math.random() * 100).toFixed(toFixed)))
      }
      return numbers
    },
    onClick (item) {
      this.log('@click', 'bc-sparklines', item.color, item.series)
    }
  }
}
</script>
