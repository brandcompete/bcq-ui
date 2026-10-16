<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.block" label="block" :block="false" />
              <bc-checkbox v-model:checked="config.iconHeader" label="icon-header" :block="false" />
              <bc-checkbox v-model:checked="config.uppercase" label="uppercase" :block="false" />
              <bc-checkbox v-model:checked="config.updateLabelOnValueUpdate" label="update-label-on-value-update" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col v-for="splitBtn in config.splitBtns" :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text x-align="center">
                <code-chunk>v-model:value: {{ config.value }}</code-chunk>
              </bc-card-text>
              <bc-divider :class="['my-1']" />
              <bc-card-text x-align="center">
                <bc-split-btn
                  @update:value="onUpdateValue"
                  v-model:value="config.value"
                  :block="config.block"
                  :color="config.color[0]"
                  :size="config.size[0]"
                  :variant="config.variant[0]"
                  :items="config.splitBtnItems"
                  :uppercase="config.uppercase"
                  :icon-header="config.iconHeader"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :update-label-on-value-update="config.updateLabelOnValueUpdate" />
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
  name: 'PageSplitBtn',
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
      this.log('@update:value', 'bc-split-btn', $event)
    }
  }
}
</script>
