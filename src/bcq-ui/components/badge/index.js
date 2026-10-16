import BcBadge from './badge.vue'

BcBadge.install = (Vue) => {
  Vue.component(BcBadge.name, BcBadge)
}

export default BcBadge
