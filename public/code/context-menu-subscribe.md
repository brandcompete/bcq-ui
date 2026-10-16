this.$emitter.on('your-custom-event-name', (type, config) => {
  console.log(`@${type}`, config)
})
