const cardProps = {
  props: {
    padding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    fontSize: {
      // 'xs', 'sm', 'md' ('base'), 'lg', '3xs', '2xs', 'xs', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'
      type: String,
      default: 'sm'
    },
    xAlign: {
      type: String
    }
  }
}

export default cardProps
