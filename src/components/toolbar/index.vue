<template>
  <bc-container :class="[baseCss, margin]">
    <template v-if="title">
      <bc-container :class="['text-center', 'small-caps', 'font-semibold', 'lowercase', 'opacity-50', 'pb-1', 'px-1']">{{ getLang.toolbarTitle }}</bc-container>
      <bc-divider />
    </template>
    <bc-table-layout x-align="right">
      <bc-table-layout-cell :class="[padding]">
        <slot />
        <bc-divider v-if="divider" :class="['mt-2']" />
      </bc-table-layout-cell>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import computed from '@/mixins/computed.js'

export default {
  name: 'Toolbar',
  mixins: [
    computed
  ],
  data () {
    return {
      baseCss: 'toolbar',
    }
  },
  props: {
    title: {
      type: Boolean,
      default: true
    },
    xAlign: {
      type: String,
      default: 'right'
    },
    margin: {
      type: Array,
      default () {
        return ['mb-3']
      }
    },
    divider: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Array,
      default () {
        return ['pb-2']
      }
    }
  }
}
</script>
