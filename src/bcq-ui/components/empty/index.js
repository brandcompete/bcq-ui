import ComponentTemplate from './empty.vue'

ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate)
}

export default ComponentTemplate
