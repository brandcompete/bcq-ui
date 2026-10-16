const cardProps = {
  props: {
    borderWidth: {
      type: [
        String,
        Number
      ],
      default: 2
    },
    elevation: {
      type: String,
      default: 'md'
    },
    roundness: {
      type: String,
      default: 'md'
    },
    tag: {
      type: String,
      default: 'div'
    },
    to: {
      type: String
    },
    href: {
      type: String
    }
  }
}

export default cardProps
