<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.fontSize" label="font-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'p-1', 'text-center']">
              <bc-checkbox v-model:checked="config.showIcon" label="icon" :block="false" />
              <bc-checkbox v-model:checked="config.dismissible" label="dismissible" :block="false" />
              <bc-checkbox v-model:checked="config.uppercase" label="uppercase" :block="false" />
              <bc-checkbox v-model:checked="config.block" label="block" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="6" :lg="6" :md="4" :sm="6" :xs="12" v-for="chip in config.chips" :key="chip" :class="['p-1']">
            <bc-card elevation="none" :class="['h-full']">
              <bc-card-text :class="['text-center', 'mt-1']">
                <bc-container :class="['my-2']">
                  <bc-checkbox v-model:checked="chip['model:visible']" label="v-model:visible" :block="false" />
                  <bc-divider />
                </bc-container>
                <bc-chip
                  v-model:visible="chip['model:visible']"
                  :font-size="config.fontSize[0]"
                  :variant="config.variant[0]"
                  :color="chip.color"
                  :block="config.block"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :dismissible="config.dismissible"
                  :uppercase="config.uppercase"
                  :font-weight="config.fontWeight"
                  :elevation="config.elevation"
                  :icon="config.showIcon ? config.icon : null"
                  variant="soft">{{ chip.label }}</bc-chip>
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
  name: 'PageBcChip',
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
