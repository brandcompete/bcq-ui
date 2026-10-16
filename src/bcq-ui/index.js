import './styles/normalize.css'
import './styles/animation.css'
import './styles/border.css'
import './styles/effects.css'
import './styles/elevation.css'
import './styles/flexbox.css'
import './styles/grid.css'
import './styles/interactivity.css'
import './styles/layout.css'
import './styles/sizing.css'
import './styles/spacing.css'
import './styles/table-layout.css'
import './styles/transform.css'
import './styles/transition.css'
import './styles/typography.css'
import './styles/colors.css'
import './styles/tooltip.css'
import './styles/css-slider.css'
import './styles/liquid-glass.css'
import * as components from './components'

function BcqUi (Vue) {
  Vue.use(components.BcqUi, {
    components
  })
}

export default BcqUi
