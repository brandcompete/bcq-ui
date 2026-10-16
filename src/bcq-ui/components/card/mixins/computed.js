const cardComputed = {
  computed: {
    cssClasses () {
      return [
        this.baseCss,
        this.padding
      ]
    }
  }
}

export default cardComputed
