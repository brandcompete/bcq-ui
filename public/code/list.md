<bc-list :clickable="Boolean" :disabled="Boolean" :divider="Boolean" :elevation="String" :hoverable="Boolean" :inert="Boolean" :max-height="String">
  <bc-list-item v-for="item in list" :disabled="Boolean" :href="String" :inert="Boolean" :tag="String" :to="String">
    <bc-list-item-icon :padding="Array">
      <bc-icon :name="item.icon" />
    </bc-list-item-icon>
    <bc-list-item-content :padding="Array">
      <bc-list-item-content-title :font-size="String" :font-weight="String" :truncate="Boolean">{{ item.title }}</bc-list-item-content-title>
      <bc-list-item-content-sub-title :font-size="String" :font-weight="String" :truncate="Boolean">{{ item.subTitle }}</bc-list-item-content-sub-title>
    </bc-list-item-content>
  </bc-list-item>
</bc-list>
