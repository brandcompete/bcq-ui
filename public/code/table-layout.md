<bc-table-layout
  :border-collapse="Boolean" 
  :height="String"
  :equal-cells="Boolean"
  :y-align="String"
  :x-align="String"
  :width="String">
  <bc-table-layout-row v-for="row in rows">
    <bc-table-layout-cell 
      v-for="cell in row.cells"
      x-align="String"
      :y-align="String"
      :full-width="Boolean"
      :width="String">Cell Content</bc-table-layout-cell>
  </bc-table-layout-row>
</bc-table-layout>
