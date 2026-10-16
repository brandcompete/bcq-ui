import BcNotification from './notification.vue'

BcNotification.install = (Vue) => {
  Vue.component(BcNotification.name, BcNotification)
}

export default BcNotification
