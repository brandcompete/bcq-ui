<template>
  <bc-container :class="[baseCss]" v-if="variables">
    <bc-card>
      <bc-card-title :padding="['p-1', 'pb-0']" font-size="lg">
        <bc-table-layout :class="['my-2']">
          <bc-table-layout-row>
            <bc-table-layout-cell :class="['w-10']">{{ getLang.cssVariablesEditor }}</bc-table-layout-cell>
            <bc-table-layout-cell>
              <bc-btn color="discovery" variant="ghost" @click="downloadCssVariables()" :icon-left="$icons.download" roundness="sm" size="sm" block uppercase>{{ getLang.download }}</bc-btn>
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </bc-card-title>
      <bc-card-text>
        <bc-alert visible color="discovery" variant="solid" :icon="$icons.info" :dismissible="false" :class="['mb-2']">{{ getLang.cssVariablesEditorInfo }}</bc-alert>
        <bc-collapsible :multiple="multiple" header-font-weight="normal">
          <bc-collapsible-item v-for="block in variables" :icon="$icons.cssVariable" :label="block.comment" v-model:expanded="block.expanded">
            <bc-grid-col :span="12" v-for="variable in block.variables" :class="['p-2']">
              <bc-grid>
                <bc-grid-col :span="6" :class="['text-right', 'align-content-center', 'pr-1']">{{ variable.name }}:</bc-grid-col>
                <bc-grid-col :span="6" :class="['pl-2']">
                  <bc-color-picker v-if="['rgb', 'rgba'].includes(variable.type)" v-model:value="variable.value" />
                  <bc-text-field v-else-if="['transition', 'css-filter', 'px', 'border', 'var', 'font-family'].includes(variable.type)" v-model:value="variable.value" :multiline="['font-family'].includes(variable.type)" />
                </bc-grid-col>
              </bc-grid>
            </bc-grid-col>
          </bc-collapsible-item>
        </bc-collapsible>
      </bc-card-text>
      <bc-card-actions :padding="['p-1', 'pb-0']" font-size="lg">
        <bc-table-layout :class="['my-2']">
          <bc-table-layout-row>
            <bc-table-layout-cell :class="['w-10']" />
            <bc-table-layout-cell>
              <bc-btn color="discovery" variant="ghost" @click="downloadCssVariables()" :icon-left="$icons.download" roundness="sm" size="sm" block uppercase>{{ getLang.download }}</bc-btn>
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </bc-card-actions>
    </bc-card>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'CssVariablesEditor',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'css-variables-editor',
      variables: null
    }
  },
  props: {
    url: {
      type: String,
      default: '/code/variables.css'
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.getVariablesCss()
  },
  methods: {
    getVariablesCss () {
      this.$http({
        url: this.url
      }).then(response => {
        this.variables = this.parseCssVariables(response.data).root
      })
    },
    detectType (value) {
      const v = value.trim()
      const fn = v.match(/^([a-z-]+)\(/i)?.[1]?.toLowerCase()

      if (/^var\(/i.test(v)) return 'var'
      if (fn === 'rgb' || fn === 'rgba') return fn
      if (fn === 'hsl' || fn === 'hsla') return fn
      if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return 'hex'
      if (['blur', 'brightness', 'contrast', 'drop-shadow', 'grayscale', 'hue-rotate', 'invert', 'opacity', 'saturate', 'sepia'].includes(fn)) return 'css-filter'
      if (/cubic-bezier\(|\b(ease|ease-in|ease-out|ease-in-out|linear|steps)\b/.test(v)) return 'transition'
      if (/^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)\s/.test(v)) return 'border'
      if (v.includes(',') && /(serif|sans-serif|monospace|system-ui|cursive|fantasy|")/.test(v)) return 'font-family'

      const unit = v.match(/^-?(\d+\.?\d*|\.\d+)(px|%|rem|em|vh|vw|vmin|vmax|ms|s|deg|fr|ch|dvh|dvw)?$/i)
      if (unit) return unit[2] ? unit[2].toLowerCase() : 'number'

      return 'string'
    },
    parseCssVariables (css) {
      const result = {}
      // comments may contain braces (e.g. "bg-{color}"): swap them for placeholders before splitting into rules
      const comments = []
      const source = css.replace(/\/\*([\s\S]*?)\*\//g, (_, text) => `/*${comments.push(text) - 1}*/`)
      const ruleRegex = /([^{}]+)\{([^}]*)\}/g
      let rule

      while ((rule = ruleRegex.exec(source)) !== null) {
        const key = rule[1].replace(/\/\*\d+\*\//g, '').trim().replace(/^:+/, '')
        const blocks = []
        let current = null

        const startBlock = (comment = null) => {
          current = { comment, expanded: false, variables: [] }
          blocks.push(current)
        }

        // comments, declarations and empty lines, in order
        const tokenRegex = /\/\*(\d+)\*\/|(--(?:\\.|[^:\s;])+)\s*:\s*([^;]*);|(\n[ \t]*\n)/g
        let token

        while ((token = tokenRegex.exec(rule[2])) !== null) {
          const [, comment, name, value, emptyLine] = token

          if (comment !== undefined) {
            startBlock(comments[comment].replace(/\s+/g, ' ').trim())
          } else if (emptyLine !== undefined) {
            current = null
          } else {
            if (!current) startBlock()
            const cleanValue = value.replace(/\s+/g, ' ').trim()
            current.variables.push({ name, value: cleanValue, type: this.detectType(cleanValue) })
          }
        }
        // drop blocks without variables (e.g. a "@todo" comment)
        result[key] = [...(result[key] || []), ...blocks.filter(b => b.variables.length)]
      }

      return result
    },
    exportCssVariables (blocks = this.variables, selector = ':root') {
      const body = blocks
        .filter(block => block.variables.length)
        .map(block => {
          const lines = block.comment ? [`  /* ${block.comment} */`] : []
          block.variables.forEach(variable => {
            lines.push(`  ${variable.name}: ${String(variable.value).trim()};`)
          })
          return lines.join('\n')
        })
        .join('\n\n')

      return `${selector}\n{\n${body}\n}\n`
    },
    downloadCssVariables (fileName = this.url.replace('/code/', '')) {
      const url = URL.createObjectURL(new Blob([this.exportCssVariables()], { type: 'text/css' }))
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    }
  }
}
</script>
