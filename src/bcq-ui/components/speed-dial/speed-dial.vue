<template>
  <bc-container @click.stop.prevent :class="componentCssClasses" :style="componentStyle">
    <ul :class="listCssClasses">
      <li :class="triggerItemCssClasses">
        <bc-btn @click="toggle" :title="label" :roundness="roundness" :color="color" :icon-provider="iconProvider" :variant="variant" :icon="icon" :elevation="elevation" :size="size" />
      </li>
      <li v-for="(item, index) in items" :class="itemCssClasses" :style="itemStyle(index)">
        <bc-btn @click="onItemClick(item)" :title="item.label" :roundness="item.roundness || roundness" :color="item.color || color" :icon-provider="item.iconProvider || iconProvider" :variant="item.variant || variant" :icon="item.icon" :elevation="item.elevation || elevation" :size="item.size || size" />
      </li>
    </ul>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSpeedDial',
  mixins: [
    methods
  ],
  data () {
    return {
      id: this.uuid(),
      expanded: false,
      dimensions: null,
      eventHide: 'bc-speed-dial:hide',
      baseCss: this.componentBaseCss('speed-dial')
    }
  },
  watch: {
    '$route.path' () {
      this.hide()
    }
  },
  computed: {
    triggerItemCssClasses () {
      return [
        this.itemsPadding,
        this.expanded && this.rotateIconOnExpand ? this.xAlign === 'right' ? '-rotate-45' : 'rotate-45' : null,
        'transition-all',
        'transition-duration-300',
        'pointer-events-all'
      ]
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.position,
        this.isPositionNonStaticCssClasses,
        `${baseCss}-${this.xAlign}`,
        `${baseCss}-${this.yAlign}`,
        'select-none',
        'pointer-events-none',
        'transition-all',
        'transition-duration-300'
      ]
    },
    isPositionNonStaticCssClasses () {
      const cssClasses = []
      const xAlign = this.xAlign
      const yAlign = this.yAlign
      if (this.position !== 'static') {
        cssClasses.push(['left', 'right'].includes(xAlign) ? `${xAlign}-0` : ['left-50', '-translate-left-50'])
        cssClasses.push(['top', 'bottom'].includes(yAlign) ? `${yAlign}-0` : ['top-50', '-translate-y-50'])
      }
      return cssClasses
    },
    listCssClasses () {
      const xAlignToFlex = {
        left: 'start',
        center: 'center',
        right: 'end'
      }
      const xAlign = this.xAlign
      return [
        this.vertical ? 'flex-column' : xAlign === 'right' ? 'flex-row-reverse' : 'flex-row',
        `align-items-${xAlignToFlex[xAlign]}`,
        `justify-content-${xAlign}`,
        'flex'
      ]
    },
    itemCssClasses () {
      return [
        this.expanded ? ['scale-1', 'opacity-100', 'pointer-events-all', this.itemsPadding] : ['pointer-events-none', 'scale-0', 'opacity-0', 'clip-0', 'absolute'],
        'transition-all',
        'transition-duration-200',
        'overflow-hidden'
      ]
    },
    componentStyle () {
      return {
        zIndex: this.zIndex
      }
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    elevation: {
      type: String,
      default: 'md'
    },
    icon: {
      type: String,
      default: 'plus'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    itemsPadding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    label: {
      type: String
    },
    position: {
      type: String,
      default: 'static'
    },
    rotateIconOnExpand: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: 'full'
    },
    size: {
      type: String,
      default: 'sm'
    },
    variant: {
      type: String,
      default: 'solid'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    xAlign: {
      type: String,
      default: 'left' // 'left', 'center', 'right'
    },
    yAlign: {
      // @todo
      type: String,
      default: 'top' // 'top', 'middle', 'bottom'
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    init () {
      document.addEventListener('click', this.documentClick)
      this.dimensions = `${this.$el.querySelector('li:first-of-type').getBoundingClientRect().height}px`
      this.$emitter.on(this.eventHide, id => {
        id !== this.id ? this.hide() : null
      })
    },
    toggle () {
      this.$emitter.emit(this.eventHide, this.id)
      this.$nextTick(() => {
        this.expanded = !this.expanded
      })
    },
    hide () {
      this.expanded = false
    },
    itemStyle (index) {
      const itemsLength = this.items.length
      const percentage = this.percentage(index, itemsLength)
      const delay = percentage * itemsLength
      return {
        transitionDelay: `.${delay}s`,
        width: this.expanded ? this.dimensions : 0,
        height: this.expanded ? this.dimensions : 0
      }
    },
    documentClick () {
      this.hide()
    },
    onItemClick ($event) {
      this.$emit('item-click', $event)
      this.hide()
    }
  }
}
</script>
<style>
.bc-speed-dial li:not(:first-of-type)
{
  transition: var(--bc-speed-dial-transition);
}
</style>
