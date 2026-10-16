// Import BCQ UI
// Copy variables.css from 'bcq-ui/src/bcq-ui/styles/variables.css' to your 'src' folder and include in your app's main.js
import '/your/path/to/variables.css'
import BcqUi from 'bcq-ui/src/lib.js'
// Import RecycleScroller, required by <bc-dropdown />
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Import mitt
import mitt from 'mitt'
// Import Material Design Icon font, required by <bc-icon />
import '@mdi/font/css/materialdesignicons.css'

// Import Quill Rich Text Editor stylesheet(s), required by <bc-editor />
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'

// Add mitt event emitter to the global properties
app.config.globalProperties.$emitter = mitt() // Use as this.$emitter.on(event, data), this.$emitter.emit(event, data), etc.

// use BCQ UI
app.use(BcqUi)
