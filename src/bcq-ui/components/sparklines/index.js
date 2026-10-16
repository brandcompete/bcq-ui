import BcSparklines from './sparklines.vue'

BcSparklines.install = (Vue) => {
  Vue.component(BcSparklines.name, BcSparklines)
}

export default BcSparklines
