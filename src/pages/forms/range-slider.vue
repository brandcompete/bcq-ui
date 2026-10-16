<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.fontSize" label="font-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.rounded" label="rounded" :block="false" />
              <bc-checkbox v-model:checked="config.showLabel" label="label" :block="false" />
              <bc-checkbox v-model:checked="config.showHint" label="hint" :block="false" />
              <bc-checkbox v-model:checked="config.minMaxLabels" label="min-max-labels" :block="false" />
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" :class="['p-1']" v-for="slider in config.sliders">
            <bc-card elevation="none">
              <bc-card-text :class="['p-2']">
                <bc-range-slider
                  @update:value="onUpdateValue($event, slider.name)"
                  v-model:value="slider['model:value']"
                  :color="config.color[0]"
                  :variant="config.variant[0]"
                  :min-max-labels="config.minMaxLabels"
                  :label="config.showLabel ? config.label : null"
                  :hint="config.showHint ? config.hint : null"
                  :labels-uppercase="config.labelsUppercase"
                  :rounded="config.rounded"
                  :font-size="config.fontSize[0]"
                  :name="slider.name"
                  :min="slider.min"
                  :max="slider.max"
                  :step="slider.step"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'" />
              </bc-card-text>
              <bc-divider :class="['m-1']" />
              <bc-card-text :class="['p-2']" x-align="center">
                <code-chunk>v-model:value: {{ JSON.stringify(slider['model:value']) }}</code-chunk>
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
import CodeChunk from '@/components/code-chunk/index.vue'

export default {
  name: 'PageBcRangeSlider',
  components: {CodeChunk},
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
    onUpdateValue ($event, sliderName) {
      this.log('@update:value', 'bc-range-slider', 'v-model:value:', $event, sliderName)
    }
  }
}
</script>
