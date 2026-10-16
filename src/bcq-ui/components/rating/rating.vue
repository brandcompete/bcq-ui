<template>
  <bc-container :data-bc-rating-id="id" :inert="inert" :display="block ? 'block' : 'inline-block'" :class="componentCssClasses">
    <bc-text-field-label v-if="label" :text="label" :class="labelsCssClasses()" />
    <bc-container :class="['flex', 'flex-row', 'flex-row-reverse']">
      <bc-icon :data-bc-rating-value="makeValue(index)" @click="onClick(makeValue(index))" :name="icon" :provider="iconsProvider" v-for="(star, index) in items" :size="iconsSize" :class="itemCssClasses(index)" />
      <bc-icon @click="onClick(0)" v-if="noRating" :name="iconNoRating" :provider="iconsProvider" :size="iconsSize" :class="noRatingCssClasses" />
    </bc-container>
    <bc-text-field-label v-if="hint" :text="hint" :class="labelsCssClasses(false)" />
    <bc-reactive-style>
    .bc-rating[data-bc-rating-id="{{ id }}"] .bc-rating-item:hover,
    .bc-rating[data-bc-rating-id="{{ id }}"] .bc-rating-item.bc-rating-item-selected,
    .bc-rating[data-bc-rating-id="{{ id }}"] .bc-rating-item:hover ~ .bc-rating-item,
    .bc-rating[data-bc-rating-id="{{ id }}"] .bc-rating-item.bc-rating-item-selected ~ .bc-rating-item
    {
      color: {{ colorSelected }};
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcRating',
  mixins: [
    methods
  ],
  data () {
    return {
      id: this.uuid(),
      baseCss: this.componentBaseCss('rating')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : 'align-middle',
        this.disabled && !this.inert ? 'disabled' : null,
        'white-space-nowrap',
        'select-none'
      ]
    },
    noRatingCssClasses () {
      return [
        `${this.baseCss}-no-rating`,
        'opacity-50',
        'hover:opacity-100',
        'cursor-pointer',
        'transition-opacity',
        'transition-duration-300',
      ]
    },
    componentInnerWrapperCssClasses () {
      return [
        `${this.baseCss}-inner-wrapper`,
        'inline-block',
        'align-middle',
        'border-none',
        'white-space-nowrap'
      ]
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
    colorSelected: {
      type: String,
      default: '#f59e0b'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    icon: {
      type: String,
      default: 'star'
    },
    iconNoRating: {
      type: String,
      default: 'cancel'
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    iconsSize: {
      type: Number,
      default: 2
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Number,
      default: 5
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false,
    },
    noRating: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number
    }
  },
  methods: {
    makeValue (index) {
      return this.items - index
    },
    itemCssClasses (index) {
      const baseCss = this.baseCss
      return [
        `${baseCss}-item`,
        this.makeValue(index) === this.value ?`${baseCss}-item-selected` : null,
        'transition-all',
        'transition-duration-300',
        'cursor-pointer'
      ]
    },
    labelsCssClasses (label = true) {
      return [
        `${this.baseCss}-label`,
        this.labelsUppercase ? 'uppercase' : null,
        label ? 'mb-1' : 'mt-1',
        label ? 'text-left' : 'text-right'
      ]
    },
    onClick (value) {
      this.$emit('update:value', parseInt(value, 10))
    }
  }
}
</script>
<style>
.bc-rating .bc-rating-no-rating
{
  transform: scale(0.7);
}
</style>
