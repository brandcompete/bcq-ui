<bc-collapsible
  :animation-speed="Number"
  :content-max-height="String"
  :content-size="String"
  :content-size="Array"
  :multiple="config.multiple"
  :disabled="Boolean"
  :elevation="String"
  :header-font-weight="String"
  :header-size="String"
  :icon-collapse="String"
  :icon-expand="String"
  :icon-provider="String"
  :inert="Inert"
  :multiple="Boolean"
  :roundness="String">
  <bc-collapsible-item
    @update:expanded="Function"
    v-model:expanded="item.expanded"
    v-for="item in items"
    :icon="item.icon"
    :label="item.label"
    :sub-label="item.subLabel">
    Collapsible item content
    <!-- <template v-slot:top></template> -->
    <!-- <template v-slot:right></template> -->
    <!-- <template v-slot:bottom></template> -->
    <!-- <template v-slot:left></template> -->
  </bc-collapsible-item>
</bc-collapsible>
