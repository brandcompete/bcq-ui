import BcComponentTemplate from './kebabCaseName.vue'

BcComponentTemplate.install = (Vue) => {
  Vue.component(BcComponentTemplate.name, BcComponentTemplate)
}

export default BcComponentTemplate
