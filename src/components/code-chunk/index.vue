<template>
  <bc-container :class="[baseCss]"><bc-container :tag="tag" :class="[`text-${size}`, 'white-space-break-spaces', 'overflow-auto']"><slot /></bc-container></bc-container>
</template>
<script>
export default {
  name: 'CodeChunk',
  data () {
    return {
      baseCss: 'code-chunk',
    }
  },
  props: {
    tag: {
      type: String,
      default: 'pre'
    },
    size: {
      type: String,
      default: 'sm'
    }
  }
}
</script>
