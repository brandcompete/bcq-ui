<bc-grid :no-gutter="Boolean" :wrap="Boolean">
  <bc-grid-col 
    v-for="col in cols" 
    :span="Number"
    :fixed="Boolean"
    :offset="Number"
    :xs="Number"
    :sm="Number"
    :md="Number"
    :lg="Number"
    :xl="Number"
    :width="String">Column content</bc-grid-col>
</bc-grid>
