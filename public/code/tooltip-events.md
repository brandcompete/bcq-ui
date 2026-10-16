// <bc-btn @mouseenter="showTooltip" @mouseleave="hideTooltip">hover to show tooltip</bc-btn>

// show tooltip
showTooltip ($event) {
  this.$emitter.emit('bc-tooltip:show', {
    target: $event.currentTarget,
    content: String | HTMLElement,
    variant: String, // optional
    color: String, // optional
    placement: String, // optional
    dismissible: String, // optional
    size: String, // optional
    zIndex: String, // optional
    width: String, // optional
    roundness: String, // optional
    width: String // optional
  })
}

// hide tooltip
hideTooltip ($event) {
  this.$emitter.emit('bc-tooltip:hide')
}
