import ComponentTemplate from './grid-col.vue'

ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate)
}

export default ComponentTemplate
