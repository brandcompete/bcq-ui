<template>
  <bc-container :class="componentCssClasses" v-if="content">
    <flat-card :title="title" :margin="margin">
      <template v-slot:title-controls>
        <bc-icon @click="copyCode" :name="$icons.copy" :class="copyCodeIconCssClasses" :title="getLang.copy" />
      </template>
      <bc-card elevation="none">
        <bc-card-text><pre :class="[whiteSpaceBreakSpaces ? ['white-space-break-spaces', 'word-break-all'] : ['overflow-auto']]"><code :key="key" v-html="content" :class="codeCssClasses" /></pre></bc-card-text>
      </bc-card>
    </flat-card>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
// import 'highlight.js/styles/rainbow.min.css'
// import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/stackoverflow-dark.min.css'
// import 'highlight.js/styles/agate.min.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)

export default {
  name: 'SyntaxHighlight',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      key: 0,
      content: null,
      baseCss: 'syntax-highlight',
    }
  },
  computed: {
    componentCssClasses () {
      return [this.baseCss]
    },
    codeCssClasses () {
      return [
        'code',
        `text-${this.size}`,
        `language-${this.language}`
      ]
    }
  },
  props: {
    language: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    data: {
      type: [Object, String]
    },
    size: {
      type: String,
      default: 'sm'
    },
    whiteSpaceBreakSpaces: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    margin: {
      type: Array,
      default () {
        return ['mb-4']
      }
    },
    highlightPlainText: {
      type: Boolean
    }
  },
  watch: {
    data () {
      if (this.data) {
        this.highlight()
      }
    }
  },
  mounted () {
    this.highlight()
  },
  methods: {
    highlight () {
      const language = {
        language: this.language
      }
      const highlight = hljs.highlight
      if (this.data) {
        return this.content = this.highlightPlainText ? highlight(this.data, language).value : highlight(JSON.stringify(this.data, null, 2), language).value
      }
      this.$http(`${this.url}?${this.rnd()}`).then(response => {
        this.content = highlight(response.data, language).value
      })
    },
    copyCode () {
      this.copyToClipboard(this.$el.querySelector('.code').textContent).then(() => {
        this.$emitter.emit('bc-snackbar:message', {
          message: this.getLang.copiedToClipboard,
          autoCloseDelay: 5000,
          color: 'success',
          variant: 'solid'
        })
      })
    }
  }
}
</script>
