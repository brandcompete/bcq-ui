<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.paragraph" v-model:value="config.repeats" label="repeats" :items="paragraphs" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" v-model:value="config.fontSize" label="font-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :span="12">
            <bc-lorem-ipsum :repeats="config.repeats[0]" :font-size="config.fontSize[0]" :class="['p-1', 'pb-0s']" />
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
  name: 'PageBcLoremIpsum',
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
  computed: {
    paragraphs () {
      return Array.from(Array(this.config.paragraphsLength).keys()).map(value => {
        value = value + 1
        return {value, label: `${value} paragraph${value > 1 ? 's' : ''}`}
      })
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
