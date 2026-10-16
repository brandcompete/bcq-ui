import '{repo}styles/normalize.css'
import '{repo}styles/animation.css'
import '{repo}styles/border.css'
import '{repo}styles/effects.css'
import '{repo}styles/flexbox.css'
import '{repo}styles/grid.css'
import '{repo}styles/interactivity.css'
import '{repo}styles/layout.css'
import '{repo}styles/sizing.css'
import '{repo}styles/spacing.css'
import '{repo}styles/table-layout.css'
import '{repo}styles/transform.css'
import '{repo}styles/transition.css'
import '{repo}styles/typography.css'
import '{repo}styles/colors.css'
import '{repo}styles/tooltip.css'
import '{repo}styles/css-slider.css'
import '{repo}styles/liquid-glass.css'

// path to your custom components.js
import * as components from '/path/to/components.js'

function BcqUi (Vue) {
  Vue.use(components.BcqUi, {
    components
  })
}

export default BcqUi
