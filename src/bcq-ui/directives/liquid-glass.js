const LiquidGlass = {
  mounted (element, binding) {
    const baseCss = 'bc-liquid-glass'
    const config = binding.value || {
      background: 'rgba(255, 255, 255, .05)'
    }
    element.classList.add(baseCss)
    Object.keys(config).forEach(item => {
      element.style[item] = config[item]
    })
  }
}

export default LiquidGlass
