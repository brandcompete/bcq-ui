<bc-breadcrumbs
  :use-router="Boolean"
  :underline="Boolean"
  :font-size="String"
  :last-item-disabled="Boolean"
  :target="String"
  :divider="String"
  :x-align="String">
  <bc-breadcrumbs-item :to="item.to" v-for="item in breadcrumbs">{{ item.label }}</bc-breadcrumbs-item>
</bc-breadcrumbs>
