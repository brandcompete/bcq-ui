<template>
  <bc-grid>
    <bc-grid-col :span="12">
      <flat-card v-if="ready">
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown label="change data source" :icon="$icons.grid" v-model:value="config.selectedGrid" :items="mapToDropdownArray(config.grids)" :visible-items="config.grids.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.filter" v-model:value="config.searchInputAlign" label="search-input-align" :disabled="!config.searchable" :items="mapToDropdownArray(config.searchInputAlignments)" :visible-items="config.searchInputAlignments.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.sortable" label="sortable" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.toggleColumns" label="toggle-columns" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.searchable" label="searchable" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.hoverable" label="hoverable" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.clickableRows" label="clickable-rows" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'text-left']">
              <bc-checkbox v-model:checked="config.zebraRows" label="zebra-rows" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :span="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-data-table
                  @row-click="onRowClick"
                  @row-dblclick="onRowDblclick"
                  v-model:visible-columns="config.dataTable.visibleColumns"
                  :clickable-rows="config.clickableRows"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :headers="config.dataTable.headers"
                  :headers-font-size="config.headersFontSize[0]"
                  :headers-uppercase="config.headersUppercase"
                  :height="config.height"
                  :hoverable="config.hoverable"
                  :icon-provider="config.iconProvider"
                  :items="config.dataTable.items"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :no-matching-records-found-label="config.noMatchingRecordsFoundLabel"
                  :padding="config.padding"
                  :searchable="config.searchable"
                  :searchable-icon="config.searchableIcon"
                  :searchable-label="config.searchableLabel"
                  :search-input-align="config.searchInputAlign[0]"
                  :search-input-clearable="config.searchInputClearable"
                  :search-input-grid-span="config.searchInputGridSpan"
                  :sortable="config.sortable"
                  :toggle-columns="config.toggleColumns"
                  :zebra-rows="config.zebraRows">
                  <template v-slot:header v-if="config.toggleColumns">
                    <bc-container v-text="getLang.rightClickTableHeaders" :class="['text-right', 'text-xs', 'uppercase', 'font-semibold', 'opacity-75', 'px-1']" />
                  </template>
<!--                  <template v-slot:footer>footer template</template>-->
                  <template v-slot:first-name="slotProps">
                    <bc-text-field v-model:value="slotProps.data" />
                  </template>
                  <template v-slot:last-name="slotProps">
                    <bc-text-field v-model:value="slotProps.data" />
                  </template>
                  <template v-slot:image="slotProps">
                    <bc-lazy-image :src="`${slotProps.data}?${this.rnd()}`" aspect-ratio="1/1" :options="{ root: null, rootMargin: '0px', scrollMargin: '0px', threshold: 0.5 }" />
                  </template>
                </bc-data-table>
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" v-if="config" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcDataTable',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      ready: false,
      config: null
    }
  },
  watch: {
    'config.selectedGrid' () {
      this.getGridData()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        data.config.selectedGrid = [data.config.grids[0]]
        this.config = data.config
      })
    },
    getGridData () {
      this.$http({url: this.config.selectedGrid[0]}).then(response => {
        this.config.dataTable = response.data
        this.ready = true
      })
    },
    onRowClick ($event) {
      this.log('@row-click', 'bc-data-table', $event)
    },
    onRowDblclick ($event) {
      this.log('@row-dblclick', 'bc-data-table', $event)
    }
  }
}
</script>
