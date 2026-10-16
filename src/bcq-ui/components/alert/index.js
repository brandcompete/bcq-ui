import ComponentTemplate from './alert.vue'

ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate)
}

export default ComponentTemplate
