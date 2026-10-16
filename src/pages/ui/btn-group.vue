<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.icon" v-model:value="config.iconsAndLabelsSelection" label="icons and labels" :visible-items="config.iconsAndLabels.length" :items="mapToDropdownArray(config.iconsAndLabels)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.fontWeight" label="font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" v-for="(group, index) in config.groups" :class="['p-1']">
            <bc-card>
              <bc-card-text>
                <bc-btn-group
                  @update:selection="onUpdateSelection"
                  v-model:selection="group.selection"
                  :class="['m-1', 'mb-0']"
                  :font-weight="config.fontWeight[0]"
                  :size="config.size[0]"
                  :color="config.color[0]"
                  :variant="config.variant[0]"
                  :buttons="getGroup(index)"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :exclusive="group.exclusive" />
              </bc-card-text>
              <bc-divider :class="['m-1']" />
              <bc-card-text x-align="center">
                <code-chunk>v-model:selection: {{ JSON.stringify(group.selection) }}</code-chunk>
              </bc-card-text>
              <bc-divider :class="['m-1']" />
              <bc-card-text x-align="center">
                <code-chunk>exclusive: {{ group.exclusive }}</code-chunk>
              </bc-card-text>
<!--              <bc-divider :class="['my-1']" />-->
<!--              <bc-card-text>-->
<!--                <code-chunk>{{ getGroup(index) }}</code-chunk>-->
<!--              </bc-card-text>-->
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
  name: 'PageBcBtnGroup',
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
    getGroup (index) {
      return this.copyShallow(this.config.groups[index].buttons).map(button => {
        const iconsAndLabels = this.config.iconsAndLabelsSelection[0]
        switch (iconsAndLabels) {
          case 'icon only':
            delete button.label
            break
          case 'label only':
            delete button.icon
        }
        return button
      })
    },
    onUpdateSelection ($event) {
      this.log('@update:selection', 'bc-btn-group', $event)
    }
  }
}
</script>
