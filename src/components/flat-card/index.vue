<template>
  <bc-card :class="[baseCss, margin]" :elevation="elevation">
    <bc-card-title v-if="title" :truncate="false" :font-size="titleFontSize" :class="['px-2', 'pb-0']">
      <bc-table-layout y-align="middle">
        <bc-table-layout-row>
          <bc-table-layout-cell :class="['w-full']" v-text="title" />
          <bc-table-layout-cell x-align="right" v-if="$slots['title-controls']">
            <slot name="title-controls" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </bc-card-title>
    <bc-divider :class="['mt-1']" v-if="divider" />
    <bc-card-text :padding="contentPadding">
      <slot />
    </bc-card-text>
  </bc-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'FlatCard',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'flat-card',
    }
  },
  props: {
    contentPadding: {
      type: Array,
      default: ['p-1']
    },
    divider: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    titleFontSize: {
      type: String,
      default: 'sm'
    },
    elevation: {
      type: String,
      default: 'none'
    },
    margin: {
      type: Array,
      default () {
        return ['mb-4']
      }
    }
  }
}
</script>
