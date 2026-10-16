<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-navigator-online @change="onNavigatorOnlineChange" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcNavigatorOnline',
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
    onNavigatorOnlineChange ($event) {
      const online = $event.online
      const lang = this.getLang
      this.log('@change', 'bc-navigator-online', online)
      this.$emitter.emit('bc-notification', {
        icon: $event.online ? 'wifi' : 'wifi-alert',
        text: lang.onlineStatus(online),
        title: lang[online ? 'online' : 'offline'],
        dismissible: true,
        autoCloseDelay: 3000,
        color: online ? 'success' : 'danger'
      })
    }
  }
}
</script>
