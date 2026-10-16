import ComponentTemplate from './container.vue'

ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate)
}

export default ComponentTemplate
