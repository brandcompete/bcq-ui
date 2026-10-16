<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.toolbarIcon" label="toolbar-icon" :block="false" />
              <bc-checkbox v-model:checked="config.toolbarTitle" label="toolbar-title" :block="false" />
              <bc-checkbox v-model:checked="config.toolbarActions" label="toolbar-title" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-toolbar
          :class="['mx-1', 'mt-0', 'mb-2']"
          :size="config.size[0]"
          :color="config.color[0]"
          :variant="config.variant[0]"
          :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
          :inert="config.disabledOptionsDropdownSelection[0] === 'inert'">
          <bc-toolbar-icon v-if="config.toolbarIcon">
            <bc-icon :name="config.icon" :class="config.iconClasses" />
          </bc-toolbar-icon>
          <bc-toolbar-title v-text="config.title" v-if="config.toolbarTitle" />
          <bc-toolbar-actions v-if="config.toolbarActions">
            <ul :class="['inline-list', 'white-space-nowrap', 'inline-block']">
              <li v-for="action in config.actions" :class="['ml-2']">
                <bc-icon :name="action" :class="config.iconClasses" />
              </li>
            </ul>
          </bc-toolbar-actions>
        </bc-toolbar>
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
  name: 'PageBcToolbar',
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
