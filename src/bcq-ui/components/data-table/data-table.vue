<template>
  <bc-container :inert="inert" :data-table="id" :class="[componentCssClasses]">
    <bc-grid v-if="$slots['header'] || searchable" :class="['mb-2']">
      <bc-grid-col :span="searchable ? 12 - searchInputGridSpan : 12" :class="['align-content-center', searchInputAlign === 'left' ? 'flex-order-1' : null]">
        <slot name="header" />
      </bc-grid-col>
      <bc-grid-col v-if="searchable" :span="searchInputGridSpan" :class="['align-content-center']">
        <bc-text-field block v-model:value="search" :clearable="searchInputClearable" :placeholder="searchableLabel" :icon-left="searchableIcon" :icon-provider="iconProvider" />
      </bc-grid-col>
    </bc-grid>
    <div :class="tableWrapperCssClasses">
      <table :class="tableCssClasses">
        <thead :class="theadCssClasses" @contextmenu.prevent="showVisibleColumnsContextMenu">
        <tr :class="theadTrCssClasses">
          <th v-for="(header, index) in headers" :key="index" :class="[sortable ? ['cursor-pointer', 'select-none'] : null, header.cssClasses || []]" :data-col="header.value" @click="sortable && toggleSort(index)">
            <bc-table-layout>
              <bc-table-layout-row>
                <bc-table-layout-cell :class="thCssClasses">
                  <span v-text="header.label" :class="['inline-block']" />
                  <bc-icon v-if="sortable" size="1.25" :provider="iconProvider" :class="['align-middle', 'opacity-50', 'ml-1']" :name="sortingIcons(index)" />
                </bc-table-layout-cell>
              </bc-table-layout-row>
            </bc-table-layout>
          </th>
        </tr>
        </thead>
        <tbody :class="tBodyCssClasses">
        <tr v-for="item in filteredItems" :class="tBodyTrCssClasses" @dblclick="onDblClick(item)" @click="onRowClick(item)">
          <td :class="[tdCssClasses, getHeaderByValue(header).cssClasses || [], config.cssClasses || []]" v-for="(config, header) in item" :data-col="header">
            <slot v-if="getHeaderByValue(header).slot || config.slot" :name="getHeaderByValue(header).slot || config.slot" :data="config" />
            <template v-else>{{ config }}</template>
          </td>
        </tr>
        </tbody>
      </table>
      <bc-container v-if="!filteredItems.length" v-text="noMatchingRecordsFoundLabel" :class="['text-center', 'p-3', 'opacity-50', 'text-xs', 'uppercase', 'font-semibold']" />
      <bc-reactive-style>
      [data-table="{{ id }}"] .bc-data-table-table
      {
        grid-template-columns: repeat({{ toggleColumns ? visibleColumns.length : headers.length }}, auto);
      }
      [data-table="{{ id }}"] .bc-data-table-table-header-row,
      [data-table="{{ id }}"] .bc-data-table-table-body-row,
      [data-table="{{ id }}"] .bc-data-table-table
      {
        align-items: {{ yAlign }};
      }
      [data-table="{{ id }}"] .bc-data-table-table-body
      {
        height: {{ height }};
      }
      </bc-reactive-style>
    </div>
    <bc-container v-if="$slots['footer']">
      <slot name="footer" />
    </bc-container>
    <template v-if="toggleColumns">
      <bc-card @click.prevent.stop :class="visibleColumnsContextMenuStyles" :style="visibleColumnsContextMenuCoords" elevation="2xl">
        <bc-card-text :padding="[]">
          <bc-list divider clickable hoverable :max-height="visibleColumnsContextMenuHeight" :style="{width: visibleColumnsContextMenuWidth}">
            <bc-list-item v-for="header in headers" @click="toggleColumn(header.value)" :class="[visibleColumns.includes(header.value) ? 'opacity-100' : 'opacity-50']">
              <bc-list-item-icon>
                <bc-checkbox :class="['pointer-events-none']" :checked="visibleColumns.includes(header.value)" />
              </bc-list-item-icon>
              <bc-list-item-content>
                <bc-list-item-content-sub-title :class="['text-sm']" v-text="header.label" />
              </bc-list-item-content>
            </bc-list-item>
          </bc-list>
        </bc-card-text>
      </bc-card>
      <bc-reactive-style v-for="key in headerKeys">
      [data-table="{{ id }}"] [data-col="{{ key }}"]
      {
        display: {{ visibleColumns.includes(key) ? 'initial' : 'none' }};
      }
      </bc-reactive-style>
    </template>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

