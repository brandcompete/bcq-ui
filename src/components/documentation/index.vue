<template>
  <bc-grid :class="[baseCss, 'mt-4']" data-anchor="documentation">
    <bc-grid-col :span="12">
      <flat-card>
        <template v-if="docs[selectedComponent]">
          <bc-alert v-if="dropdown.length > 1" :icon="$icons.info" :dismissible="false" color="success" variant="soft" :class="['m-1', 'mb-0']">{{ getLang.componentHasSubComponents }}</bc-alert>
          <bc-grid :class="['my-1']">
            <bc-grid-col
              :xl="dropdown.length === 1 ? 12 : 8"
              :lg="dropdown.length === 1 ? 12 : 8"
              :md="dropdown.length === 1 ? 12 : 6"
              :sm="dropdown.length === 1 ? 12 : 6"
              :xs="dropdown.length === 1 ? 12 : 12"
              :class="['align-content-center', 'p-1']">
                <bc-container v-html="getLang.componentDocumentation(selectedComponent)" :class="['text-center', 'truncate']" />
            </bc-grid-col>
            <bc-grid-col v-if="dropdown.length > 1" :xl="4" :lg="4" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.components" :disabled="dropdown.length === 1" :class="[]" v-model:value="selectedComponent" :items="dropdown" :visible-items="dropdown.length" />
            </bc-grid-col>
          </bc-grid>
          <bc-divider :class="['mb-2']" />
          <bc-tabs :compact="compact" v-model:default-tab="defaultTab" :tab-panel-height="tabPanelHeight">
            <bc-tabs-panel v-for="tabPanel in tabs" :key="tabPanel" :icon="$icons[tabPanel]" :label="getLang[tabPanel]">
              <documentation-grid v-if="objectNotEmpty(docs[selectedComponent][tabPanel])" :tab="docs[selectedComponent][tabPanel]" :type="tabPanel" />
              <bc-alert v-else :class="['m-1', 'mt-2']" :icon="$icons.info" :dismissible="false" color="success" variant="soft">{{ getLang.noDocumentationForComponentTab(getLang[tabPanel]) }}</bc-alert>
            </bc-tabs-panel>
          </bc-tabs>
        </template>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import DocumentationGrid from './documentation-grid.vue'
import {
  PageStore
} from '@/stores/page.js'

// @todo: show message to use the dropdown if there are nested components
export default {
  name: 'Documentation',
  components: {
    DocumentationGrid
  },
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'documentation',
      defaultTab: 0,
      selectedComponent: []
    }
  },
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    docs: {
      type: Object
    },
    pageTitle: {
      type: String
    },
    tabPanelHeight: {
      type: String,
      default: null // '480px'
    },
    tabs: {
      type: Array,
      default () {
        return [
          'props',
          'slots',
          'events'
        ]
      }
    }
  },
  computed: {
    dropdown () {
      return this.mapToDropdownArray(Object.keys(this.docs))
    }
  },
  mounted () {
    this.init()
  },
  created () {
    this.bind()
  },
  methods: {
    bind () {
      PageStore().$subscribe(() => this.init())
    },
    init () {
      this.selectedComponent = [Object.keys(this.docs)[0]]
      this.resetTabs()
    },
    resetTabs () {
      this.defaultTab = 0
    }
  }
}
</script>
