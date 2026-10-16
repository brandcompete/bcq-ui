<template>
  <bc-container :class="componentCssClasses" :style="componentStyle">
    <bc-alert v-model:visible="notification.visible" @click="onNotificationClick(notification)" :data-notification-id="notification.id" :class="alertCssClasses" :color="notification.color || 'primary'" :variant="notification.variant || 'solid'" :dismissible="notification.dismissible" :icon="notification.icon" :elevation="elevation" v-for="(notification, index) in notifications">
      <bc-heading v-if="notification.title" font-size="sm" :divider="false" :margin="['mb-1']">{{ notification.title }}</bc-heading>
      <bc-container v-text="notification.text" v-if="notification.text" />
      <bc-reactive-style>
      .bc-notification.bc-notification-{{ right ? 'right' : 'left' }} .bc-alert[data-notification-id="{{ notification.id }}"].bc-notification-dismissed
      {
        opacity: 0;
        transform: translateX({{ right ? parseInt(width, 10) : parseInt(width, 10) * -1 }}px);
      }
      </bc-reactive-style>
    </bc-alert>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcNotification',
  mixins: [
    methods
  ],
  data () {
    return {
      notifications: [],
      baseCss: this.componentBaseCss('notification')
    }
  },
  computed: {
    componentCssClasses () {
      const right = this.right
      const baseCss = this.baseCss
      return [
        baseCss,
        this.bottom ? 'flex-column-reverse' : 'justify-content-start',
        this.padding,
        this.notifications.length ? null : 'hidden',
        right ? 'right-0' : 'left-0',
        right ? `${baseCss}-right` : `${baseCss}-left`,
        'fixed',
        'h-device',
        'top-0',
        'flex',
        'flex-column',
        'pointer-events-none',
        'overflow-auto'
      ]
    },
    componentStyle () {
      return {
        width: this.width,
        zIndex: this.zIndex
      }
    },
    alertCssClasses () {
      return [
        this.margin,
        'pointer-events-all',
        'transition-all',
        'transition-duration-300',
        'transition-ease-in-out'
      ]
    }
  },
  props: {
    bottom: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: 'xl'
    },
    margin: {
      type: Array,
      default: ['my-2']
    },
    padding: {
      type: Array,
      default: ['px-3', 'py-2']
    },
    right: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '320px'
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  created () {
    this.bind()
  },
  methods: {
    bind () {
      this.$emitter.on('bc-notification', data => {
        data.id = `bc-notification-${this.uuid()}`
        if (data.autoCloseDelay) {
          data.timer = this.sleep(data.autoCloseDelay).then(() => {
            this.dismissNotification(data.id)
          })
        }
        this.notifications.push(data)
      })
    },
    dismissNotification (id) {
      const node = this.getNotificationNodeById(id)
      if (node) {
        node.classList.add(`${this.baseCss}-dismissed`)
      }
      this.sleep(150).then(() => {
        this.getNotificationDataById(id).visible = false
      })
    },
    getNotificationDataById (id) {
      return this.notifications.find(notification => notification.id === id)
    },
    getNotificationNodeById (id) {
      return this.$el.querySelector(`[data-notification-id="${id}"]`)
    },
    onNotificationClick (notification) {
      if (notification.click) {
        notification.click()
      }
    }
  }
}
</script>
<style>
@media (max-width: 480px)
{
  .bc-notification
  {
    width: 100% !important;
  }
}
</style>
