<template>
  <bc-grid :class="[baseCss]" v-if="page" data-anchor="page-data">
    <bc-grid-col>
      <syntax-highlight :data="page" language="json" :title="getLang.pageData" />
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import computed from '../../mixins/computed.js'

export default {
  name: 'PageData',
  mixins: [
      computed
  ],
  data () {
    return {
      visible: true,
      baseCss: 'page-data',
    }
  },
  props: {
    page: {
      type: Object
    }
  }
}
</script>
