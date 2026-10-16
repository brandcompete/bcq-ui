<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'align-content-center']">
              <bc-dropdown :icon="$icons.disabled" v-tooltip="{text: 'disabled or inert'}" v-model:value="config.disabledOptionsDropdownSelection" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'align-content-center']">
              <bc-btn block roundness="sm" :icon-left="$icons.expand" color="discovery" size="sm" @click="expandAll">expand all</bc-btn>
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1', 'align-content-center']">
              <bc-btn block roundness="sm" :icon-left="$icons.collapse" color="discovery" size="sm" @click="collapseAll">collapse all</bc-btn>
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['align-content-center', 'p-1', 'text-center']">
              <bc-checkbox v-model:checked="config.icon" label="icon" :block="false" />
              <bc-checkbox v-model:checked="config.multiple" label="multiple" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-collapsible
          :multiple="config.multiple"
          :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
          :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
          :key="key">
          <bc-collapsible-item
            @update:expanded="onUpdateExpanded"
            v-model:expanded="item.expanded"
            v-for="item in config.items"
            :icon="config.icon ? item.icon : null"
            :label="item.meta.pageTitle" :sub-label="item.category">
            <bc-lorem-ipsum />
<!--            <template v-slot:top>-->
<!--              <bc-btn>top</bc-btn>-->
<!--            </template>-->
<!--            <template v-slot:right>-->
<!--              <bc-btn>right</bc-btn>-->
<!--            </template>-->
<!--            <template v-slot:bottom>-->
<!--              <bc-btn>bottom</bc-btn>-->
<!--            </template>-->
<!--            <template v-slot:left>-->
<!--              <bc-btn>left</bc-btn>-->
<!--            </template>-->
          </bc-collapsible-item>
        </bc-collapsible>
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
  name: 'PageBcCollapsible',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      key: 0,
      config: null
    }
  },
  watch: {
    'config.multiple' () {
      this.$emitter.emit('bc-collapsible-item:collapse', null)
      this.key++
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        data.config.items = this.getRoutes
            .filter(item => item.meta)
            .filter(item => item.render)
            .filter(item => item.category === 'forms')
        this.config = data.config
      })
    },
    expandAll () {
      this.$emitter.emit('bc-collapsible:expand-all')
    },
    collapseAll () {
      this.$emitter.emit('bc-collapsible:collapse-all')
    },
    onUpdateExpanded ($event) {
      this.log('@update:expanded', 'bc-collapsible-item', $event)
    }
  }
}
</script>
