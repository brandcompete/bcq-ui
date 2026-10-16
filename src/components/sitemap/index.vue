<template>
  <bc-container :class="[baseCss]" v-if="config">
    <template v-if="toolbar">
      <bc-grid>
        <code-files :code-files="config.codeFiles" />
      </bc-grid>
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :span="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.showIconLeft" label="list-item-icon (left)" :block="false" />
              <bc-checkbox v-model:checked="config.showIconRight" label="list-item-icon (right)" :block="false" />
              <bc-checkbox v-model:checked="config.showListItemTitle" label="list-item-title" :block="false" />
              <bc-checkbox v-model:checked="config.showListItemSubTitle" label="list-item-sub-title" :block="false" />
              <bc-checkbox v-model:checked="config.divider" label="divider" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
      </flat-card>
    </template>
    <flat-card :margin="[]">
      <bc-list v-if="config.items.length" :class="['sitemap-list']" :divider="config.divider" :clickable="config.clickable" :disabled="toolbar && config.disabledOptionsDropdownSelection[0] === 'disabled'" :inert="toolbar && config.disabledOptionsDropdownSelection[0] === 'inert'">
        <bc-list-item v-for="(item, index) in config.items" :key="index" :tag="config.itemTag" :to="item.path" :href="item.path" :title="itemMeta(item)">
          <bc-list-item-icon v-if="config.showIconLeft">
            <bc-icon :name="item.icon" />
          </bc-list-item-icon>
          <bc-list-item-content>
            <bc-list-item-content-title v-if="config.showListItemTitle" v-text="itemMeta(item)" />
            <bc-list-item-content-sub-title :class="['uppercase', 'opacity-50']" font-size="xs" font-weight="semibold" v-if="config.showListItemSubTitle" v-text="getLang[item.category] || getConfig.appName" />
          </bc-list-item-content>
          <bc-list-item-icon v-if="config.showIconRight">
            <bc-icon name="chevron-double-right" />
          </bc-list-item-icon>
        </bc-list-item>
      </bc-list>
    </flat-card>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'Sitemap',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null,
      baseCss: 'sitemap',
    }
  },
  props: {
    toolbar: {
      type: Boolean,
      default: false
    },
    metaFile: {
      type: String,
      default: '/sitemap'
    },
    additionalRoutes: {
      type: Array,
      default () {
        return [
          'getting-started',
          'content',
          'ui',
          'forms',
          'directives'
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta(this.metaFile).then(data => {
        data.config.items = this.getRoutes.filter(item => item.render).concat(this.additionalRoutes.map(route => {
          return {
            name: `PageBc${this.capitalizeFirstLetter(route)}`,
            path: `/${route}`,
            icon: this.$icons[route] || 'home',
            meta: {
              pageTitle: this.getLang[route] || `${route} (not localized)`
            }
          }
        }))
        this.config = data.config
      })
    },
    itemMeta (item) {
      return item.meta ? item.meta.pageTitle : item.name
    }
  }
}
</script>
<style>
.sitemap-list [href="/:pathMatch(.*)*"],
.sitemap-list [href="/:category"]
{
  display: none;
}
</style>
