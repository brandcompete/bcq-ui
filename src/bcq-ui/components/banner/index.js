import BcBanner from './banner.vue'

BcBanner.install = (Vue) => {
  Vue.component(BcBanner.name, BcBanner)
}

export default BcBanner
