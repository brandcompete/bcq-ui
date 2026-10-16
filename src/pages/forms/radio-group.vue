<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :divider="false" :margin="[]">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.labelFontWeight" label="label-font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.align" v-model:value="config.xAlign" label="x-align" :items="mapToDropdownArray(getXAlign)" :visible-items="getXAlign.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.vertical" label="vertical" :block="false" />
              <bc-checkbox v-model:checked="config.labelUppercase" label="label-uppercase" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-radio-group
          v-model:value="config['model:value']"
          @update:value="onUpdateValue"
          name="guitars"
          :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
          :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
          :label-uppercase="config.labelUppercase"
          :label-font-weight="config.labelFontWeight[0]"
          :vertical="config.vertical"
          :size="config.size[0]"
          :class="['mb-4']"
          :x-align="config.xAlign[0]">
          <bc-radio
            :value="guitar.value"
            :label="guitar.label"
            :title="guitar.label"
            v-for="(guitar, index) in guitars" :key="index" />
        </bc-radio-group>
        <bc-divider :class="['my-1']" />
        <code-chunk :class="['text-center']">v-model:value: {{ config['model:value'] }}</code-chunk>
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
  name: 'PageBcRadioGroup',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      guitar: 'fender',
      config: null
    }
  },
  computed: {
    guitars () {
      return this.config.guitars.map(value => {
        return {
          value,
          label: this.toTitleCase(value)
        }
      })
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
      this.log('@update:value', 'bc-radio-group', $event)
    }
  }
}
</script>
