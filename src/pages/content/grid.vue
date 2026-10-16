<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card :title="getLang.twelveColumnGrid">
        <bc-grid v-for="(row, rowIndex) in config.equalColumns" :key="rowIndex">
          <bc-grid-col v-for="(col, colIndex) in row.cols" :class="['p-1']">
            <bc-container :class="[
              `bg-${row.color}-${row.swatch}`,
              'text-white',
              'p-1',
              'text-sm',
              'select-none',
              'truncate',
              'text-center',
              'border-round-sm',
              'font-bold']" v-text="row.cols" />
          </bc-grid-col>
        </bc-grid>
      </flat-card>
      <flat-card :title="getLang.responsiveGrid">
        <bc-grid v-for="(row, rowIndex) in config.responsiveColumns" :key="rowIndex">
          <bc-grid-col
            v-for="(col, colIndex) in row.cols"
            :xs="row.xs"
            :sm="row.sm"
            :md="row.md"
            :lg="row.lg"
            :xl="row.xl"
            :class="['p-1']">
            <bc-container :class="[
              `bg-${row.color}-${row.swatch}`,
              'text-white',
              'p-1',
              'text-sm',
              'select-none',
              'truncate',
              'text-center',
              'border-round-sm',
              'font-bold']">
              <code-chunk
                v-for="label in ['xl', 'lg', 'md', 'sm', 'xs']">
                <span :class="['opacity-50']">{{ label }}:</span> {{ row[label] }}
              </code-chunk>
            </bc-container>
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
  name: 'PageBcGrid',
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
