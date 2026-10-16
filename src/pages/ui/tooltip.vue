<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.placement" v-model:value="config.placement" label="placement" :visible-items="mapToDropdownArray(getPlacements).length" :items="mapToDropdownArray(getPlacements)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.dismissible" label="dismissible" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col v-for="guitar in config.guitars" :xl="3" :lg="3" :md="4" :sm="6" :xs="6" :class="['p-1']">
            <bc-card>
              <bc-card-text>
                <bc-lazy-image :src="guitar" @mouseenter="showTooltip" @mouseleave="hideTooltip" :data-src="guitar" />
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
  name: 'PageBcTooltip',
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
  watch: {
    'config.dismissible' () {
      this.$emitter.emit('bc-tooltip:hide')
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
    showTooltip ($event) {
      let content = null
      let width = null
      const defaultWidth = 180
      const target = $event.currentTarget
      const config = this.config
      let data = {}
      if (target.classList.contains('bc-btn')) {
        content = this.getLang.theBcBtn
        width = `${defaultWidth}px`
      }
      else if (target.classList.contains('bc-lazy-image')) {
        content = `<img src="${target.getAttribute('data-src')}" class="block" width="${defaultWidth}" />`
        width = 'auto'
      }
      else if (target.classList.contains('bc-checkbox') || target.classList.contains('bc-dropdown')) {
        content = target.getAttribute('data-label')
      }
      data = {
        variant: config.variant[0],
        color: config.color[0],
        placement: config.placement[0],
        dismissible: config.dismissible,
        target,
        content,
        width
      }
      this.$emitter.emit('bc-tooltip:show', data)
      this.log('@bc-tooltip:show', 'bc-tooltip', data)
    },
    hideTooltip () {
      if (!this.config.dismissible) {
        this.$emitter.emit('bc-tooltip:hide')
        this.log('@bc-tooltip:hide', 'bc-tooltip', null)
      }
    }
  }
}
</script>
