<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(['none'].concat(getUiColors))" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="size" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-checkbox v-model:checked="config.title" label="bc-card-title" :block="false" />
              <bc-checkbox v-model:checked="config.text" label="bc-card-text" :block="false" />
              <bc-checkbox v-model:checked="config.actions" label="bc-card-actions" :block="false" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'text-center', 'p-1']">
              <bc-container v-html="getLang.colorAndVariantCanBeSetPerBcCardSubComponent" :class="['font-italic', 'text-xs', 'font-semibold', 'mt-1', 'opacity-75']" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :class="['p-1']" :xl="4" :lg="4" :md="4" :sm="12" :xs="12" v-for="card in config.cards">
            <bc-card elevation="none">
              <template v-if="config.title">
                <bc-card-title :color="config.color[0]" :variant="config.variant[0]">Card Title</bc-card-title>
                <bc-divider />
              </template>
              <template v-if="config.text">
                <bc-card-text overflow="auto" :class="['h-14rem']">
                  <bc-lorem-ipsum :repeats="3" />
                </bc-card-text>
                <bc-divider />
              </template>
              <bc-card-actions v-if="config.actions">Card Actions</bc-card-actions>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcCard',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
