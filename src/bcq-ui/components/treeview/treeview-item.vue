<template>
  <li role="treeitem" :class="componentCssClasses">
    <bc-container @click.native="toggle(items)" :title="items.item.name" :class="['whitespace-nowrap', 'cursor-pointer']">
      <bc-icon v-if="isFolder" :provider="iconProvider" :name="isExpanded ? iconFolderOpen : iconFolderClosed" :class="['m-1']" />
      <bc-icon v-else-if="!isFolder && showIconFile" :provider="iconProvider" :name="items.item.icon || iconFile" :class="['m-1']" />
      <bc-checkbox v-if="checkboxes" v-model:checked="items.checked" :size="size" :icon-checked="checkboxesIconChecked" :icon-unchecked="checkboxesIconUnchecked" :icon-provider="iconProvider" :block="false" />
      <span :class="labelCssClasses" v-text="items.item.name" />
    </bc-container>
    <transition name="slide">
      <ul v-if="isFolder && isExpanded">
        <bc-treeview-item
          @item-click="$emit('item-click', $event)"
          v-for="(child, index) in items.children"
          :icon-file="iconFile"
          :show-icon-file="showIconFile"
          :icon-folder-open="iconFolderOpen"
          :icon-folder-closed="iconFolderClosed"
          :checkboxes="checkboxes"
          :checkboxes-icon-checked="checkboxesIconChecked"
          :checkboxes-icon-unchecked="checkboxesIconUnchecked"
          :icon-provider="iconProvider"
          :key="index"
          :size="size"
          :items="child" />
      </ul>
    </transition>
  </li>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTreeviewItem',
  mixins: [
    methods
  ],
  data () {
    return {
      isExpanded: false,
      baseCss: this.componentBaseCss('treeview-item')
    }
  },
  props: [
    'checkboxes',
    'checkboxesIconChecked',
    'checkboxesIconUnchecked',
    'iconFile',
    'iconFolderClosed',
    'iconFolderOpen',
    'iconProvider',
    'items',
    'showIconFile',
    'size'
  ],
  computed: {
    isFolder () {
      return this.items.children && this.items.children.length
    },
    componentCssClasses () {
      return [
        this.baseCss,
        this.items.disabled ? 'disabled' : null
      ]
    },
    labelCssClasses () {
      return [
        'inline-block',
        'align-middle',
        !this.isFolder && !this.showIconFile ? 'bc-treeview-item-label-no-file-icon' : 'bc-treeview-item-label'
      ]
    }
  },
  mounted () {
    if (this.items.expanded) {
      this.isExpanded = true
    }
  },
  methods: {
    toggle (items) {
      if (!items.disabled) {
        if (this.isFolder) {
          this.isExpanded = !this.isExpanded
        }
        items.expanded = this.isExpanded
        items.isFolder = !!items.children
        this.$emit('item-click', items)
      }
    }
  }
}
</script>
