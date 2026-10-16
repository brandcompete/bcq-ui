<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-dropdown @update:value="showNotification" :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown @update:value="showNotification" :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.showIcon" label="show icon" :block="false" />
              <bc-checkbox v-model:checked="config.showTitle" label="show title" :block="false" />
              <bc-checkbox v-model:checked="config.dismissible" label="dismissible" :block="false" />
              <bc-checkbox v-model:checked="config.allowAutoClose" :label="`auto close in ${config.autoCloseDelay / 1000} seconds`" :block="false" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1', 'pb-0']">
              <bc-btn block roundness="sm" :icon-left="$icons.notification" :color="config.color[0]" :variant="config.variant[0]" @click="showNotification">Show Notification</bc-btn>
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
  name: 'PageBcNotification',
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
        data.config.icons = this.getRoutes.map(route => {
          return route.icon
        })
        this.config = data.config
        this.showNotification()
      })
    },
    showNotification () {
      this.$nextTick(() => {
        const config = this.config
        const event = 'bc-notification'
        const notification = {
          icon: config.showIcon ? this.getRandomArrayItem(config.icons) : null,
          title: config.showTitle ? this.getConfig.appName : null,
          text: this.getRandomArrayItem(config.lorems),
          dismissible: config.dismissible,
          autoCloseDelay: config.allowAutoClose ? config.autoCloseDelay : null,
          color: config.color[0],
          variant: config.variant[0],
          click: () => {
            this.log('@click', 'bc-notification', notification)
          }
        }
        this.log(`@${event}`, 'bc-notification', notification)
        this.$emitter.emit(event, notification)
      })
    }
  }
}
</script>
