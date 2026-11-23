import { createApp } from 'vue'
import mitt from 'mitt'
import { RecycleScroller } from 'vue-virtual-scroller'
import BcqUi from '@martin.ivanov.brandcompete/bcq-ui'

// Becquerel UI theme variables (colors, fonts, etc.). Customize them in ./styles/variables.css.
// They must be imported BEFORE the Becquerel UI styles.
import './styles/variables.css'
import '@martin.ivanov.brandcompete/bcq-ui/style.css'
// Material Design Icons, used by <bc-icon />
import '@mdi/font/css/materialdesignicons.css'
// RecycleScroller styles, used by <bc-dropdown />
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import App from './App.vue'

const app = createApp(App)

// Global event bus, required by Becquerel UI. Use it as this.$emitter.on(event, handler), this.$emitter.emit(event, data), etc.
app.config.globalProperties.$emitter = mitt()

// <bc-dropdown /> renders its options with <recycle-scroller />
app.component('RecycleScroller', RecycleScroller)

app.use(BcqUi)

app.mount('#app')
