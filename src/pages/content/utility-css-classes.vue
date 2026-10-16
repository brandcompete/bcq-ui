<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <template v-for="item in classes">
        <utility-css-classes-spacing :config="config.classes[item]" :sub-title="item" />
        <utility-css-classes-others :config="config.classes[item]" :sub-title="item" />
      </template>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import UtilityCssClassesSpacing from '@/components/utility-css-classes-spacing/index.vue'

// @todo: add all utility classes to /public/data/pages/content/utility-css-classes.json
export default {
  name: 'PageBcUtilityCssClasses',
  components: {
    UtilityCssClassesSpacing
  },
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
    }
  },
  computed: {
    classes () {
      return Object.keys(this.config.classes)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
