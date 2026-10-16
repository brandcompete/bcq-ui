import BcCard from './card.vue'

BcCard.install = (Vue) => {
  Vue.component(BcCard.name, BcCard)
}

export default BcCard
