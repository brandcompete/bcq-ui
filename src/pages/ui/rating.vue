<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.noRating" label="no-rating" :block="false" />
              <bc-checkbox v-model:checked="config.label" label="label" :block="false" />
              <bc-checkbox v-model:checked="config.hint" label="hint" :block="false" />
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col v-for="(item, index) in config.items" :xl="6" :lg="6" :md="6" :sm="12" :xs="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text x-align="center" :padding="['p-2']">
                <bc-rating
                  v-model:value="item.value"
                  @update:value="onUpdateValue"
                  :icon="item.icon"
                  :color-selected="item.colorSelected"
                  :label="config.label ? 'Rating Label' : null"
                  :hint="config.hint ? 'Rating Hint' : null"
                  :block="config.block"
                  :labels-uppercase="config.labelsUppercase"
                  :no-rating="config.noRating"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :items="item.items" />
                <bc-divider :class="['m-1']" />
                <bc-card-text x-align="center">
                  <code-chunk>v-model:value: {{ item.value }}</code-chunk>
                </bc-card-text>
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
  name: 'PageBcRating',
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
      this.log('@update:value', 'bc-rating', $event)
    }
  }
}
</script>
