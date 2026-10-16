<template>
  <bc-grid-col :span="12" v-for="file in codeFiles" :class="['code-files']">
    <syntax-highlight :url="file.uri" :language="file.language" :margin="file.margin" :title="getLang.codeFiles[file.title]" />
  </bc-grid-col>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'CodeFiles',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'code-files',
    }
  },
  props: {
    codeFiles: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
