const Blur = {
  mounted (element, binding) {
    Blur.blur(element, binding.value)
  },
  updated (element, binding) {
    Blur.blur(element, binding.value)
  },
  blur (element, value) {
    if (!value) {
      value = {
        blurred: true
      }
    }
    const style = {
      filter: value.blurred ? `blur(${value.blur || 5}px)` : 'none',
      opacity: value.blurred ? value.opacity || 0.5 : 1,
      userSelect: value.blurred ? 'none' : 'unset',
      pointerEvents: value.blurred ? 'none' : 'unset'
    }
    Object.keys(style).forEach(item => {
      element.style[item] = style[item]
    })
  }
}

export default Blur
