<template>
  <flat-card :class="[baseCss]" data-anchor="uiColors">
    <bc-grid>
      <bc-grid-col :span="12" :class="['p-2']">
        <bc-heading :divider-margin="['mt-2']" font-size="sm">{{ getLang.uiColors }}</bc-heading>
      </bc-grid-col>
      <bc-grid-col :span="12" :class="['px-2']">
        <section-md :use-router="false" slug="ui-colors.md" />
      </bc-grid-col>
      <bc-grid-col :span="12">
        <toolbar :divider="true" :title="false" :margin="[]">
          <bc-checkbox v-model:checked="viewCssClassNames" :block="false" :label="getLang.viewCssClassNames" />
        </toolbar>
      </bc-grid-col>
    </bc-grid>
    <bc-grid v-for="color in getUiColors">
      <bc-grid-col :xl="3" :lg="6" :md="6" :sm="6" :xs="12" v-for="variant in getUiColorVariants" :class="['p-2']">
<!--        <bc-heading v-if="color === 'primary'" font-weight="normal" font-size="md" :divider="false" :margin="['mb-2']">{{ variant }}</bc-heading>-->
        <bc-card elevation="none" v-tooltip="{position: 'top', text: bgCssClass(color, variant)}" :class="['mb-2']">
          <bc-card-text font-size="sm" :class="[bgCssClass(color, variant), 'code', 'text-center']">
            <bc-container>
              <bc-container v-text="bgCssClass(color, variant)" :class="[viewCssClassNames ? null : 'invisible']" />
            </bc-container>
          </bc-card-text>
        </bc-card>
      </bc-grid-col>
    </bc-grid>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'UiColors',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      viewCssClassNames: true,
      baseCss: 'ui-colors',
    }
  },
  methods: {
    bgCssClass (color, variant) {
      return `bg-${color}-${variant}`
    }
  }
}
</script>
