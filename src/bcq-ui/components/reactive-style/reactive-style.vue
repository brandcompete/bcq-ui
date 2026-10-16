<script>
import {
  h
} from 'vue'

export default {
  name: 'BcReactiveStyle',
  render () {
    return h('style', this.$slots.default())
  }
}
</script>
