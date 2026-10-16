<template>
  <flat-card :class="[baseCss]" v-if="!hide.includes(subTitle)" :title="subTitle" :data-anchor="subTitle">
    <bc-grid>
      <bc-grid-col v-for="(item, index) in config.items" :xl="4" :lg="4" :md="6" :sm="6" :xs="12" :class="['p-1', cols(index)]">
        <bc-card elevation="none" :class="['text-center']">
          <bc-card-text>
            <bc-table-layout y-align="middle">
              <bc-table-layout-row>
                <bc-table-layout-cell :class="['w-full']" x-align="center">
                  <code-chunk>.{{ item }}</code-chunk>
                </bc-table-layout-cell>
                <bc-table-layout-cell x-align="right">
                  <bc-icon @click="copyClass(item)" :name="$icons.copy" :title="getLang.copy" :class="copyCodeIconCssClasses"/>
                </bc-table-layout-cell>
              </bc-table-layout-row>
            </bc-table-layout>
          </bc-card-text>
          <template v-if="showAsPropValue">
            <bc-divider :class="['mx-2']" />
            <bc-card-text>
              <code-chunk>"{{ item.replace(showAsPropValue, '') }}"</code-chunk>
            </bc-card-text>
          </template>
        </bc-card>
      </bc-grid-col>
    </bc-grid>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'UtilityCssClassesOthers',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'utility-css-classes-others',
    }
  },
  props: {
    showAsPropValue: {
      type: String
    },
    config: {
      type: Object
    },
    subTitle: {
      type: String
    },
    hide: {
      type: Array,
      default: [
        'padding',
        'margin'
      ]
    }
  },
  methods: {
    cols (index) {
      const length = this.config.items.length
      return length === 1 ? 'col' : (index === length - 1 || index === length - 2) && !this.isOdd(length) ? 'col' : null
    }
  }
}
</script>
