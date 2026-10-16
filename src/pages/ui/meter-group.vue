<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card :margin="['mb-4']">
        <toolbar :margin="[]" :divider="false">
          <bc-grid :class="['text-center']">
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'align-content-center']">
              <bc-checkbox v-model:checked="config.labelsUppercase" :disabled="!config.labelAndHint" label="labels-uppercase" :block="false" :class="['mt-4']" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'align-content-center']">
              <bc-checkbox v-model:checked="config.labelAndHint" label="label and hint" :block="false" :class="['mt-4']" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'align-content-center']">
              <bc-checkbox v-model:checked="config.clickable" label="clickable" :block="false" :class="['mt-4']" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.meterLabelSize" label="meter-label-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" :class="['p-1']" v-for="group in config.meterGroups">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-meter-group :clickable="config.clickable" :labels-uppercase="config.labelsUppercase" :roundness="config.roundness" :height="config.height" :label="config.labelAndHint ? group.label : null" :hint="config.labelAndHint ? group.hint : null" :meter-label-size="config.meterLabelSize[0]">
                  <template v-slot:label="slotProps">
                    <bc-icon :size="1.25" :name="slotProps.data.icon" v-if="slotProps.data.icon" :style="{color: slotProps.data.color[0]}" :class="['m-1', 'align-middle']" />
                    <span v-else :class="['inline-block', 'align-middle', `border-round-${config.roundness}`, 'm-1']" :style="{background: slotProps.data.color[0], width: config.height, height: config.height}" />
                    <span :class="['inline-block']">{{ slotProps.data.label }} ({{ slotProps.data.value }})</span>
                  </template>
                  <bc-meter-group-item @item-click="onItemClick" :color="item.color" :icon="item.icon" :label="item.label" v-model:value="item.value" v-for="item in group.items" />
                </bc-meter-group>
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
  name: 'PageBcMeterGroup',
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
      this.log('@item-click', 'bc-meter-group', $event)
    }
  }
}
</script>
