<template>
  <bc-container @click.stop.prevent :class="componentCssClasses" :style="componentStyles">
    <bc-card :elevation="elevation" :roundness="roundness" :class="['overflow-hidden']">
      <bc-card-text overflow="auto" :height="height" :padding="[]">
        <bc-list hoverable divider v-if="config && config.items && config.items.length">
          <bc-list-item @click="onItemClick(item)" v-for="item in config.items" :class="itemCssClasses(item)" :disabled="item.disabled" :inert="item.inert">
            <bc-list-item-icon v-if="config.leftIcons">
              <bc-icon v-if="item.iconLeft" :name="item.iconLeft" />
            </bc-list-item-icon>
            <bc-list-item-content :class="[!config.leftIcons ? 'pl-2' : null, !config.rightIcons ? 'pr-2' : null]">
              <bc-list-item-content-title truncate v-if="item.title" :font-weight="fontWeightTitle" :font-size="fontSizeTitle">{{ item.title }}</bc-list-item-content-title>
              <bc-list-item-content-sub-title truncate v-if="item.subTitle" :font-weight="fontWeightSubTitle" :font-size="fontSizeSubTitle">{{ item.subTitle }}</bc-list-item-content-sub-title>
            </bc-list-item-content>
            <bc-list-item-icon v-if="config.rightIcons">
              <bc-icon v-if="item.iconRight" :name="item.iconRight" />
            </bc-list-item-icon>
          </bc-list-item>
        </bc-list>
      </bc-card-text>
    </bc-card>
    <bc-reactive-style v-if="config">
    html, body
    {
      overflow: hidden;
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

/**
 * config: {
 *   $event: PointerEvent,
 *   leftIcons: Boolean,
 *   rightIcons: Boolean,
 *   width: String,
 *   items: [{
 *     title: String,
 *     subTitle: String,
 *     iconLeft: String,
 *     iconRight: String,
 *     event: {
 *       name: String,
 *       data: null
 *     }
 *   }]
 * }
 */

export default {
  name: 'BcContextMenu',
  mixins: [
    methods
  ],
  data () {
    return {
      height: 'auto', // @todo: this is to be determined by the position of the menu
      baseCss: this.componentBaseCss('context-menu'),
      config: null,
      top: 0,
      left: 0
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.config ? 'opacity-100' : ['opacity-0', 'pointer-events-none'],
        'select-none',
        'fixed',
        'transition-opacity',
        'transition-duration-500'
      ]
    },
    componentStyles () {
      return {
        top: this.top,
        left: this.left,
        zIndex: this.zIndex
      }
    }
  },
  mounted () {
    this.bind()
  },
  unmounted () {
    this.unbind()
  },
  props: {
    elevation: {
      type: String,
      default: 'xl'
    },
    fontSizeSubTitle: {
      type: String,
      default: 'xs'
    },
    fontSizeTitle: {
      type: String,
      default: 'sm'
    },
    fontWeightSubTitle: {
      type: String,
      default: 'normal'
    },
    fontWeightTitle: {
      type: String,
      default: 'normal'
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    roundness: {
      type: String,
      default: 'xl'
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    bind () {
      this.$emitter.on('bc-context-menu:show', config => {
        const $el = this.$el
        $el.style.width = config.width || '220px'
        this.config = config
        this.$nextTick(() => {
          const $event = config.$event
          const menuRect = $el.getBoundingClientRect()
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          const margin = 4
          let left = $event.clientX
          let top = $event.clientY
          if (left + menuRect.width > viewportWidth) {
            left = left - menuRect.width
          }
          if (top + menuRect.height > viewportHeight) {
            top = top - menuRect.height
          }
          left = Math.max(margin, Math.min(left, viewportWidth - menuRect.width - margin))
          top = Math.max(margin, Math.min(top, viewportHeight - menuRect.height - margin))
          this.top = `${top}px`
          this.left = `${left}px`
        })
      })
      document.addEventListener('click', this.hideContextMenu)
    },
    unbind () {
      document.removeEventListener('click', this.hideContextMenu)
    },
    itemCssClasses (item) {
      return [
        item.disabled || item.inert ? 'cursor-default' : 'cursor-pointer'
      ]
    },
    onItemClick (item) {
      const data = {item, $event: this.config.$event}
      this.$emitter.emit(item.event.name, data)
      this.hideContextMenu()
    },
    hideContextMenu () {
      this.config = null
      this.top = 0
      this.left = 0
    }
  }
}
</script>
