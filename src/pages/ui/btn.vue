<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.icon" v-model:value="config.iconDropdownSelection" label="icon, icon-left or icon-right" :items="mapToDropdownArray(config.propControls.iconDropdown)" :visible-items="config.propControls.iconDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.propControls.disabledOptionsDropdown)" :visible-items="config.propControls.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-for="(checkbox, index) in config.propControls.checkboxes" :key="index" :block="false" v-model:checked="config[checkbox['model:checked']]" :label="checkbox.label" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1']">
              <component-work-in-progress name="bc-btn" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid v-for="color in getUiColors">
          <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="6" v-for="variant in getUiColorVariants" :class="['p-1']">
            <bc-heading v-if="color === 'primary'" font-weight="normal" font-size="sm" :class="['mb-4', 'text-center']">{{ variant }}</bc-heading>
            <bc-btn
              :tag="config.tag"
              :block="config.block"
              :size="config.size[0]"
              :color="color.toLowerCase()"
              :variant="variant"
              :loading="config.loading"
              :font-weight="config.fontWeight"
              :uppercase="config.uppercase"
              :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
              :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
              :icon="config.iconDropdownSelection[0] === 'icon only' ? config.icon : null"
              :icon-left="config.iconDropdownSelection[0] === 'icon left' ? config.icon : null"
              :icon-right="config.iconDropdownSelection[0] === 'icon right' ? config.icon : null">{{ capitalizeFirstLetter(color) }}</bc-btn>
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
  name: 'PageBcBtn',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      size: null,
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
    onDisplayUpdate () {},
    onDisabledUpdate () {},
    onUppercaseUpdate () {},
    onLoadingUpdate () {}
  }
}
</script>
