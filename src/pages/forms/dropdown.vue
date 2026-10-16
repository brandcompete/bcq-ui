<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.showIcon" label="icon" :block="false" />
              <bc-checkbox v-model:checked="config.showLabel" label="label" :block="false" />
              <bc-checkbox v-model:checked="config.showHint" label="hint" :block="false" />
              <bc-checkbox v-model:checked="config.error" label="error" :block="false" />
              <bc-checkbox v-model:checked="config.searchable" label="searchable" :block="false" />
              <bc-checkbox v-model:checked="config.fuzzySearch" label="fuzzy-search" :block="false" />
              <bc-checkbox v-model:checked="config.expanded" label="expanded" :block="false" />
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :class="['p-1']" :span="6" v-for="(dropdown, index) in config.dropdowns" :key="index">
            <bc-card :class="['h-full']" elevation="none">
              <bc-card-text :padding="['p-2']">
                <bc-dropdown
                  @update:value="onUpdateValue"
                  v-model:value="dropdown['v-model:value']"
                  :icon="config.showIcon ? config.icon : null"
                  :label="config.showLabel ? config.label : null"
                  :hint="config.showHint ? config.hint : null"
                  :error="config.error"
                  :searchable="config.searchable"
                  :expanded="config.expanded"
                  :fuzzy-search="config.fuzzySearch"
                  :visible-items="dropdown.visibleItems"
                  :size="config.size[0]"
                  :multiple="dropdown.multiple"
                  :labels-uppercase="config.labelsUppercase"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :items="items(dropdown.itemsCount)">
<!--                  <template v-slot:top>top slot</template>-->
<!--                  <template v-slot:bottom>bottom slot</template>-->
                </bc-dropdown>
              </bc-card-text>
              <bc-divider />
              <bc-card-text>
                <code-chunk :class="['text-center']">
                  v-model:value: {{ JSON.stringify(dropdown['v-model:value']) }}
                </code-chunk>
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
  name: 'PageBcDropdown',
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
    items (count) {
      return Array.from(Array(count).keys()).map(value => {
        value = value + 1
        return {
          value: value,
          disabled: false,
          label: `Item ${value} of ${count}`
        }
      })
    },
    onUpdateValue ($event) {
      this.log('@update:value', 'bc-dropdown', $event)
    }
  }
}
</script>
