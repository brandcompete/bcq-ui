<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="12" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown label="distortion" :icon="$icons.distortion" v-model:value="config.distortion" :visible-items="mapToDropdownArray(config.distortions).length" :items="mapToDropdownArray(config.distortions)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="12" :xs="12"  :class="['align-content-center', 'align-center']">
              <bc-checkbox v-model:checked="config.floatBackground" label="float background" :block="false" :class="['mt-3']" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="12" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown :icon="$icons.image" v-model:value="config.selectedBackground" label="change background" :visible-items="mapToDropdownArray(config.backgrounds).length" :items="mapToDropdownArray(config.backgrounds)" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <liquid-glass :distortion="config.distortion[0]" :background="config.selectedBackground[0]" :float-background="config.floatBackground" />
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import LiquidGlass from '@/components/liquid-glass/index.vue'

export default {
  name: 'PageBcLiquidGlass',
  components: {
    LiquidGlass
  },
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
