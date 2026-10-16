<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.locale" v-model:value="config.locale" label="locale" :visible-items="mapToDropdownArray(getLocales).length" :items="mapToDropdownArray(getLocales)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.labelIcon" label="label-icon" :block="false" />
              <bc-checkbox v-model:checked="config.labelDivider" label="label-divider" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="3" :lg="3" :md="4" :sm="4" :xs="6" v-for="kpi in config.kpis" :class="['p-1']">
            <bc-kpi
              :label="kpi.label"
              :label-divider="config.labelDivider"
              :value="kpi.value"
              :prefix="kpi.prefix"
              :color="kpi.color"
              :decimals="kpi.decimals"
              :comparison-label="kpi.comparisonLabel"
              :trend="kpi.trend"
              :variant="config.variant[0]"
              :locale="config.locale[0]"
              :icon-trend-up-color="kpi.iconTrendUpColor"
              :icon-trend-down-color="kpi.iconTrendDownColor"
              :icon-trend-flat-color="kpi.iconTrendFlatColor"
              :label-icon="config.labelIcon ? kpi.labelIcon : null"
              :postfix="kpi.postfix" />
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
  name: 'PageBcKpi',
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
