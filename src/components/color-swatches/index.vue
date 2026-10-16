<template>
  <flat-card :margin="margin" :class="[baseCss]" data-anchor="colorSwatches">
    <bc-grid v-if="title">
      <bc-grid-col :span="12" :class="['p-2']">
        <bc-heading :divider-margin="['mt-2']" font-size="sm">{{ getLang.colorSwatches }}</bc-heading>
      </bc-grid-col>
      <bc-grid-col :span="12" :class="['px-2']">
        <section-md :use-router="false" slug="color-swatches.md" />
      </bc-grid-col>
    </bc-grid>
    <bc-grid v-if="toolbar">
      <bc-grid-col :span="12">
        <toolbar :divider="true" :title="false" :margin="[]">
          <bc-checkbox v-model:checked="viewCssClassNames" :block="false" :label="getLang.viewCssClassNames" />
        </toolbar>
      </bc-grid-col>
    </bc-grid>
    <bc-grid v-for="color in colors" :key="color">
      <bc-grid-col :span="12" v-if="name" :class="['p-2']">
        <bc-heading :margin="['my-2']" font-weight="normal" :divider="false" font-size="md">{{ color }}</bc-heading>
      </bc-grid-col>
      <bc-grid-col v-for="(modifier, index) in modifiers" :xl="viewCssClassNames ? 3 : 1" :lg="viewCssClassNames ? 3 : 1" :md="viewCssClassNames ? 4 : 2" :sm="viewCssClassNames ? 6 : 2" :xs="viewCssClassNames ? 12 : 3" :class="['p-2']">
        <bc-card elevation="none" :class="['h-full', bgCssClass(color, modifier), textCssClassReverse(color, modifier, index)]" v-tooltip="{position: 'top', text: tooltip(color, modifier)}">
          <bc-card-text font-size="sm" :class="['code', 'text-center']">
            <bc-container v-if="viewCssClassNames">
              <bc-container v-text="bgCssClass(color, modifier)" />
              <bc-divider />
              <bc-container v-text="textCssClass(color, modifier)" />
              <bc-divider />
              <bc-container v-text="borderCssClass(color, modifier)" />
            </bc-container>
            <bc-container v-else v-aspect-ratio="1/1" />
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
  name: 'ColorSwatches',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      viewCssClassNames: false,
      baseCss: 'color-swatches',
    }
  },
  props: {
    margin: {
      type: Array,
      default () {
        return [
          'mb-4'
        ]
      }
    },
    title: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    name: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Array,
      default () {
        return []
      }
    },
    modifiers: {
      type: Array,
      default () {
        return [
          50,
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900,
          950,
          1000
        ]
      }
    }
  },
  methods: {
    bgCssClass (color, modifier) {
      return `bg-${color}-${modifier}`
    },
    textCssClass (color, modifier) {
      return `text-${color}-${modifier}`
    },
    borderCssClass (color, modifier) {
      return `border-${color}-${modifier}`
    },
    tooltip (color, modifier) {
      return `${this.bgCssClass(color, modifier)} | ${this.textCssClass(color, modifier)} | ${this.borderCssClass(color, modifier)}`
    },
    textCssClassReverse (color, modifier, index) {
      const modifiers = this.copyShallow(this.modifiers).reverse()
      return `text-${color}-${[500, 600].includes(modifier) ? 1000 : modifiers[index]}`
    }
  }
}
</script>
