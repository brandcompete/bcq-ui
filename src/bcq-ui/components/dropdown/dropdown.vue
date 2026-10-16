<template>
  <div role="listbox" ref="dropdown" :class="componentCssClasses" :inert="inert" :style="{width}">
    <bc-container v-if="$slots['top']">
      <slot name="top" />
    </bc-container>
    <bc-container :class="[expanded ? null : 'relative']">
      <bc-container @click="toggleDropdown" :class="[`${baseCss}-header`, 'overflow-hidden']" v-if="!expanded">
        <bc-text-field-label v-if="label" :text="label" :class="[`${baseCss}-hint`, 'mb-1', 'text-left', labelsCssClasses]" />
        <bc-container :title="title" :class="[`${baseCss}-header-controls`, `border-round-${this.roundness}`]">
          <bc-table-layout y-align="middle" equal-cells>
            <bc-table-layout-row>
              <bc-table-layout-cell :class="[cellPadding, `${baseCss}-icon-cell`]" v-if="icon" x-align="center">
                <bc-icon :name="icon" :provider="iconProvider" />
              </bc-table-layout-cell>
              <bc-table-layout-cell :class="[cellPadding]" x-align="left">
                <bc-container v-text="header" :class="['truncate', icon ? null : 'pl-1', value.length ? null : 'opacity-50']" />
              </bc-table-layout-cell>
              <bc-table-layout-cell :class="[cellPadding, `${baseCss}-icon-cell`]" x-align="center">
                <bc-icon :name="hidden ? iconExpand : iconCollapse" :provider="iconProvider" />
              </bc-table-layout-cell>
            </bc-table-layout-row>
          </bc-table-layout>
        </bc-container>
        <bc-text-field-label v-if="hint" :text="hint" :class="[`${baseCss}-hint`, 'mt-1', 'text-right', labelsCssClasses]" />
      </bc-container>
      <bc-container :class="dropdownCssClasses" :style="{zIndex: itemsZIndex}">
        <bc-card :border-width="1">
          <bc-card-text :font-size="size" v-if="searchable">
            <bc-text-field v-model:value="search" :size="size" :placeholder="searchLabel" :icon-left="iconSearchable" :icon-provider="iconProvider" />
          </bc-card-text>
          <bc-card-text :font-size="size">
            <bc-alert v-if="searchable" :roundness="roundness" :visible="!filtered.length" :dismissible="false" :color="searchableColor" :variant="searchableVariant">
              <div :class="['text-center']">{{ searchableNoResultsText }}</div>
            </bc-alert>
            <recycle-scroller v-if="filtered.length" :key-field="valueKey" v-slot="{item}" :style="{height: itemHeight * visibleItems + 'px'}" :items="filtered" :item-size="itemHeight" :class="['bc-list']">
              <bc-table-layout equal-cells @click="toggleItem($event, item)" y-align="middle" :class="['cursor-pointer', 'transition-all', 'transition-duration-200', `${baseCss}-dropdown-item`, value.includes(item[valueKey]) ? `${baseCss}-dropdown-item-selected` : null, item.disabled ? 'disabled' : null]">
                <bc-table-layout-row>
                  <bc-table-layout-cell :class="[cellPadding, `${baseCss}-icon-cell`]" x-align="center" v-if="multiple">
                    <bc-icon :name="value.includes(item[valueKey]) ? iconMultipleChecked : iconMultipleUnchecked" :provider="iconProvider" />
                  </bc-table-layout-cell>
                  <bc-table-layout-cell :class="[cellPadding]" x-align="left">
                    <bc-container :class="['truncate']" v-text="item[labelKey]" />
                  </bc-table-layout-cell>
                </bc-table-layout-row>
              </bc-table-layout>
            </recycle-scroller>
          </bc-card-text>
        </bc-card>
      </bc-container>
      <bc-reactive-style>
      .bc-dropdown .bc-dropdown-dropdown-item
      {
        min-height: {{ itemHeight }}px;
      }
      </bc-reactive-style>
    </bc-container>
    <bc-container v-if="$slots['bottom']">
      <slot name="bottom" />
    </bc-container>
  </div>
</template>
<script>
import methods from '../../mixins/methods'

