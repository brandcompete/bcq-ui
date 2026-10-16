<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.labelFontWeight" label="label-font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.labelFontSize" label="label-font-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.iconSize" label="icon-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.showIcon" label="icon" :block="false" />
              <bc-checkbox v-model:checked="config.label" label="label" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" v-for="(color, index) in config.colors" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text x-align="center" :padding="['p-1', 'pt-2']">
                <bc-color-picker
                  @update:value="onUpdateValue($event)"
                  v-model:value="config.colors[index]"
                  :icon="config.showIcon ? config.icon : null"
                  :icon-size="config.iconSize[0]"
                  :label-font-size="config.labelFontSize[0]"
                  :label-font-weight="config.labelFontWeight[0]"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :label="config.label" />
              </bc-card-text>
              <bc-divider :class="['my-1']" />
              <bc-card-text x-align="center" :padding="['p-1']">
                <code-chunk>v-model:value: <span :class="['font-semibold']" :style="{color: config.colors[index]}">"{{ config.colors[index] }}"</span></code-chunk>
              </bc-card-text>
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
  name: 'PageBcColorPicker',
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
    onUpdateValue ($event) {
      this.log('@update:value', 'bc-color-picker', $event)
    }
  }
}
</script>
