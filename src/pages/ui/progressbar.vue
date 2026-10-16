<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.progressColor" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
              <bc-checkbox v-model:checked="config.indeterminate" label="indeterminate" :block="false" />
              <bc-checkbox v-model:checked="config.reversed" label="reversed" :block="false" />
              <bc-checkbox v-model:checked="config.icons" label="icons" :block="false" />
              <bc-checkbox v-model:checked="config.label" label="label" :block="false" />
              <bc-checkbox v-model:checked="config.hint" label="hint" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-progressbar
          ref="progressbar"
          @icon-left-click="onIconLeftClick"
          @icon-right-click="onIconRightClick"
          v-model:value="config['v-model:value']"
          :block="config.block"
          :label="config.label ? 'Progressbar Label' : null"
          :hint="config.hint ? 'Progressbar Hint' : null"
          :percentage-to-fixed="config.percentageToFixed"
          :comparator="config.comparator"
          :indeterminate="config.indeterminate"
          :reversed="config.reversed"
          :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
          :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
          :size="config.size[0]"
          :elevation="config.elevation"
          :icon-cursor="config.iconCursor"
          :icon-left="config.icons ? config.iconLeft : null"
          :icon-right="config.icons ? config.iconRight : null"
          :height="config.height"
          :roundness="config.roundness"
          :progress-color="config.progressColor[0]"
          :labels-uppercase="config.labelsUppercase"
        />
        <bc-divider :class="['my-1']" />
        <code-chunk :class="['text-center']">v-model:value: {{ config['v-model:value'] }}</code-chunk>
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
  name: 'PageBcProgressbar',
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
    onIconLeftClick ($event) {
      this.config['v-model:value'] -= this.config.progressStep
      this.toggleIcon()
      this.progressLog('left')
    },
    onIconRightClick ($event) {
      this.config['v-model:value'] += this.config.progressStep
      this.toggleIcon()
      this.progressLog('right')
    },
    progressLog (icon) {
      this.log(`@icon-${icon}-click`, 'bc-progressbar', 'HTMLElement', this.config['v-model:value'])
    },
    toggleIcon () {
      const config = this.config
      const value = config['v-model:value']
      const progressbar = this.$refs['progressbar'].$el
      const iconLeft = progressbar.querySelector('.bc-progressbar-icon-left')
      const iconRight = progressbar.querySelector('.bc-progressbar-icon-right')
      iconLeft.classList[value === 0 ? 'add' : 'remove']('disabled')
      iconRight.classList[value === config.comparator ? 'add' : 'remove']('disabled')
    }
  }
}
</script>
