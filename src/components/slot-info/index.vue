<template>
  <bc-container :class="componentCssClasses">
    <bc-container :truncate="truncate" :class="['opacity-50']">{{ label }}:</bc-container>
    <bc-container :truncate="truncate">
      <slot />
    </bc-container>
  </bc-container>
</template>
<script>
export default {
  name: 'SlotInfo',
  data () {
    return {
      baseCss: 'slot-info',
    }
  },
  props: {
    label: {
      type: String,
      default: 'v-slot'
    },
    truncate: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: 'sm'
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        `text-${this.fontSize}`,
        'code'
      ]
    }
  }
}
</script>
