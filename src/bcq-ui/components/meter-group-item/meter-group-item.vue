<template>
  <bc-container @click="onLabelClick" :title="value" display="inline-block" :class="componentCssClasses" :style="componentStyle" />
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcMeterGroupItem',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('meter-group-item')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'align-top'
      ]
    },
    componentStyle () {
      return {
        width: this.value,
        height: 'inherit',
        background: `linear-gradient(to right, ${this.color.join(',')})`
      }
    }
  },
  emits: [
    'update:value',
    'item-click'
  ],
  props: {
    color: {
      type: Array,
      default () {
        return [
          '#ababab'
        ]
      }
    },
    icon: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onLabelClick () {
      this.$emit('item-click', {
        color: this.color,
        icon: this.icon,
        label: this.label,
        value: this.value
      })
    }
  }
}
</script>

