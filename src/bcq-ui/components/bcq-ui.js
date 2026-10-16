import AspectRatio from '../directives/aspect-ratio.js'
import Blur from '../directives/blur.js'
import DefaultBtn from '../directives/default-btn.js'
import GradientText from '../directives/gradient-text.js'
import Intersect from '../directives/intersect.js'
import LiquidGlass from '../directives/liquid-glass.js'
import ScrollLock from '../directives/scroll-lock.js'
import Tooltip from '../directives/tooltip.js'
import Resize from '../directives/resize.js'
import Ripple from '../directives/ripple.js'

const BcUi = {
  install (Vue, opts = {}) {
    if (this.installed) {
      return
    }
    Vue.directive('aspect-ratio', AspectRatio)
    Vue.directive('blur', Blur)
    Vue.directive('default-btn', DefaultBtn)
    Vue.directive('gradient-text', GradientText)
    Vue.directive('intersect', Intersect)
    Vue.directive('liquid-glass', LiquidGlass)
    Vue.directive('scroll-lock', ScrollLock)
    Vue.directive('tooltip', Tooltip)
    Vue.directive('resize', Resize)
    Vue.directive('ripple', Ripple)

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key]
        Vue.use(c)
      })
    }
    this.installed = true
  }
}

export default BcUi
