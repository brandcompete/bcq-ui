const Intersect = {
  mounted (element, binding) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }
    const options = {
      root: binding.root || null,
      rootMargin: binding.rootMargin || '0px',
      scrollMargin: binding.scrollMargin || '0px',
      threshold: binding.threshold || 1.0
    }
    let watcher = new IntersectionObserver((entries, observer) => {
      const isIntersecting = entries.some(entry => entry.isIntersecting)
      if (binding.value && binding.value.onIntersect) {
        binding.value.onIntersect({
          entries,
          observer,
          isIntersecting,
          element
        })
      }
    }, options)
    watcher.observe(element)
  }
}

export default Intersect
