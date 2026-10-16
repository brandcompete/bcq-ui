const sliderProps = {
  props: {
    block: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: 'sm'
    },
    height: {
      type: Number,
      default: 8
    },
    hint: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    max: {
      type: [
        Number,
        String
      ],
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    minMaxLabels: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    showSelectedRange: {
      type: Boolean,
      default: true
    },
    step: {
      type: [
        Number,
        String
      ],
      default: 1
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'solid'
    },
    width: {
      type: String
    }
  }
}

export default sliderProps
