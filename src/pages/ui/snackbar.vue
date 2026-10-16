<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-dropdown @update:value="showSnackbar" :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown @update:value="showSnackbar" :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.autoClose" :label="`autoCloseDelay: ${config.autoCloseDelay}`" :block="false" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1', 'pb-0']">
              <bc-btn block roundness="sm" @click="showSnackbar" :icon-left="config.showSnackbarBtn.iconLeft" :color="config.showSnackbarBtn.color">{{ config.showSnackbarBtn.label }}</bc-btn>
            </bc-grid-col>
          </bc-grid>
        </toolbar>
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
  name: 'PageBcSnackbar',
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
    showSnackbar () {
      this.$nextTick(() => {
        const event = 'bc-snackbar:message'
        const config = this.config
        const message = {
          message: `New Snackbar Message @ ${new Date().getMilliseconds()}`,
          autoCloseDelay: config.autoClose ? config.autoCloseDelay : null,
          color: config.color[0],
          variant: config.variant[0]
        }
        this.log(`@${event}`, 'bc-snackbar', message)
        this.$emitter.emit(event, message)
      })
    }
  }
}
</script>
