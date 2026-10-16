import BcLazyImage from './lazy-image.vue'

BcLazyImage.install = (Vue) => {
  Vue.component(BcLazyImage.name, BcLazyImage)
}

export default BcLazyImage
