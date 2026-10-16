<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.position" v-model:value="config.position" label="position" :items="mapToDropdownArray(getPositions.slice(0, 3))" :visible-items="getPositions.slice(0, 3).length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.xAlign" v-model:value="config.xAlign" label="x-align" :items="mapToDropdownArray(getXAlign)" :visible-items="getXAlign.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :disabled="['static'].includes(config.position[0])" :icon="$icons.yAlign" v-model:value="config.yAlign" label="y-align" :items="mapToDropdownArray(getYAlign)" :visible-items="getYAlign.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.vertical" label="vertical" :block="false" />
              <bc-checkbox v-model:checked="config.rotateIconOnExpand" label="rotate-icon-on-expand" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :span="12" v-for="dial in config.dials">
            <bc-card elevation="none">
              <bc-card-text v-aspect-ratio="16/9" :class="['relative', 'page-bc-speed-dial-demo']" overflow="auto">
                <bc-speed-dial
                  @item-click="onItemClick"
                  :roundness="config.roundness"
                  :color="config.color[0]"
                  :variant="config.variant[0]"
                  :size="config.size[0]"
                  :elevation="config.elevation"
                  :position="config.position[0]"
                  :vertical="config.vertical"
                  :x-align="config.xAlign[0]"
                  :y-align="config.yAlign[0]"
                  :z-index="config.zIndex"
                  :rotate-icon-on-expand="config.rotateIconOnExpand"
                  :items="dial.items" />
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
  name: 'PageBcSpeedDial',
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
      this.log('@item-click', 'bc-speed-dial', $event)
    }
  }
}
</script>
<style>
.page-bc-speed-dial-demo
{
  background: no-repeat url('/images/misc/stormy-weather-at-freshwater-bay.jpg') 100%/cover;
}
</style>
