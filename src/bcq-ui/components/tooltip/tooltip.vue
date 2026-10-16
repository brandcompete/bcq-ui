<template>
  <bc-container :class="componentCssClasses" :style="componentStyle">
    <bc-table-layout :class="['relative']" y-align="top">
      <bc-table-layout-row>
        <bc-table-layout-cell :class="['p-1', dismissible ? 'pr-0' : null]">
          <bc-container v-html="content" />
        </bc-table-layout-cell>
        <bc-table-layout-cell v-if="dismissibleInternal" :class="['p-1', 'pl-0', `${baseCss}-close-icon-cell`]" x-align="center">
          <bc-icon :name="dismissIcon" :provider="iconProvider" :class="['cursor-pointer']" @click="dismiss" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcTooltip',
  mixins: [
    methods
  ],
  data () {
    return {
      position: {
        top: null,
        left: null,
        zIndex: null
      },
      hidden: true,
      baseCss: this.componentBaseCss('tooltip'),
      colorInternal: null,
      sizeInternal: null,
      placementInternal: null,
      roundnessInternal: null,
      dismissibleInternal: false,
      widthInternal: null,
      content: null
    }
  },
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        `${baseCss}-${this.placementInternal}`,
        this.hidden ? ['opacity-0', 'pointer-events-none'] : ['opacity-100'],
        this.pointer ? `${baseCss}-pointer` : null,
        this.colorInternal,
        this.sizeInternal,
        this.roundnessInternal,
        this.makeElevation(this.elevation),
        'transition-opacity',
        'transition-duration-500',
        'fixed',
        'cursor-default'
      ]
    },
    componentStyle () {
      return {
        ... this.position,
        width: this.widthInternal
      }
    }
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissIcon: {
      default: 'close-circle'
    },
    color: {
      type: String,
      default: 'secondary'
    },
    elevation: {
      type: String,
      default: 'xl'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    placement: {
      type: String,
      default: 'top',
      validator: value => {
        return [
          'top',
          'right',
          'bottom',
          'left'
        ].includes(value)
      }
    },
    pointer: {
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
    },
    width: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  mounted () {
    this.bind()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.dismiss)
  },
  methods: {
    bind () {
      const emitter = this.$emitter
      emitter.on('bc-tooltip:show', data => {
        const $el = this.$el
        const boundingClientRect = data.target.getBoundingClientRect()
        delete this.position.transform
        this.position.zIndex = data.zIndex || this.zIndex
        this.position.top = `${boundingClientRect.top}px`
        this.position.left = `${boundingClientRect.left}px`
        this.colorInternal = this.makeUiColorVariant(data.color || this.color, data.variant || this.variant)
        this.sizeInternal = this.makeFontSize(data.size || this.size)
        this.placementInternal = data.placement || this.placement
        this.roundnessInternal = this.makeBorderRadius(data.roundness || this.roundness)
        this.dismissibleInternal = data.dismissible || this.dismissible
        this.widthInternal = data.width || this.width || 'auto'
        this.content = data.content
        const targetHeight = boundingClientRect.height
        const targetWidth = boundingClientRect.width
        const tooltipOffsetWidth = $el.offsetWidth
        const tooltipOffsetHeight = $el.offsetHeight
        const centerX = (targetWidth / 2) - (tooltipOffsetWidth / 2)
        const centerY = (targetHeight / 2) - (tooltipOffsetHeight / 2)
        switch (this.placementInternal) {
          case 'top':
            this.position.transform = `translate(${centerX}px, ${tooltipOffsetHeight * -1}px)`
            break
          case 'bottom':
            this.position.transform = `translate(${centerX}px, ${targetHeight}px)`
            break
          case 'right':
            this.position.transform = `translate(${targetWidth}px, ${centerY}px)`
            break
          case 'left':
            this.position.transform = `translate(${tooltipOffsetWidth * -1}px, ${centerY}px)`
            break
        }
        this.hidden = false
        /**
         * {
         *   target: HTMLElement
         *   content: data.content
         *   zIndex: data.zIndex || this.zIndex
         *   color: data.color || this.color
         *   variant: data.variant || this.variant,
         *   size: data.size || this.size,
         *   placement: data.placement || this.placement
         *   roundness: data.roundness || this.roundness,
         *   width: data.width || this.width
         * }
         */
      })
      emitter.on('bc-tooltip:hide', () => {
        this.dismiss()
      })
      window.addEventListener('scroll', this.dismiss)
    },
    dismiss () {
      this.hidden = true
    }
  }
}
</script>
<style>
.bc-tooltip.bc-tooltip-pointer::after
{
  content: '';
  width: 16px;
  height: 16px;
  background: inherit;
  box-shadow: inherit;
  display: block;
  position: absolute;
  left: 50%;
  transform: rotate(45deg);
  z-index: 0;
}

.bc-tooltip.bc-tooltip-pointer.bc-tooltip-top
{
  margin-top: -12px;
}

.bc-tooltip.bc-tooltip-pointer.bc-tooltip-bottom
{
  margin-top: 12px;
}

.bc-tooltip.bc-tooltip-pointer.bc-tooltip-left
{
  margin-left: -12px;
}

.bc-tooltip.bc-tooltip-pointer.bc-tooltip-right
{
  margin-left: 12px;
}

.bc-tooltip.bc-tooltip-top.bc-tooltip-pointer::after,
.bc-tooltip.bc-tooltip-bottom.bc-tooltip-pointer::after
{
  margin-left: -4px;
}

.bc-tooltip.bc-tooltip-right.bc-tooltip-pointer::after,
.bc-tooltip.bc-tooltip-left.bc-tooltip-pointer::after
{
  margin-top: -8px;
  margin-left: -8px;
}

.bc-tooltip.bc-tooltip-top.bc-tooltip-pointer::after
{
  top: 100%;
  margin-top: -8px;
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
}

.bc-tooltip.bc-tooltip-bottom.bc-tooltip-pointer::after
{
  top: 0;
  margin-top: -8px;
  clip-path: polygon(0 100%, 0 0, 100% 0);

}

.bc-tooltip.bc-tooltip-right.bc-tooltip-pointer::after
{
  left: 0;
  top: 50%;
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}

.bc-tooltip.bc-tooltip-left.bc-tooltip-pointer::after
{
  left: 100%;
  top: 50%;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.bc-tooltip .bc-tooltip-close-icon-cell
{
  /*min-width: var(--icon-cell-width);*/
}
</style>
