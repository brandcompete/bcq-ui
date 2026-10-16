<bc-tabs
  :color="String"
  :compact="Boolean"
  :default-tab="Number"
  :disabled="Boolean"
  :inert="Boolean"
  :size="String"
  :font-weight="String"
  :uppercase="Boolean"
  :icons-provider="String"
  :selected-tab-marker-height="Number"
  :tab-panel-height="String">
  <bc-tabs-panel
    v-for="tab in tabs"
    :disabled="tab.disabled"
    :icon="tab.icon"
    :label="tab.label">
    <bc-lorem-ipsum :repeats="3" />
  </bc-tabs-panel>
</bc-tabs>
