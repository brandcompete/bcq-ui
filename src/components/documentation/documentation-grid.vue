<template>
  <bc-container :class="[baseCss, 'mt-1']">
    <bc-table-layout v-if="tab" :class="['text-sm']" y-align="middle">
      <bc-table-layout-row :class="['font-semibold', 'uppercase', 'table-layout-thead']">
        <bc-table-layout-cell v-for="(header, index) in types[type]" :key="index" :class="['p-1', 'py-2', `header-${header.toLowerCase()}`, 'white-space-nowrap', ['description'].includes(header) ? 'w-5' : null]" v-text="label(header)" />
      </bc-table-layout-row>
      <bc-table-layout-row v-for="(values, item) in tab" :key="item" :class="['table-layout-tr']">
        <bc-table-layout-cell v-html="item" :class="['white-space-nowrap', 'code', 'p-1', 'py-2']" />
        <bc-table-layout-cell v-for="(value, index) in values" :key="index" :class="['p-1']">
          <div :class="[index < values.length - 1 ? 'code' : null]" v-html="value" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import computed from '../../mixins/computed.js'

export default {
  name: 'DocumentationGrid',
  mixins: [
    computed
  ],
  data () {
    return {
      baseCss: 'documentation-grid',
    }
  },
  props: {
    tab: {
      type: Object
    },
    type: {
      type: String
    },
    types: {
      type: Object,
      default () {
        return {
          props: ['name', 'type', 'required', 'defaultValue', 'description'],
          slots: ['name', 'description'],
          events: ['event', 'returns', 'description']
        }
      }
    }
  },
  methods: {
    label (header) {
      return this.getLang[header] || header
    }
  }
}
</script>
<style>
.documentation-grid .bc-table-layout-cell:first-of-type code,
.documentation-grid .bc-table-layout-cell:last-of-type code
{
  opacity: .5;
}

.documentation-grid a
{
  text-decoration: underline;
}
</style>
