<template>
  <bc-container :class="componentCssClasses">
    <bc-divider :class="['my-1']" />
    &copy;{{ date.getFullYear() }} <a :class="['hover:underline']" :href="getConfig.website" rel="noopener" target="_blank" v-text="getConfig.vendor" />&nbsp;
    <router-link to="/sitemap" :class="['underline']" :title="getLang.sitemap">{{ getConfig.version }}</router-link>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'CopyrightNotice',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      date: new Date(),
      baseCss: 'copyright-notice',
    }
  },
  props: {
    size: {
      type: String,
      default: 'xs'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        `text-${this.size}`,
        'font-semibold',
        'opacity-75',
        'text-center',
        'p-1'
      ]
    }
  },
  methods: {}
}
</script>
