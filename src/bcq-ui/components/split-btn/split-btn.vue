<template>
  <bc-container :display="block ? 'block' : 'inline-block'" :inert="inert" :class="componentCssClasses" :style="componentStyles">
    <bc-container :class="['relative', `${baseCss}-inner-wrapper`]">
      <bc-table-layout :class="btnHeaderCssClasses">
        <bc-table-layout-row>
          <bc-table-layout-cell :class="[`${baseCss}-btn-cell`]">
            <bc-btn @click="onClick()" :icon-left="headerIcon" :color="color" :font-weight="fontWeight" :size="size" :uppercase="uppercase" :variant="variant" elevation="none" roundness="none" block :class="btnCssClasses">{{ label }}</bc-btn>
          </bc-table-layout-cell>
          <bc-table-layout-cell :class="[`${baseCss}-split-cell`]">
            <bc-btn @click.prevent.stop="toggle" :color="color" :size="size" :variant="variant" elevation="none" roundness="none" block :class="splitCssClasses" :icon-provider="iconsProvider" :icon="expanded ? iconCollapse : iconExpand" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
      <bc-container @click.prevent.stop v-if="items.length" :class="dropdownCssClasses" :style="dropdownStyles">
        <bc-card :border-width="1" :elevation="elevation">
          <bc-card-text :padding="[]" x-align="left">
            <bc-list divider hoverable>
              <bc-list-item @click="onClick(item.value)" v-for="item in items" :class="[disabled || inert ? null : 'cursor-pointer']" :disabled="item.disabled" :inert="item.inert">
                <bc-list-item-icon v-if="ifItemIcons('iconLeft')">
                  <bc-icon :provider="iconsProvider" :name="item.iconLeft || 'home'" :class="[!item.iconLeft ? 'invisible' : null]" />
                </bc-list-item-icon>
                <bc-list-item-content>
                  <bc-list-item-content-title v-if="item.title" v-text="item.title" />
                  <bc-list-item-content-sub-title v-if="item.subTitle" v-text="item.subTitle" />
                </bc-list-item-content>
                <bc-list-item-icon v-if="ifItemIcons('iconRight')">
                  <bc-icon :provider="iconsProvider" :name="item.iconRight || 'home'" :class="[!item.iconRight ? 'invisible' : null]" />
                </bc-list-item-icon>
              </bc-list-item>
            </bc-list>
          </bc-card-text>
        </bc-card>
      </bc-container>
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSplitBtn',
  mixins: [
    methods
  ],
  data () {
    return {
      expanded: false,
      bottom: null,
      hideEvent: 'bc-split-btn:hide',
      baseCss: this.componentBaseCss('split-btn')
    }
  },
  watch: {
    expanded () {
      if (this.expanded) {
        this.dropdownPosition()
      }
    }
  },
  computed: {
    componentStyles () {
      return {
        width: this.width
      }
    },
    headerIcon () {
      if (this.updateLabelOnValueUpdate) {
        return this.iconHeader ? this.items.find(item => item.value === this.value).iconLeft : null
      } else {
        return this.iconHeader ? this.items[0].iconLeft : null
      }
    },
    label () {
      const items = this.items
      const index = items.findIndex(item => item.value === this.value)
      return items[this.updateLabelOnValueUpdate ? index : 0].title
    },
    dropdownCssClasses () {
      return [
        'absolute',
        'right-0',
        'transition-opacity',
        'transition-duration-300',
        `${this.baseCss}-dropdown`,
         this.expanded ? 'opacity-100' : ['opacity-0', 'pointer-events-none']
      ]
    },
    dropdownStyles () {
      return {
        zIndex: this.itemsZIndex,
        width: this.itemsDropdownWidth,
        bottom: this.bottom
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : ['align-middle'],
        this.disabled && !this.inert ? 'disabled' : null
      ]
    },
    btnHeaderCssClasses () {
      return [
        this.makeElevation(this.elevation)
      ]
    },
    btnCssClasses () {
      return [
        this.makeBorderRadius(this.roundness),
        'border-noround-right'
      ]
    },
    splitCssClasses () {
      return [
        this.makeBorderRadius(this.roundness),
        'border-noround-left'
      ]
    },
    innerWrapper () {
      return this.$el.querySelector(`.${this.baseCss}-inner-wrapper`)
    },
    dropdown () {
      return this.$el.querySelector(`.${this.baseCss}-dropdown`)
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'sm'
    },
    fontWeight: {
      type: String,
      default: 'medium'
    },
    iconCollapse: {
      type: String,
      default: 'chevron-up'
    },
    iconExpand: {
      type: String,
      default: 'chevron-down'
    },
    iconHeader: {
      type: Boolean,
      default: false
    },
    iconsProvider: {
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
    itemsDropdownWidth: {
      type: String
    },
    itemsZIndex: {
      type: Number,
      default: 900
    },
    roundness: {
      type: String,
      default: 'full'
    },
    size: {
      type: String,
      default: 'sm'
    },
    updateLabelOnValueUpdate: {
      type: Boolean,
      default: true
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'solid'
    },
    value: {
      type: String,
      required: true
    },
    width: {
      type: String
    }
  },
  mounted () {
    this.bind()
  },
  unmounted () {
    this.unbind()
  },
  methods: {
    bind () {
      document.addEventListener('click', this.hideDropdown)
      this.$emitter.on(this.hideEvent, this.hideDropdown)
    },
    unbind () {
      document.removeEventListener('click', this.hideDropdown)
      this.$emitter.off(this.hideEvent)
    },
    onClick (value) {
      this.$emit('update:value', value || this.value)
      this.hideDropdown()
    },
    ifItemIcons (position) {
      return this.items.filter(item => item[position]).length > 0
    },
    toggle () {
      this.$emitter.emit('bc-split-btn:hide')
      this.expanded = !this.expanded
    },
    hideDropdown () {
      this.expanded = false
    },
    dropdownPosition () {
      const innerWrapper = this.innerWrapper
      const dropdown = this.dropdown
      const rect = innerWrapper.getBoundingClientRect()
      const menuHeight = dropdown.offsetHeight
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - rect.bottom
      const spaceAbove = rect.top
      this.bottom = spaceBelow < menuHeight && spaceAbove > menuHeight ? `${rect.height}px` : null
    }
  }
}
</script>
<style>
.bc-split-btn .bc-split-btn-split-cell
{
  width: var(--icon-cell-width);
}

.bc-split-btn .bc-split-btn-btn-cell .bc-btn
{
  padding-left: 20px;
}
</style>
