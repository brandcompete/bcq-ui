<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <bc-card :class="['overflow-hidden']" elevation="none">
        <bc-card-text :padding="[]" overflow="hidden" font-size="sm">
          <bc-table-layout :class="['text-center', 'text-white']" equal-cells>
            <bc-table-layout-row>
              <bc-table-layout-cell y-align="middle" :class="['w-3', config.padding, makeBgColor(config.slots['sidebar-left'], 700)]">
                <slot-info>sidebar-left</slot-info>
                <bc-divider :class="['my-1', 'opacity-50']" />
                <slot-info>sidebar-left-controls</slot-info>
              </bc-table-layout-cell>
              <bc-table-layout-cell>
                <bc-table-layout v-aspect-ratio="16/9">
                  <bc-table-layout-row>
                    <bc-table-layout-cell :class="[config.padding, makeBgColor(config.slots['header'])]">
                      <slot-info>header</slot-info>
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                  <bc-table-layout-row>
                    <bc-table-layout-cell y-align="middle" :class="['h-full', config.padding, makeBgColor(config.slots['main'], 700)]">
                      <slot-info>main</slot-info>
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                  <bc-table-layout-row>
                    <bc-table-layout-cell :class="[config.padding, makeBgColor(config.slots['footer'])]">
                      <slot-info>footer</slot-info>
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                </bc-table-layout>
              </bc-table-layout-cell>
              <bc-table-layout-cell y-align="middle" :class="['w-3', config.padding, makeBgColor(config.slots['sidebar-right'], 700)]">
                <slot-info>sidebar-right</slot-info>
                <bc-divider :class="['my-1', 'opacity-50']" />
                <slot-info>sidebar-right-controls</slot-info>
              </bc-table-layout-cell>
            </bc-table-layout-row>
          </bc-table-layout>
        </bc-card-text>
      </bc-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import SlotInfo from '../../components/slot-info/index.vue'

export default {
  name: 'PageBcLayout',
  components: {
    SlotInfo
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
