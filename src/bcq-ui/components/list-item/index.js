import BcListItem from './list-item.vue'

BcListItem.install = (Vue) => {
  Vue.component(BcListItem.name, BcListItem)
}

export default BcListItem
