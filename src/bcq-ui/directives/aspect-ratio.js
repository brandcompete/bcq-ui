const AspectRatio = {
  mounted (el, binding) {
    if (binding && binding.value) {
      el.style.aspectRatio = binding.value
    }
  }
}

export default AspectRatio
