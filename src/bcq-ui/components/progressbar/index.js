import BcProgressbar from './progressbar.vue'

BcProgressbar.install = (Vue) => {
  Vue.component(BcProgressbar.name, BcProgressbar)
}

export default BcProgressbar
