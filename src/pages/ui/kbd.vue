<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card :class="['text-center']">
        <toolbar :margin="[]">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="1" :lg="1" :md="1" :sm="2" :xs="2" v-for="letter in config.alphabet" :class="['p-1']">
            <bc-kbd :value="letter" :title="letter" :color="config.color[0]" :size="config.size[0]" :variant="config.variant[0]" />
          </bc-grid-col>
        </bc-grid>
        <bc-divider :class="['my-1']" />
        <bc-grid>
          <bc-grid-col :xl="1" :lg="1" :md="1" :sm="2" :xs="2" v-for="letter in config.alphabet" :class="['p-1', 'lowercase']">
            <bc-kbd :value="letter" :title="letter" :color="config.color[0]" :size="config.size[0]" :variant="config.variant[0]" />
          </bc-grid-col>
        </bc-grid>
        <bc-divider :class="['my-1']" />
        <bc-grid>
          <bc-grid-col :xl="1" :lg="1" :md="1" :sm="2" :xs="2" v-for="number in arrayFrom(config.numbers, false)" :class="['p-1']">
            <bc-kbd :value="number" :title="number" :color="config.color[0]" :size="config.size[0]" :variant="config.variant[0]" />
          </bc-grid-col>
        </bc-grid>
        <bc-divider :class="['my-1']" />
        <bc-grid>
          <bc-grid-col :span="2" v-for="symbol in config.symbols" :class="['p-1']">
            <bc-kbd :value="symbol" :title="symbol" :color="config.color[0]" :size="config.size[0]" :variant="config.variant[0]" />
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
  name: 'PageBcKbd',
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
