<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card :key="key">
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.placement" v-model:value="config.placement" label="placement" :visible-items="mapToDropdownArray(getBadgePlacements).length" :items="mapToDropdownArray(getBadgePlacements)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['px-1', 'text-center']">
              <bc-checkbox v-model:checked="config.visible" label="v-model:visible" :block="false" />
              <bc-checkbox v-model:checked="config.showIcon" label="icon" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid v-for="(value, type) in config.badgeComponents">
          <bc-grid-col :span="12" :class="['p-1']">
            <bc-card>
              <bc-card-title :class="['text-center']">
                <code-chunk>applied to &lt;{{ type }} /&gt;</code-chunk>
              </bc-card-title>
            </bc-card>
          </bc-grid-col>
          <bc-grid-col v-for="(component, index) in value" :xl="2" :lg="2" :md="6" :sm="6" :xs="6" :class="['p-1']">
            <bc-card>
              <bc-card-text :class="['text-center', 'py-4']">
                <bc-badge v-model:visible="config.visible" :icon="config.showIcon ? config.icon : null" :value="randomInt(config.valuesRange[0], config.valuesRange[1])" :color="config.color[0]" :placement="config.placement[0]" :variant="config.variant[0]">
                  <bc-icon tag="router-link" to="/ui/icon" :name="component" v-if="type === 'bc-icon'" :size="3" />
                  <bc-btn roundness="sm" uppercase block tag="router-link" to="/ui/btn" v-if="type === 'bc-btn'" color="info">{{ component }}</bc-btn>
                  <bc-avatar :class="['cursor-pointer']" tag="router-link" to="/ui/avatar" v-if="type === 'bc-avatar'" :src="component" size="96px" />
                  <bc-chip clickable tag="router-link" to="/ui/chip" color="success" :icon="config.badgeComponents['bc-icon'][index]" :dismissible="false" v-if="type === 'bc-chip'">{{ component }}</bc-chip>
                </bc-badge>
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
  name: 'PageBcBadge',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      key: 0,
      config: null,
      inteval: null
    }
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    clearInterval(this.inteval)
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
        this.inteval = setInterval(() => {
          this.key++
        }, data.config.randomValuesInterval)
      })
    }
  }
}
</script>
