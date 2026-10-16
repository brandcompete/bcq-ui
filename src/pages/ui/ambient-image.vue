<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['px-1']" v-for="slider in config.sliders">
              <bc-slider
                :label="makeSliderLabel(slider.name, slider.model)"
                min-max-labels
                v-model:value="config[slider.model]"
                color="discovery"
                :name="slider.name"
                :step="slider.step"
                :min="slider.min"
                :max="slider.max" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="['p-1']" v-for="image in config.images">
            <bc-card>
              <bc-card-text :class="['p-4']">
                <bc-ambient-image
                  @load="onLoad"
                  @error="onError"
                  :src="image"
                  :opacity="config.opacity"
                  :blur="config.blur"
                  :spread="config.spread" />
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
  name: 'PageBgcAmbientImage',
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
    onLoad ($event) {
      this.log('@load', 'bc-ambient-image', $event)
    },
    onError ($event) {
      this.log('@error', 'bc-ambient-image', $event)
    }
  }
}
</script>
