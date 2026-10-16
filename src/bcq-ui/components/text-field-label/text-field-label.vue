<template>
  <bc-container :class="componentCssClasses" v-text="text" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTextFieldLabel',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('text-field-label')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.truncate ? 'truncate' : null,
        'select-none'
      ]
    }
  },
  props: {
    text: {
      type: [
        String,
        Number
      ]
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
}
</script>
