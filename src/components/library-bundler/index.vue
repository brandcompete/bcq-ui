<template>
  <bc-container :class="[baseCss]" v-if="defs">
    <flat-card :content-padding="[]">
      <toolbar :divider="false" :margin="['mt-2']" :title="false">
        <bc-table-layout y-align="middle">
          <bc-table-layout-row>
            <bc-table-layout-cell :class="['w-full', 'pl-2', 'pr-1']">
              <bc-text-field clearable :icon-left="$icons.search" v-model:value="search" :placeholder="getLang.searchComponents" />
            </bc-table-layout-cell>
            <bc-table-layout-cell :class="['white-space-nowrap', 'pr-2', 'pl-1']" x-align="center">
              <a href="#" @click.prevent="dialog = true" v-text="getLang.bundleCode" :class="['underline']" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </toolbar>
      <bc-list divider v-if="filteredComponents.length">
        <bc-list-item @click="toggleItem(component)" v-for="component in filteredComponents" :class="listItemCssClasses(component)">
          <bc-list-item-icon>
            <bc-checkbox inert :indeterminate="isComponentRequired(component.name)" v-model:checked="component.checked" :class="checkboxCssClasses(component)" />
          </bc-list-item-icon>
          <bc-list-item-content :class="[component.checked ? null : ['opacity-75']]">
            <bc-list-item-content-title v-text="camelCaseToWords(component.name)" />
            <bc-list-item-content-sub-title :class="['opacity-75']" v-if="isComponentRequired(component.name)" v-text="getLang.componentIsRequired.toUpperCase()" />
            <bc-list-item-content-sub-title :class="['opacity-75']" v-html="componentName(component.name)" />
            <bc-list-item-content-sub-title :truncate="false" :class="['opacity-75']" v-if="component.dependencies.components.length" v-text="getLang.dependencies(component.dependencies.components)" />
          </bc-list-item-content>
        </bc-list-item>
      </bc-list>
      <bc-alert v-else :dismissible="false" :icon="$icons.alert" color="caution" variant="soft" :class="['mx-2', 'mb-2']">
        <p :class="['font-bold']">{{ getLang.noDocumentationFound }}</p>
        <p :class="['opacity-75']">{{ getLang.tryDifferentSearch }}</p>
      </bc-alert>
    </flat-card>
    <bc-dialog-box :persistent="false" :min-width="dialogWidth" v-model:visible="dialog" :icon="$icons.bundler" title-color="discovery" :title="getLang.bundleCode">
      <bc-grid>
        <bc-grid-col :span="4" :class="['p-1']" v-for="(data, file) in dialogPanels">
          <syntax-highlight highlight-plain-text :white-space-break-spaces="false" :margin="[]" :title="file" :data="getTemplateData(data)" language="javascript" />
        </bc-grid-col>
      </bc-grid>
    </bc-dialog-box>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'LibraryBundler',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      search: '',
      dialog: false,
      baseCss: 'library-bundler',
      components: {},
      bcqUiJsTemplate: null,
      libJsTemplate: null
    }
  },
  props: {
    defs: {
      type: Object
    },
    dialogWidth: {
      type: String,
      default: '94%'
    },
    dialogPanels: {
      type: Object,
      default () {
        return {
          'lib.js': 'libJsTemplate',
          'components.js': 'componentsExport',
          'bcq-ui.js': 'bcqUiJsTemplate'
        }
      }
    }
  },
  computed: {
    filteredComponents () {
      const defs = this.defs
      return defs.components
        .filter(component => !defs.hidden.includes(component.name))
        .filter(component => {
          const search = this.search
          const term = search ? search.toLowerCase() : ''
          return component.name.toLowerCase().indexOf(term) > -1
        })
    },
    required () {
      return this.defs.required
    },
    componentsExport () {
      let items = []
      const bcqUiJsTemplateExport = [
        '// custom bcq-ui.js',
        'export { default as BcqUi } from \'/path/to/bcq-ui.js\'\n\n'
      ]
      Object.keys(this.components).forEach(name => {
        const component = this.components[name]
        const mainExport = component.export
        items.push(mainExport)
        items = items.concat(component.dependencies)
      })
      return `${bcqUiJsTemplateExport.join('\n')}${[...new Set(items)].join('\n')}`
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.required.forEach(name => {
        const component = this.getComponentByName(name)
        this.components[name] = {
          export: this.makeExport(name),
          dependencies: this.makeDependenciesExport(component.dependencies.components)
        }
      })
      this.getTemplate('bcqUiJsTemplate')
      this.getTemplate('libJsTemplate')
    },
    getTemplateData (name) {
      return this[name]
    },
    getTemplate (templateName) {
      const defs = this.defs
      this.$http({
        url: defs[templateName]
      }).then(template => {
        this[templateName] = template.data
          .replace(/{repo}/gi, defs.repo)
          .replace(/components\//gi, '')
      })
    },
    makeDependenciesExport (dependencies = []) {
      let deps = []
      dependencies.forEach(dependency => {
        const component = this.getComponentByName(dependency)
        deps.push(component.name)
        deps = deps.concat(component.dependencies.components)
      })
      return deps.map(dependency => {
        return this.makeExport(dependency)
      })
    },
    makeLabel (type, items) {
      return `${type}: ${items.join(', ')}`
    },
    getComponentByName (name) {
      const components = this.defs.components
      const index = components.findIndex(component => component.name === name)
      return components[index]
    },
    toggleItem (item) {
      const components = this.components
      const name = item.name
      item.checked = !item.checked
      this.search = ''
      if (components[name]) {
        delete components[name]
      } else {
        components[name] = {
          export: this.makeExport(name),
          dependencies: this.makeDependenciesExport(item.dependencies.components)
        }
      }
      // console.log(this.componentsExport)
    },
    makeExport (name) {
      return `export { default as Bc${name} } from '${this.defs.repo}${this.toKebabCase(name)}'`
    },
    toKebabCase (string) {
      return string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase()
    },
    isComponentRequired (name) {
      return this.defs.required.includes(name)
    },
    listItemCssClasses (component) {
      const name = component.name
      return [
        this.isComponentRequired(name) ? ['pointer-events-none'] : ['cursor-pointer'],
        'transition-duration-500',
        'transition-all'
      ]
    },
    componentName (name) {
      return `&lt;bc-${this.toKebabCase(name)} /&gt;`
    },
    checkboxCssClasses (component) {
      return [
        component.checked ? this.isComponentRequired(component.name) ? 'text-grey' : 'text-green' : 'text-red'
      ]
    }
  }
}
</script>
<style>
.library-bundler .syntax-highlight pre
{
  height: 70dvh;
}
</style>
