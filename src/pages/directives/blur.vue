<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12" :key="key">
      <flat-card>
        <toolbar :divider="false" :margin="[]">
          <bc-checkbox v-model:checked="config.blur.blurred" label="v-blur applied" :block="false" />
        </toolbar>
        <bc-grid v-if="config">
          <bc-grid-col :span="6" :class="['p-1']" v-for="(lorem, index) in config.lorems">
            <bc-card elevation="none" v-blur="config.blur">
              <bc-card-text>
                <bc-table-layout y-align="middle">
                  <bc-table-layout-row>
                    <bc-table-layout-cell :class="['w-3', 'p-1']">
                      <bc-lazy-image :class="['shadow-lg']" aspect-ratio="1/1" :src="config.guitar.replace('{index}', index + 1)" />
                    </bc-table-layout-cell>
                    <bc-table-layout-cell :class="['p-1']">
                      <bc-multiline-ellipsis :line-clamp="3">
                        <bc-lorem-ipsum />
                      </bc-multiline-ellipsis>
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                </bc-table-layout>
              </bc-card-text>
              <bc-divider :class="['mb-1']" />
              <bc-card-actions>
                <bc-table-layout y-align="middle" equal-cells>
                  <bc-table-layout-row>
                    <bc-table-layout-cell :class="['px-1']">
                      <bc-btn block color="discovery">{{ getLang.view }}</bc-btn>
                    </bc-table-layout-cell>
                    <bc-table-layout-cell :class="['px-1']">
                      <bc-btn block color="success">{{ getLang.addToCart }}</bc-btn>
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                </bc-table-layout>
              </bc-card-actions>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcBlur',
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
  watch: {
    'config.blur.blurred' () {
      this.key++
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
