<bc-radio-group
  v-model:value="Number, String"
  @update:value="Function"
  :name="String"
  :icon-checked="String"
  :icon-unchecked="String"
  :icon-provider="String"
  :disabled="Boolean"
  :inert="Boolean"
  :label-uppercase="Boolean"
  :label-font-weight="String"
  :vertical="Boolean"
  :size="String"
  :x-align="String">
  <bc-radio
    :value="radio.value"
    :label="radio.label"
    :disabled="radio.disabled"
    :inert="radio.inert"
    v-for="radio in radios" />
</bc-radio-group>
