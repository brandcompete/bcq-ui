const en = {
  home: 'Home',
  planned: 'What\'s Coming',
  existing: 'New Features, Improvements and Bugfixes',
  pageLinks: 'On This Page',
  documentation: 'Documentation',
  topOfThePage: 'Top',
  scales: 'font-size',
  weights: 'font-weight',
  content: 'Content, Style and Color',
  previewOnDarkLightBackground: 'Dark Theme',
  ui: 'UI Components',
  randomComponent: 'Random Component or Directive',
  forms: 'Form Components',
  directives: 'Directives',
  checked: 'Checked',
  value: 'Value',
  sitemap: 'Sitemap',
  indeterminate: 'indeterminate',
  props: 'Props',
  slots: 'Slots',
  size: 'Size',
  color: 'Color',
  variant: 'Variant',
  events: 'Events',
  name: 'Name',
  type: 'Type',
  required: 'Required',
  defaultValue: 'Default Value',
  description: 'Description',
  event: 'Event',
  returns: 'Return Value',
  pageData: 'Page Data',
  search: 'Search Documentation...',
  colorSwatches: 'Colors with Modifiers',
  viewCssClassNames: 'View CSS Classes',
  uiColors: 'UI Colors with Variants',
  firstName: 'Name',
  lastName: 'Surname',
  email: 'Email',
  phoneNumber: 'Phone Number',
  message: 'Message',
  agreeToTos: 'Agree to terms of service',
  subscribeToMailingList: 'Subscribe to mailing list',
  toggleVisibility: 'Visible',
  toggleIcon: 'Icon',
  toggleLightDarkTheme: 'Toggle Dark/Light Theme',
  dismissible: 'Dismissible',
  noDocumentationFound: 'Nothing found',
  tryDifferentSearch: 'Try a different search',
  noIconsFound: 'No icons found',
  theme: 'Theme',
  age: 'Age',
  paragraphs: 'Paragraphs',
  copy: 'Copy',
  animation: 'Animation',
  copiedToClipboard: 'Copied to clipboard',
  twelveColumnGrid: '12 Column Grid',
  responsiveGrid: 'Responsive Grid (Resize the Viewport)',
  clickToViewRipple: 'Click to View Ripple',
  workExperience: 'Years of work experience',
  tooltip: 'Tooltip',
  theBcBtn: 'The bc-btn component is just a normal HTML button on steroids',
  hoverToShowTooltip: 'Hover to Show Tooltip',
  hideDialogBoxManually: 'Click <span class="underline">here</span> to close the dialog box in case you set <code>dismiss-button</code> to <code>false</code>, while <code>persistent</code> is <code>true</code> or <code>title-bar</code> is <code>false</code>',
  componentHasSubComponents: 'This component has required sub-components. Use the dropdown on the right to view their documentation.',
  siteWorkInProgress: 'BCQ3 and this website are still under development. Some documentation, code samples, and demos are not yet available, but they will be added progressively. We appreciate your patience.',
  colorAndVariantCanBeSetPerBcCardSubComponent: '* Note that the <code>color</code> and <code>variant</code> props can be set per subcomponent, although for this demo we set them only to <code>&lt;bc-card-title /&gt;</code></code>',
  view: 'View',
  addToCart: 'Add To Cart',
  noFlagsFound: `No flags found...`,
  toolbarTitle: 'Demo Configurator',
  componentIsRequired: 'Component is always included',
  customBundler: 'Custom Bundler',
  bundleCode: 'Get Code',
  searchComponents: 'Search Components...',
  consoleMessages: 'New Console Messages',
  clearConsole: 'Clear Console',
  clearConsoleOnPathChange: 'clear on path change',
  online: 'Online',
  offline: 'Offline',
  share: 'Share BCQ3',
  rightClickTableHeaders: 'Right click on table headers to hide/show columns',
  codeFiles: {
    'run-bcq-cli': 'Run BCQ CLI',
    'component-tags': 'Vue component (all slots, events and props, including optional)',
    'notification-configuration': 'Notification config',
    'notification-showing-a-message': 'Showing a notification',
    'snackbar-message-configuration': 'Snackbar message configuration',
    'sending-a-message-to-snackbar': 'Showing a snackbar message',
    'directive': 'Using the directive',
    'tooltip-show-hide': 'Showing and hiding the tooltip',
    'treeview-items-config': 'Treeview items configuration',
    'using-the-directive': 'Using the directive',
    'intersect-callback': 'Intersect callback',
    'intersect-config': 'Intersect configuration',
    'flag-cdn': 'Include from CDN in your index.html',
    'flag-js-module': 'Import as a JavaScript module in your main.js',
    'context-menu-items': 'Context menu items config',
    'context-menu-show': 'Show context menu',
    'context-menu-subscribe': 'Subscribe to the custom item(s) event',
    'split-btn-items': 'Split button items array',
    'dropdown-items': 'Dropdown items array',
    'timeline-items': 'Timeline items array',
    'speed-dial-items': 'Speed Dial items array',
    'data-table-headers-items-visible-columns': 'Headers, Items and Visible Columns Props',
    'svg-icon-sprite': 'Example of SVG icon sprite component to use with <code>&lt;bc-svg-icon /&gt;</code>',
    'btn-group-buttons': 'Button group <code>buttons</code> prop array'
  },
  'getting-started': 'Getting Started',
  onlineStatus (online) {
    return `You are currently ${online ? 'online' : 'offline'}`
  },
  bcTextFieldLabel (type) {
    return `Type some ${type}...`
  },
  toggleConsole (expanded) {
    return `${expanded ? 'Hide' : 'Show'} Console`
  },
  consoleWrap (wrap) {
    return `${wrap ? 'Disable' : 'Enable'} line-wrap`
  },
  setTheme (dark) {
    return `Set ${dark ? 'light' : 'dark'} theme`
  },
  componentDocumentation (component) {
    return `documentation for <code class="opacity-50">&lt;${component} /&gt;</code>`
  },
  noDocumentationForComponentTab (tab) {
    return `No component ${tab.toLowerCase()}`
  },
  componentWorkInProgress (name, type = 'component') {
    return `The ${type} "${name}" is not fully implemented yet or is missing documentation or code samples.`
  },
  showLoadingOverlay (timeout) {
    return 'Show Loading Overlay' // `Show Loading Overlay for ${timeout} seconds`
  },
  copyToClipboard (item) {
    return `Copy ${item} to clipboard`
  },
  tooltipPosition (position) {
    return `${position} Tooltip`
  },
  uiCategoryPageTitle (category, items, slug) {
    return `${items} ${category}${['content', 'getting-started'].includes(slug) ? ' items' : ''}`
  },
  clampAt (value) {
    return `Clamp ${value} line${value === 1 ? '' : 's'}`
  },
  searchFlags (length) {
    return `Search ${length} flags by country, code, capital city and continent...`
  },
  searchIcons (icons) {
    return `Search ${icons} Icons...`
  },
  dependencies (dependencies) {
    return `Dependencies: ${dependencies.join(', ')}`
  }
}

export default en
