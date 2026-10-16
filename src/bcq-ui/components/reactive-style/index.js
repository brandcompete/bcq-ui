import BcReactiveStyle from './reactive-style.vue'

BcReactiveStyle.install = (Vue) => {
  Vue.component(BcReactiveStyle.name, BcReactiveStyle)
}

export default BcReactiveStyle
