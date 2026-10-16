import BcApp from './app.vue'

BcApp.install = (Vue) => {
  Vue.component(BcApp.name, BcApp)
}

export default BcApp
