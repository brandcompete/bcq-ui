<bc-meter-group
  :clickable="Boolean"
  :height="String"
  :hint="String"
  :elevation="String"
  :label="String"
  :labels-uppercase="Boolean"
  :meter-label-size="String"
  :roundness="Boolean">
  <template v-slot:label="slotProps">
    <!--
    You can use the slotProps.data (icon, label, color, value) object 
    to format the labels of the nested bc-meter-group-item subcomponents
    -->
    {{ slotProps.data }}
  </template>
  <bc-meter-group-item
    v-for="item in items"
    v-model:value="item.value (String)"
    @item-click="Function"
    @update:value="Function"
    :color="item.color (Array)"
    :label="item.label (String)"
    :icon="item.icon (String)" />
</bc-meter-group>
