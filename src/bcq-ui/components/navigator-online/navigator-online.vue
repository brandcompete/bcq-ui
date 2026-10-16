<script>
export default {
  name: 'BcNavigatorOnline',
  data () {
    return {
      online: null
    }
  },
  watch: {
    online () {
      this.$emit('change', {
        online: this.online
      })
    }
  },
  render () {
    return null
  },
  mounted () {
    addEventListener('online', () => {
      this.online = true
    })
    addEventListener('offline', () => {
      this.online = false
    })
    this.online = navigator.onLine
  }
}
</script>