/* @todo: automatic expand direction */
/* @todo: initial and hover for dropdowns that do not have value selected */
export default {
  name: 'BcDropdown',
  mixins: [
    methods
  ],
  data () {
    return {
      hidden: true,
      search: '',
      itemHeight: 30.81,
      cellPadding: 'p-1',
      baseCss: this.componentBaseCss('dropdown')
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCssClass: {
      type: String,
      default: 'bc-dropdown-error'
    },
    expanded: {
      type: Boolean,
      default: false
    },
    fuzzySearch: {
      type: Boolean,
      default: false
    },
    headerItems: {
      type: Number,
      default: 10
    },
    hint: {
      type: String
    },
    icon: {
      type: String
    },
    iconCollapse: {
      type: String,
      default: 'chevron-up'
    },
    iconExpand: {
      type: String,
      default: 'chevron-down'
    },
    iconMultipleChecked: {
      type: String,
      default: 'checkbox-marked-outline'
    },
    iconMultipleUnchecked: {
      type: String,
      default: 'checkbox-blank-outline'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconSearchable: {
      type: String,
      default: 'magnify'
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
    itemsZIndex: {
      type: Number,
      default: 900
    },
    label: {
      type: String
    },
    labelKey: {
      type: [
        String,
        Number
      ],
      default: 'label'
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    searchableNoResultsText: {
      type: String,
      default: 'Nothing Found...'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    searchableColor: {
      type: String,
      default: 'caution'
    },
    searchableVariant: {
      type: String,
      default: 'soft'
    },
    searchLabel: {
      type: String,
      default: 'Filter Items...'
    },
    size: {
      type: String,
      default: 'sm'
    },
    sort: {
      // disabled for now
      type: Object,
      default () {
        return {
          descending: false
        }
      }
    },
    title: {
      type: String
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    valueKey: {
      type: [
        String,
        Number
      ],
      default: 'value'
    },
    visibleItems: {
      type: Number,
      default: 5
    },
    width: {
      type: String
    }
  },
  watch: {
    expanded () {
      if (this.expanded) {
        this.hidden = false
      }
    }
  },
  computed: {
    labelsCssClasses () {
      return ['px-1', 'select-none', this.labelsUppercase ? 'uppercase' : null, this.error ? this.errorCssClass : null]
    },
    header () {
      const header = this.items.filter(item => this.value.includes(item[this.valueKey])).map(item => {
        return item[this.labelKey]
      }).slice(0, this.headerItems).sort()
      return header.length ? header.join(', ') : this.label
    },
    filtered () {
      // const sort = this.sort
      const labelKey = this.labelKey
      if (this.searchable) {
        const search = this.search.toLowerCase()
        const data = this.items.filter(item => {
          if (item) {
            const text = item[labelKey].toString().toLowerCase()
            if (this.fuzzySearch ? text.indexOf(search) > -1 : text.substring(0, search.length) === search) {
              return item
            }
          }
        })
        return data // .sort(this.sortItems(labelKey, sort.descending))
      } else {
        return this.items.map(item => {
          return item
        }) // .sort(this.sortItems(labelKey, sort.descending))
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? 'block' : ['align-middle', 'inline-block'],
        this.disabled && !this.inert ? 'disabled' : null,
        this.error ? this.errorCssClass :  null,
        `text-${this.size}`,
        'select-none',
        'cursor-pointer',
        'bc-container'
      ]
    },
    dropdownCssClasses () {
      return [
        `${this.baseCss}-dropdown`,
        this.expanded ? null : 'absolute',
        'w-full',
        'transition-all',
        'transition-duration-300',
        this.hidden ? ['opacity-0', 'clip-0', 'pointer-events-none'] : ['opacity-100']
      ]
    }
  },
  mounted () {
    document.addEventListener('click', this.documentClick)
    if (this.expanded) {
      this.hidden = false
    }
    this.$emitter.on('bc-dropdown-hide', $event => {
      // this.hidden = true
      // console.log($event)
      this.documentClick($event)
    })
  },
  beforeUnmount () {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    toggleDropdown () {
      const emitter = this.$emitter
      this.hidden = !this.hidden
      if (emitter) {
        emitter.emit('bc-tooltip:hide')
      }
    },
    sortItems (key, descending = false) {
      /* usage: Array.sort(sortItems(key, descending)) */
      return function (a, b) {
        if (a[key].toString().toLowerCase() > b[key].toString().toLowerCase()) {
          return descending ? -1 : 1
        }
        if (a[key].toString().toLowerCase() < b[key].toString().toLowerCase()) {
          return descending ? 1 : -1
        }
        return 0
      }
    },
    toggleItem ($event, item) {
      let value = this.value
      const multiple = this.multiple
      const id = item[this.valueKey]
      if (multiple) {
        $event.stopPropagation()
        if (value.includes(id)) {
          value.splice(value.findIndex(item => item === id), 1).sort()
        } else {
          value.push(id)
        }
        value.sort()
      } else if (!multiple && value[0] !== id) {
        if (!this.expanded) {
          this.hidden = true
        }
        value = [id]
      }
      this.$emit('update:value', value)
    },
    documentClick (e) {
      let el = this.$refs['dropdown']
      let target = e.target
      if (el && el !== target && !el.contains(target) && !this.expanded) {
        this.hidden = true
      }
    }
  }
}
</script>
<style>
.bc-dropdown .bc-dropdown-dropdown-item-selected
{
  background-color: var(--dropdown-item-selected-light);
}

.bc-dropdown .bc-dropdown-dropdown-item:hover
{
  background-color: var(--dropdown-item\:hover-light);
}

.bc-app-theme-dark .bc-dropdown .bc-dropdown-dropdown-item-selected
{
  background-color: var(--dropdown-item-selected-dark);
}

.bc-app-theme-dark .bc-dropdown .bc-dropdown-dropdown-item:hover
{
  background-color: var(--dropdown-item\:hover-dark);
}

.bc-dropdown .bc-dropdown-icon-cell
{
  width: var(--icon-cell-width);
}

.bc-dropdown .bc-dropdown-header
{
    color: var(--dropdown-color-light);
}

.bc-dropdown .bc-dropdown-header .bc-dropdown-header-controls
{
  border: solid 1px var(--dropdown-color-light);
}

.bc-app-theme-dark .bc-dropdown .bc-dropdown-header
{
  color: var(--dropdown-color-dark);
}

.bc-app-theme-dark .bc-dropdown .bc-dropdown-header .bc-dropdown-header-controls
{
  border-color: var(--dropdown-color-dark);
}

.bc-dropdown.bc-dropdown-error .bc-dropdown-header
{
  color: var(--dropdown-color-error);
}

.bc-dropdown.bc-dropdown-error .bc-dropdown-header .bc-dropdown-header-controls
{
  border-color: var(--dropdown-color-error);
}

.bc-dropdown.bc-dropdown-error .bc-dropdown-dropdown
{
  color: var(--dropdown-color-error);
}
</style>