// @todo pagination
// @todo items-per-page
// @todo items-per-page-dropdown
// @todo selectable rows
// @todo visible vertical scrollbar
// @todo drag and drop to rearrange columns

/**
 * headers:
 * [{
 *  value: String,
 *  label: String,
 *  slot: String,
 *  cssClasses: String
 * }]
 *
 * items: [{
 *  headerValueKey1: { String, Number, Object, Array, Date },
 *  headerValueKey2: { String, Number, Object, Array, Date }
 * }]
 *
 * slots:
 * <template v-slot:header>header slot</template>
 * <template v-slot:footer>footer slot</template>
 */

export default {
  name: 'BcDataTable',
  mixins: [
    methods
  ],
  data () {
    return {
      id: `bc-data-table-${this.uuid()}`,
      baseCss: this.componentBaseCss('data-table'),
      sortIndex: null,
      sortDirection: 'ascending',
      search: '',
      visibleColumnsContextMenuCoords: null
    }
  },
  emits: [
    'update:visibleColumns',
    'row-click',
    'row-dblclick'
  ],
  props: {
    clickableRows: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default () {
        return []
      }
    },
    headersFontSize: {
      type: String,
      default: 'sm'
    },
    headersFontWeight: {
      type: String,
      default: 'semibold',
      validator: value => {
        return [
          'light',
          'normal',
          'medium',
          'semibold',
          'bold'
        ].includes(value)
      }
    },
    headersUppercase: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    itemsFontSize: {
      type: String,
      default: 'sm'
    },
    noMatchingRecordsFoundLabel: {
      type: String,
      default: 'No matching records found...'
    },
    padding: {
      type: Array,
      default () {
        return [
          'p-1'
        ]
      }
    },
    searchable: {
      type: Boolean,
      default: false
    },
    searchableIcon: {
      type: String,
      default: 'filter'
    },
    searchableLabel: {
      type: String,
      default: 'Filter Rows...'
    },
    searchInputAlign: {
      type: String,
      default: 'left',
      validator (value) {
        return [
          'left',
          'right'
        ].includes(value)
      }
    },
    searchInputClearable: {
      type: Boolean,
      default: true
    },
    searchInputGridSpan: {
      type: Number,
      default: 4,
      validator (value) {
        return value > 0 && value <= 12
      }
    },
    sortable: {
      type: Boolean,
      default: false
    },
    toggleColumns: {
      type: Boolean,
      default: false
    },
    visibleColumns: {
      type: Array,
      default () {
        return []
      }
    },
    visibleColumnsContextMenuHeight: {
      type: String,
      default: '236px'
    },
    visibleColumnsContextMenuWidth: {
      type: String,
      default: '300px'
    },
    visibleColumnsContextMenuZIndex: {
      type: Number,
      default: 1000
    },
    unselectableRows: {
      type: Boolean
    },
    xAlign: {
      type: String,
      default: 'left',
      validator: value => {
        return [
          'left',
          'center',
          'right'
        ].includes(value)
      }
    },
    yAlign: {
      type: String,
      default: 'center',
      validator: value => {
        return [
          'start',
          'center',
          'end'
        ].includes(value)
      }
    },
    zebraRows: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleColumnsContextMenuStyles () {
      return [
        this.visibleColumnsContextMenuCoords ? 'opacity-100' : ['opacity-0', 'pointer-events-none'],
        'fixed'
      ]
    },
    headerKeys () {
      return this.headers.map(header => {
        return header.value
      })
    },
    filteredItems () {
      let items = this.items
      // if searchable
      if (this.search?.trim()) {
        const search = this.search.trim().toLowerCase()
        items = items.filter(row =>
            Object.values(row).some(cell => {
              const value = cell
              const text = Array.isArray(value) ? value.join(' ') : String(value ?? '')
              return text.toLowerCase().includes(search)
            })
        )
      }
      if (!this.sortable || this.sortIndex === null || !items.length) {
        return items
      }
      // if searchable
      const key = Object.keys(items[0])[this.sortIndex]
      if (key === undefined) {
        return items
      }
      const dir = this.sortDirection === 'ascending' ? 1 : -1
      return [...items].sort((a, b) => {
        const av = a[key] ?? ''
        const bv = b[key] ?? ''
        const an = parseFloat(String(av).replace(/[^0-9.\-]/g, ''))
        const bn = parseFloat(String(bv).replace(/[^0-9.\-]/g, ''))
        if (!isNaN(an) && !isNaN(bn)) {
          return (an - bn) * dir
        }
        return String(av).localeCompare(String(bv), undefined, {sensitivity: 'base'}) * dir
      })
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.zebraRows ? `${baseCss}-zebra-rows` : null,
        this.hoverable ? `${baseCss}-hoverable` : null,
        'overflow-hidden',
        'w-full'
      ]
    },
    tableWrapperCssClasses () {
      return [
        `${this.baseCss}-table-container`,
        'overflow-x-auto'
      ]
    },
    theadCssClasses () {
      return [
        `${this.baseCss}-table-header`,
        'table-layout-thead',
        'select-none',
        this.makeFontSize(this.headersFontSize)
      ]
    },
    theadTrCssClasses () {
      return [
        `${this.baseCss}-table-header-row`
      ]
    },
    tableCssClasses () {
      return [
        `${this.baseCss}-table`
      ]
    },
    thCssClasses () {
      return [
        this.padding,
        this.headersUppercase ? 'uppercase' : null,
        this.makeFontWeight(this.headersFontWeight),
        `text-${this.xAlign}`,
        'white-space-nowrap'
      ]
    },
    tBodyCssClasses () {
      return [
        `${this.baseCss}-table-body`,
        this.makeFontSize(this.itemsFontSize),
        `text-${this.xAlign}`,
        'overflow-y-auto'
      ]
    },
    tdCssClasses () {
      return [
        'p-1'
      ]
    },
    tBodyTrCssClasses () {
      return [
        `${this.baseCss}-table-body-row`,
        this.clickableRows ? 'cursor-pointer' : null,
        this.unselectableRows ? 'select-none' : null,
        'table-layout-tr',
        'transition-background',
        'transition-duration-300'
      ]
    }
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    getHeaderByValue (headerValue) {
      return this.headers.find(header => header.value === headerValue)
    },
    init () {
      const $el = this.$el
      const parentStyle = getComputedStyle(this.$parent.$el)
      const parentWidth = parseInt(parentStyle.width, 10)
      const parentPaddingLeft = parseInt(parentStyle.paddingLeft, 10) || 0
      const parentPaddingRight = parseInt(parentStyle.paddingRight, 10) || 0
      document.addEventListener('click', this.documentClick)
      $el.style.maxWidth = `${parentWidth - parentPaddingRight - parentPaddingLeft}px`
      $el.classList.remove('hidden')
    },
    sortingIcons (index) {
      return this.sortIndex === index ? (this.sortDirection === 'ascending' ? 'chevron-up' : 'chevron-down') : 'unfold-more-horizontal'
    },
    documentClick (e) {
      this.hideVisibleColumnsContextMenu()
    },
    showVisibleColumnsContextMenu ($event) {
      const margin = 8
      if (!this.toggleColumns) {
        return
      }
      this.visibleColumnsContextMenuCoords = {
        left: `${Math.min(Math.max($event.clientX, margin), window.innerWidth - parseInt(this.visibleColumnsContextMenuWidth, 10) - margin)}px`,
        top: `${Math.min(Math.max($event.clientY, margin), window.innerHeight -  parseInt(this.visibleColumnsContextMenuHeight, 10) - margin)}px`,
        zIndex: this.visibleColumnsContextMenuZIndex
      }
    },
    hideVisibleColumnsContextMenu () {
      this.visibleColumnsContextMenuCoords = null
    },
    toggleSort (index) {
      if (this.sortIndex === index) {
        this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending'
      } else {
        this.sortIndex = index
        this.sortDirection = 'ascending'
      }
    },
    onDblClick (item) {
      this.$emit('row-dblclick', item)
    },
    onRowClick (item) {
      this.$emit('row-click', item)
    },
    toggleColumn (header) {
      const columns = this.visibleColumns
      const event = 'update:visibleColumns'
      if (columns.includes(header)) {
        const index = columns.findIndex(column => column === header)
        columns.splice(index, 1)
        this.$emit(event, columns)
      } else {
        columns.push(header)
        this.$emit(event, columns)
      }
    }
  }
}
</script>
<style>
.bc-data-table .bc-data-table-table-body,
.bc-data-table .bc-data-table-table-header,
.bc-data-table .bc-data-table-table-header-row,
.bc-data-table .bc-data-table-table-body-row,
.bc-data-table .bc-data-table-table
{
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}

.bc-data-table .bc-data-table-table
{
  border-collapse: collapse;
}

.bc-data-table .bc-data-table-table-header
{
  height: 34px;
}

.bc-data-table.bc-data-table-hoverable tbody > tr:hover
{
  background: var(--data-table-row-\:hover);
}

.bc-data-table.bc-data-table-zebra-rows tbody > tr:nth-child(even)
{
  background: var(--data-table-zebra-rows-even);
}
</style>
