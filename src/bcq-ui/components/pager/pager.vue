<template>
  <bc-container :inert="inert" :class="componentCssClasses">
    <ul :class="['inline-list']">
      <li v-if="firstLastButtons">
        <bc-btn @click="goToPage(0)" :disabled="page === 0" :font-weight="fontWeight" :color="color" :variant="variant" :size="size" :class="buttonClasses" :icon="icons.first" :icon-provider="iconProvider" :elevation="elevation" :roundness="roundness" />
      </li><li v-if="prevNextButtons">
        <bc-btn @click="goToPage(page - 1)" :disabled="page === 0" :font-weight="fontWeight" :color="color" :variant="variant" :size="size" :class="buttonClasses" :icon="icons.prev" :icon-provider="iconProvider" :elevation="elevation" :roundness="roundness" />
      </li><li v-for="(currentPage, index) in pages" :key="index">
        <bc-btn @click="goToPage(index)" :font-weight="fontWeight" :color="color" :variant="variant" :size="size" :class="[buttonClasses, index === page ? `${baseCss}-btn-selected` : null]" :elevation="elevation" :roundness="roundness">{{ currentPage }}</bc-btn>
      </li><li v-if="prevNextButtons">
        <bc-btn @click="goToPage(page + 1)" :disabled="page === pages - 1" :font-weight="fontWeight" :color="color" :variant="variant" :size="size" :class="buttonClasses" :icon="icons.next" :icon-provider="iconProvider" :elevation="elevation" :roundness="roundness" />
      </li><li v-if="firstLastButtons">
        <bc-btn @click="goToPage(pages - 1)" :disabled="page === pages - 1" :font-weight="fontWeight" :color="color" :variant="variant" :size="size" :class="buttonClasses" :icon="icons.last" :icon-provider="iconProvider" :elevation="elevation" :roundness="roundness" />
      </li>
    </ul>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcPager',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('pager')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null,
        `text-${this.align}`,
        'select-none'
      ]
    },
    buttonClasses () {
      return [
        'm-1',
        'transition-all',
        'transition-duration-100',
        'transition-ease-in'
      ]
    },
  },
  emits: [
    'update:page'
  ],
  props: {
    align: {
      type: String,
      default: 'center',
      validator: value => {
        return [
          'left',
          'center',
          'right'
        ].includes(value)
      }
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
      default: 'md'
    },
    firstLastButtons: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: 'medium'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    icons: {
      type: Object,
      default () {
        return {
          prev: 'chevron-left',
          next: 'chevron-right',
          first: 'chevron-double-left',
          last: 'chevron-double-right'
        }
      }
    },
    inert: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    prevNextButtons: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: 'sm'
    },
    variant: {
      type: String,
      default: 'solid'
    }
  },
  methods: {
    goToPage (index) {
      this.$emit('update:page', index)
    }
  }
}
</script>
<style>
.bc-pager .bc-pager-btn-selected
{
  transform: scale(1.2);
}
</style>
