import BcLoremIpsum from './lorem-ipsum.vue'

BcLoremIpsum.install = (Vue) => {
  Vue.component(BcLoremIpsum.name, BcLoremIpsum)
}

export default BcLoremIpsum
