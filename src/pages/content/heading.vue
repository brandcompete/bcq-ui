<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.bold" v-model:value="config.fontWeight" label="font-weight" :items="mapToDropdownArray(getWeights)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.divider" label="divider" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :class="['text-center', 'p-1']" :span="12">
            <bc-heading :font-size="config.size[0]" :font-weight="config.fontWeight[0]" :divider="config.divider">
              .{{ config.size[0] }}
            </bc-heading>
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
  name: 'PageBcHeading',
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
