<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.fontWeight" label="font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.compact" label="compact" :block="false" />
              <bc-checkbox v-model:checked="config.uppercase" label="upeprcase" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-tabs
          v-model:default-tab="config.defaultTab"
          @update:default-tab="onUpdate"
          :color="config.color[0]"
          :size="config.size[0]"
          :uppercase="config.uppercase"
          :font-weight="config.fontWeight[0]"
          :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
          :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
          :compact="config.compact">
          <bc-tabs-panel v-for="tabsPanel in config.tabs" :class="['p-2']" :icon="tabsPanel.icon" :disabled="tabsPanel.disabled" :label="tabsPanel.label">
            <bc-lorem-ipsum :repeats="3" />
          </bc-tabs-panel>
        </bc-tabs>
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
  name: 'PageBcTabs',
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
    onUpdate (selectedTabIndex) {
      this.log('@update:default-tab', 'bc-tabs', selectedTabIndex)
    }
  }
}
</script>
