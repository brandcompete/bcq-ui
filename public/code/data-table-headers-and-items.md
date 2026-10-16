<bc-data-table
  @row-click="Function($event)"
  @row-dblclick="Function($event)"
  v-model:visible-columns="Array"
  :clickable-rows="Boolean"
  :disabled="Boolean"
  :headers="Array"
  :headers-font-size="String"
  :headers-font-weight="String"
  :headers-uppercase="Boolean"
  :height="String"
  :hoverable="Boolean"
  :icon-provider="String"
  :inert="Boolean"
  :items="Array"
  :items-font-size="String"
  :no-matching-records-found-label="String"
  :padding="Array"
  :searchable="Boolean"
  :searchable-icon="String"
  :searchable-label="String"
  :search-input-align="String"
  :search-input-clearable="Boolean"
  :search-input-grid-span="Number"
  :sortable="Boolean"
  :toggle-columns="Boolean"
  :visible-columns-context-menu-height="String"
  :visible-columns-context-menu-width="String"
  :visible-columns-context-menu-z-index="Number"
  :unselectable-rows="Boolean"
  :x-align="Boolean"
  :y-align="Boolean"
  :zebra-rows="Boolean">
    <template v-slot:header>optional header slot</template>
    <template v-slot:footer>optional footer slot</template>
    <!-- examples of custom components, check the header props example how to define them -->
    <template v-slot:first-name="slotProps">
      <!-- check documentation and the Headers, Items and Visible Columns Props section -->
      <my-custom-first-name-component :custom-prop-or-v-model="slotProps.data" />
    </template>
    <template v-slot:last-name="slotProps">
      <!-- check documentation and the Headers, Items and Visible Columns Props section -->
      <my-custom-last-name-component :custom-prop-or-v-model="slotProps.data" />
    </template>
    <template v-slot:last-name="slotProps">
      <!-- check documentation and the Headers, Items and Visible Columns Props section -->
      <my-custom-age-component :custom-prop-or-v-model="slotProps.data" />
    </template>
</bc-data-table>
