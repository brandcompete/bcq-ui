const toolbarComputed = {
  computed: {
    parent () {
      return this.$parent.$parent.$parent.$parent.$parent
    },
    parentProps () {
      return this.parent.$props
    }
  }
}

export default toolbarComputed
