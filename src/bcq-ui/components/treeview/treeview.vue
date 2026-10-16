<template>
  <bc-container :class="componentCssClasses" role="tree" :inert="inert">
    <transition name="slide">
      <ul>
        <bc-treeview-item
          @item-click="$emit('item-click', $event)"
          :show-icon-file="showIconFile"
          :items="items"
          :icon-file="iconFile"
          :icon-provider="iconProvider"
          :icon-folder-open="iconFolderOpen"
          :checkboxes="checkboxes"
          :checkboxes-icon-checked="checkboxesIconChecked"
          :checkboxes-icon-unchecked="checkboxesIconUnchecked"
          :size="size"
          :icon-folder-closed="iconFolderClosed" />
      </ul>
    </transition>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import BcTreeviewItem from './treeview-item.vue'

export default {
  name: 'BcTreeview',
  components: {
    BcTreeviewItem
  },
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('treeview')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        this.makeFontSize(this.size),
        'select-none'
      ]
    }
  },
  props: {
    checkboxes: {
      type: Boolean,
      default: false
    },
    checkboxesIconChecked: {
      type: String,
      default: 'checkbox-marked-outline'
    },
    checkboxesIconUnchecked: {
      type: String,
      default: 'checkbox-blank-outline'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconFile: {
      type: String,
      default: 'file'
    },
    iconFolderClosed: {
      type: String,
      default: 'folder'
    },
    iconFolderOpen: {
      type: String,
      default: 'folder-open'
    },
    iconProvider: {
      default: 'mdi'
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Object,
      required: true
    },
    showIconFile: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'sm'
    }
  }
}
</script>
<style>
.bc-treeview li
{
  padding: 0 0 0 21px;
}

.bc-treeview > ul > li
{
  padding-left: 0;
}

.bc-treeview .bc-treeview-item-label-no-file-icon
{
  padding-left: 9px;
  line-height: 29px;
}
</style>
