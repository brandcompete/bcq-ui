<template>
  <bc-container :class="componentCssClasses">{{ baseCss }}</bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcComponentTemplate',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('kebabCaseName')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss
      ]
    }
  },
  props: {
  },
  methods: {
  }
}
</script>
<style>

</style>
