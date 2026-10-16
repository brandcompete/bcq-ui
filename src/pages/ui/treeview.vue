<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" label="disabled or inert" v-model:value="config.disabledOptionsDropdownSelection" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.checkboxes" label="checkboxes" :block="false" />
              <bc-checkbox v-model:checked="config.showFileIcon" label="show-file-icon" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :span="12" :class="['p-1']">
            <component-work-in-progress name="bc-treeview" />
          </bc-grid-col>
          <bc-grid-col :span="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-treeview
                  @item-click="onItemClick"
                  :items="config.treeview"
                  :show-icon-file="config.showFileIcon"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :size="config.size[0]"
                  :checkboxes="config.checkboxes" />
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
  name: 'PageBcTreeview',
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
    onItemClick ($event) {
      this.log('@item-click', 'bc-treeview', $event)
    }
  }
}
</script>
