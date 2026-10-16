// custom bcq-ui.js
import AspectRatio from '{repo}directives/aspect-ratio.js'
import Blur from '{repo}directives/blur.js'
import DefaultBtn from '{repo}directives/default-btn.js'
import GradientText from '{repo}directives/gradient-text.js'
import Intersect from '{repo}directives/intersect.js'
import LiquidGlass from '{repo}directives/liquid-glass.js'
import ScrollLock from '{repo}directives/scroll-lock.js'
import Tooltip from '{repo}directives/tooltip.js'
import Resize from '{repo}directives/resize.js'
import Ripple from '{repo}directives/ripple.js'

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
