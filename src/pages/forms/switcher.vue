<template>
  <bc-grid>
    <bc-grid-col v-if="config">
      <flat-card :margin="[]">
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.labelFontWeight" label="label-font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown  :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.checked" label="v-model:checked" :block="false" />
              <bc-checkbox v-model:checked="config.label" label="label" :block="false" />
              <bc-checkbox v-model:checked="config.labelUppercase" label="label-uppercase" :block="false" />
              <bc-checkbox v-model:checked="config.block" label="block" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :class="['p-1']">
            <bc-card :class="['h-full']" elevation="none">
              <bc-card-text>
                <bc-switcher
                  @update:checked="onUpdateChecked"
                  v-model:checked="config.checked"
                  :label="config.label ? config.labelText : null"
                  :label-font-weight="config.labelFontWeight[0]"
                  :label-font-size="config.labelFontSize[0]"
                  :label-uppercase="config.labelUppercase"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :block="config.block" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcSwitcher',
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
    onUpdateChecked ($event) {
      this.log('@update:checked', 'bc-switcher', $event)
    }
  }
}
</script>
