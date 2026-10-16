// <bc-btn @contextmenu="showContextMenu">@contextmenu click</bc-btn>
// <bc-btn @click="showContextMenu">@click</bc-btn>

showContextMenu ($event) {
  this.$emitter.emit('bc-context-menu:show', {
    $event, // required, https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
    leftIcons: Boolean, // optional (default: undefined), show left icons if available in iconLeft is present in an array item
    rightIcons: Boolean, // optional (default: undefined), show left icons if available in iconLeft is present in an array item
    width: String, // optional (default: '220px'),
    items: [{
      title: String,
      subTitle: String,
      iconLeft: String,
      iconRight: String,
      event: {
        name: 'your-custom-event-name', // custom event name
        data: Object | null // event data that will be passed to the event bus and emitted on item click
      }
    }]
  })
}
