import ComponentTemplate from './skeleton-loader.vue'

ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate)
}

export default ComponentTemplate
