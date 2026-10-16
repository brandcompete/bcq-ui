const GradientText = {
  mounted (el, binding) {
    let props = binding.value
    if (props) {
      el.style.backgroundImage = `linear-gradient(${(props.tilt || 45) + 'deg'}, ${props.colors.join(',')})`
      el.style['-webkit-background-clip'] = 'text'
      el.style['-webkit-text-fill-color'] = 'transparent'
      el.style['background-clip'] = 'text'
      el.style['text-fill-color'] = 'transparent'
    }
  }
}

export default GradientText
