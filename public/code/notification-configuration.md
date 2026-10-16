{
  icon: String | null, // optional icon
  text: String, // optional notification text
  title: String, // optional notification title
  dismissible: Boolean, // show "dismiss" icon
  autoCloseDelay: Number | null, // // optional auto close delay in milliseconds, set null to keep it sticky
  color: String, // optional, one of the ui colors with variants, check /content/colors
  variant: String, // optional color variant, /content/colors
  click () {
    // optional notification click handler
  }
}
