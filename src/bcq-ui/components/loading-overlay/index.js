import BcLoadingOverlay from './loading-overlay.vue'

BcLoadingOverlay.install = (Vue) => {
  Vue.component(BcLoadingOverlay.name, BcLoadingOverlay)
}

export default BcLoadingOverlay
