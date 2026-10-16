<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.noClamping" label="no clamping" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.clamp" :disabled="config.noClamping" v-model:value="config.lineClamp" :items="lineClamps" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-card>
          <bc-card-text>
            <bc-multiline-ellipsis @click="config.noClamping = !config.noClamping" :line-clamp="config.noClamping ? null : config.lineClamp[0]" :class="['cursor-pointer']">{{ config.loremIpsum }}</bc-multiline-ellipsis>
          </bc-card-text>
        </bc-card>
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
  name: 'PageBcMultilineEllipsis',
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
  computed: {
    lineClamps () {
      return Array.from(Array(this.config.lineClamps).keys()).map(value => {
        value = value + 1
        return {
          value,
          label: this.getLang.clampAt(value)
        }
      })
    }
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
