<template>
  <bc-grid :class="[baseCss, 'px-1']" v-if="page" data-anchor="top">
    <bc-grid-col :span="12" v-if="breadcrumbs.length">
      <bc-breadcrumbs x-align="right" :class="['uppercase']">
        <bc-breadcrumbs-item :to="item.to" v-for="(item, index) in breadcrumbs" :key="index" :title="item.label">{{ item.label }}</bc-breadcrumbs-item>
      </bc-breadcrumbs>
    </bc-grid-col>
    <bc-grid-col :span="12" :class="['mb-4']">
      <bc-table-layout y-align="middle">
        <bc-table-layout-row>
          <bc-table-layout-cell :class="['w-full']">
            <bc-heading tag="h1" :truncate="false" v-gradient-text="{ tilt: 90, colors: getConfig.homePageGradient }" font-size="2xl" :divider="false">{{ removeForVue(page.meta.pageTitle) }}</bc-heading>
          </bc-table-layout-cell>
          <bc-table-layout-cell>
            <bc-icon v-if="getCurrentRoute" v-gradient-text="{ tilt: 90, colors: getConfig.homePageGradient }" :name="getCurrentRoute.icon" :size="3" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </bc-grid-col>
  </bc-grid>
  <bc-reactive-style v-if="breadcrumbs.length > 3">
  .page-title .bc-breadcrumbs li:nth-of-type(4),
  .page-title .bc-breadcrumbs li:nth-of-type(3) span
  {
    display: none;
  }
  .page-title .bc-breadcrumbs li:nth-of-type(3)
  {
    pointer-events: none;
    opacity: .5;
  }
  </bc-reactive-style>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'PageTitle',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'page-title',
      breadcrumbs: []
    }
  },
  props: {
    page: {
      type: Object
    }
  },
  watch: {
    page () {
      this.setDocumentMeta(this.page.meta)
      this.setBreadcrumbs()
    }
  },
  methods: {
    setBreadcrumbs () {
      const parts = this.$route.path.split('/')
      const breadcrumbs = []
      const lang = this.getLang
      if (this.$route.path === '/') {
        return this.breadcrumbs = []
      }
      parts.forEach((part, index) => {
        breadcrumbs.push({
          to: index === 0 ? '/' : index === 1 ? '/' + part : '/' + parts[index - 1] + '/' + part,
          label: part === '' ? lang.home : lang[part] || part.replace(/-/g, ' ')
        })
      })
      this.breadcrumbs = breadcrumbs
    }
  }
}
</script>
<style>
@media (max-width: 575.98px) {
  .page-title .bc-breadcrumbs
  {
    display: none;
  }
}
</style>
