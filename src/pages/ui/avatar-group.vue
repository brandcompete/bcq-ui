<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown label="color" @update:value="updateKey" :icon="$icons.color" v-model:value="config.color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown label="variant" @update:value="updateKey" :icon="$icons.variant" v-model:value="config.variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-slider v-model:value="config.gap" :label="makeSliderLabel('gap', 'gap')" color="discovery" :step="1" :min-max-labels="true" :min="config.gapsMin" :max="config.gapsMax" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-slider v-model:value="config.limit" :label="makeSliderLabel('limit', 'limit')" color="discovery" :step="1" :min-max-labels="true" :min="0" :max="config.groups[0].items.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox @update:checked="updateKey" v-model:checked="config.tile" label="tile" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid :class="['text-center']">
          <bc-grid-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" v-for="group in config.groups" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-avatar-group :key="key" :limit-color="config.color[0]" :limit-variant="config.variant[0]" :limit-tile="config.tile" :gap="config.gap" :limit="config.limit">
                  <bc-avatar :tile="config.tile" :color="config.color[0]" :variant="config.variant[0]" v-for="item in group.items" :icon="item.icon" :src="item.src">{{ item.label }}</bc-avatar>
                </bc-avatar-group>
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
  name: 'PageBcAvatarGroup',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      key: 0,
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
    updateKey () {
      this.key++
    }
  }
}
</script>
