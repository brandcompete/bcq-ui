<template>
  <bc-container :class="[baseCss]">
    <bc-alert :dismissible="false" :icon="$icons.info" color="discovery" variant="solid">{{ getLang.componentWorkInProgress(name, type) }}</bc-alert>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'ComponentWorkInProgress',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'component-work-in-progress',
    }
  },
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'component'
    }
  }
}
</script>
