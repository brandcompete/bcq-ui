<template>
  <bc-card tag="router-link" :to="makeLink(component.path)" :href="makeLink(component.path)" :class="componentCssClasses" v-if="component" elevation="none">
    <bc-card-title x-align="center" v-text="getLang.randomComponent" :class="['opacity-50']" />
    <bc-divider />
    <bc-card-title x-align="center" v-text="removeForVue(component.meta.pageTitle)" font-size="xl" />
    <bc-divider />
    <bc-card-text x-align="center" :padding="['p-2']">
      <bc-icon :name="component.icon" :size="iconSize" />
    </bc-card-text>
  </bc-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import FlatCard from '@/components/flat-card/index.vue'

export default {
  name: 'RandomComponent',
  components: {FlatCard},
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'random-component',
      component: null
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        '-mt-3'
      ]
    }
  },
  watch: {
    '$route.path' () {
      this.showRandomComponent()
    }
  },
  props: {
    iconSize: {
      type: Number,
      default: 5
    },
    categories: {
      type: Array,
      default () {
        return [
          'ui',
          'forms',
          'directives'
        ]
      }
    }
  },
  mounted () {
    this.showRandomComponent()
  },
  methods: {
    showRandomComponent () {
      this.component = this.getRandomArrayItem(this.getRoutes.filter(route => route.render).filter(route => this.categories.includes(route.category)))
      if (this.component.path === this.$route.path) {
        this.showRandomComponent()
      }
    },
    makeLink (path) {
      return `${path}${this.getConfig.addTrailingSlashToUrl ? '/' : ''}`
    }
  }
}
</script>
