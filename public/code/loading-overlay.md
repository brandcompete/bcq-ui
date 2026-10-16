<bc-app>
  <!-- recommended location: app.vue, as a child of <bc-app /> -->
  <bc-loading-overlay
    @update:visible="Function"
    v-model:visible="Boolean" 
    :icon="String" 
    :icon-provider="String" 
    :size="String" 
    :z-index="Number" />
</bc-app>
