<template>
  <bc-container :inert="inert" :data-dialog-box-id="id" :class="componentCssClasses">
    <bc-container :id="id" :style="editorStyle" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import quill from 'quill'

export default {
  name: 'BcEditor',
  mixins: [
    methods
  ],
  data () {
    return {
      quill,
      id: `bc-editor-${this.uuid()}`,
      editor: null,
      baseCss: this.componentBaseCss('editor')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null
      ]
    },
    editorStyle () {
      return {
        height: this.height
      }
    }
  },
  watch: {
    disabled () {
      this.editor.enable(!this.disabled)
    }
  },
  emits: [
    'update:value'
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '320px'
    },
    inert: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    theme: {
      type: String,
      default: 'snow'
    },
    value: {
      type: String
    },
    toolbars: {
      type: Array,
      default () {
        return [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'blockquote', 'image', 'code-block'],
        ]
      }
    },
    toolsColor: {
      // @todo
    },
    toolsColorActive: {
      // @todo
    },
  },
  beforeUnmount () {
    this.editor = null;
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const config = {
        theme: this.theme,
        placeholder: this.placeholder,
        bounds: document.body,
        modules: {
          toolbar: this.toolbars
        }
      }
      this.editor = new this.quill(`#${this.id}`, config)
      this.editor.on('text-change', () => {
        this.$emit('update:value', this.editor.getSemanticHTML())
      })
      this.editor.enable(!this.disabled)
      if (this.value) {
        this.setHTML()
      }
    },
    setHTML () {
      this.editor.root.innerHTML = this.value
    }
  }
}
</script>
<style>
.bc-editor
{
  /* .ql-active */
  /* @todo: styles for dark theme, some tweaks to match bcqui */
}
</style>
