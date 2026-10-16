<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
<!--        <toolbar :margin="[]"></toolbar>-->
<!--        <component-work-in-progress name="bc-context-menu" />-->
        <bc-grid>
          <bc-grid-col :span="config.cols - 1" v-for="col in config.cols" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text :padding="[]">
                <bc-lazy-image @contextmenu="onContextMenu($event, 'guitar', col)" aspect-ratio="1/1" :src="config.guitar.replace('{index}', col)" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
          <bc-grid-col :span="config.cols - 1" v-for="col in config.cols" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text v-aspect-ratio="1/1" x-align="center" :padding="[]" :class="['flex', 'align-items-center', 'justify-content-center']">
                <bc-avatar @contextmenu="onContextMenu($event, 'avatar')" :color="getUiColors[col]" variant="outline" size="128px" font-size="xl">{{ getUiColors[col] }}</bc-avatar>
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
          <bc-grid-col :span="config.cols - 1" v-for="col in config.cols" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text :padding="[]">
                <bc-flag @contextmenu="onContextMenu($event, 'flag')" block square :code="config.flags[col - 1]" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcContextMenu',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    },
    onContextMenu ($event, menu, index) {
      const pageConfig = this.config
      if (!pageConfig.menus[menu].items) {
        return
      }
      $event.preventDefault()
      const anyData = 'any data can be passed'
      const menuConfig = pageConfig.menus[menu]
      const textContent = $event.target.textContent
      const config = {
        $event,
        leftIcons: menuConfig.leftIcons,
        rightIcons: menuConfig.rightIcons,
        items: pageConfig.menus[menu].items.map((item, itemIndex) => {
          item.title = item.title.replace('{textContent}', this.capitalizeFirstLetter(textContent) || 'Flag')
          item.disabled = itemIndex === 3
          item.inert = itemIndex === 4
          item.event = {
            name: `${menu}:${item.title.toLowerCase().replace(/\s/g, '-')}`,
            data: {menu, index, a: anyData, b: anyData, c: anyData}
          }
          return item
        })
      }
      this.$emitter.emit('bc-context-menu:show', config)
    }
  }
}
</script>
