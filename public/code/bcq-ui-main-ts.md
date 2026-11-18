// Import BCQ UI (types are included in the package)
// Copy variables.css from 'bcq-ui/lib/variables.css' to your 'src' folder, modify colors, etc. if needed,
// and import it BEFORE the BCQ UI styles
import '/your/path/to/variables.css'
import 'bcq-ui/style.css'
import BcqUi from 'bcq-ui'
// Import RecycleScroller, required by <bc-dropdown />
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Import mitt
import mitt from 'mitt'
// Import Material Design Icon font, required by <bc-icon />
import '@mdi/font/css/materialdesignicons.css'

// Add mitt event emitter to the global properties (typed in src/bcq-ui-env.d.ts)
app.config.globalProperties.$emitter = mitt() // Use as this.$emitter.on(event, data), this.$emitter.emit(event, data), etc.

// Register RecycleScroller globally, <bc-dropdown /> uses it as <recycle-scroller />
app.component('RecycleScroller', RecycleScroller)

// use BCQ UI
app.use(BcqUi)
