import BcComponentTemplate from './vid.vue'

BcComponentTemplate.install = (Vue) => {
  Vue.component(BcComponentTemplate.name, BcComponentTemplate)
}

export default BcComponentTemplate
