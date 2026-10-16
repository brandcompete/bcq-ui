<template>
  <bc-container :class="[baseCss]">{{ baseCss }}</bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'ComponentName',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'component-name',
    }
  },
  props: {
  },
  mounted () {
  },
  methods: {}
}
</script>
