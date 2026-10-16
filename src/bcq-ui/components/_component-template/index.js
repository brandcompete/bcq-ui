import BcComponentTemplate from './component-template.vue'

BcComponentTemplate.install = (Vue) => {
  Vue.component(BcComponentTemplate.name, BcComponentTemplate)
}

export default BcComponentTemplate
