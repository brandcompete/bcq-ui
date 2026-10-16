const Tooltip = {
  mounted (el, binding) {
    let props = binding.value
    if (typeof binding.value === 'string') {
      props = {
        text: binding.value,
        position: 'top'
      }
    }
    if (props) {
      el.classList.add('bcq-tooltip', `bcq-tooltip-${props.position || 'top'}`)
      el.setAttribute('data-tooltip', props.text)
    }
  }
}

export default Tooltip
