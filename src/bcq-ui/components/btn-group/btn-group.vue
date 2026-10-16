<template>
  <bc-container :display="block ? 'block' : 'inline-block'" :class="componentCssClasses" :style="componentStyle" :inert="inert">
    <bc-container>
      <bc-table-layout equal-cells x-align="center" y-align="middle">
        <bc-table-layout-row>
          <bc-table-layout-cell v-for="button in buttons" :class="[selection.includes(button.name) ? [`${baseCss}-btn-selected`, 'relative'] : null]">
            <bc-btn
              @click="onBtnClick(button.name)"
              block
              elevation="none"
              roundness="null"
              :icon-provider="iconProvider"
              :title="button.hint"
              :disabled="button.disabled"
              :inert="button.inert"
              :font-weight="fontWeight"
              :uppercase="uppercase"
              :size="size"
              :icon-left="button.icon"
              :icon="button.label ? null : button.icon"
              :color="color"
              :variant="variant">{{ button.label }}</bc-btn>
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </bc-container>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBtnGroup',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('btn-group')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.block ? null : 'align-middle',
        this.disabled && !this.inert ? 'disabled' : null,
        'overflow-hidden',
        'select-none'
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    }
  },
  emits: [
    'update:selection'
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    buttons: {
      type: Array,
      default () {
        return []
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
      default: 'sm'
    },
    exclusive: {
      type: Boolean,
      default: false
    },
    fontWeight: {
      type: String,
      default: 'medium'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    inert: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: 'full'
    },
    selection: {
      type: Array,
      default () {
        return []
      }
    },
    size: {
      type: String,
      default: 'sm'
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'solid'
    },
    width: {
      type: String
    }
  },
  methods: {
    onBtnClick (name) {
      const exclusive = this.exclusive
      const selection = this.selection
      const event = 'update:selection'
      if (exclusive) {
        this.$emit(event, [name])
      } else {
        if (selection.includes(name)) {
          const index = selection.findIndex(item => item === name)
          let tempSelection = selection
          tempSelection = selection.splice(index, 1)
          this.$emit(event, selection)
        } else {
          this.$emit(event, selection.concat([name]))
        }
      }
    }
  }
}
</script>
<style>
.bc-btn-group .bc-btn-group-btn-selected::after
{
  content: '';
  position: absolute;
  background: var(--bc-btn-group-btn-selected);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.bc-btn-group .bc-btn-group-btn-selected .bc-btn::before
{
  content: unset;
}
</style>
