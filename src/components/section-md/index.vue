<template>
  <bc-container v-if="content" :hidden="!ready" :class="[baseCss]" v-html="content" />
</template>
<script>
import {
  marked
} from 'marked'

import methods from '@/mixins/methods.js'
import computed from '@/mixins/computed.js'

export default {
  name: 'SectionMd',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'section-md',
      content: null,
      ready: false
    }
  },
  watch: {
    '$route.path' () {
      this.getMdFile()
    }
  },
  props: {
    slug: {
      type: String
    },
    useRouter: {
      type: Boolean,
      default: true
    },
    setMetaContent: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.useRouter) {
      this.init()
    } else {
      this.getMdFile()
    }
  },
  methods: {
    init () {
      if (this.isHomePageMethod(this.$route.path)) {
        this.getMdFile()
      }
    },
    isHomePageMethod (slug) {
      return slug === '/'
    },
    getMdFile () {
      let slug = this.slug || this.$route.path
      if (['/getting-started/quick-start'].includes(slug)) {
        slug = '/getting-started'
      }
      this.content = ''
      if (this.isHomePageMethod(slug)) {
        slug = '/index'
      }
      const url = this.useRouter ? `/data/pages-md${this.removeTrailingSlash(slug)}.md?${this.rnd()}` : `/data/components-md/${slug}`
      this.$http({
        url
      }).then(response => {
        if (response.status === 200 && response.data) {
          this.content = marked(response.data)
          if (this.setMetaContent) {
            const metaDescription = this.getMetaDescription()
            if (metaDescription) {
              metaDescription.setAttribute('content', this.stripHtml(this.trimLineBreaks(response.data)))
            }
          }
          this.$nextTick(() => {
            this.format()
          })
        }
      }).catch(() => {})
    },
    format () {
      if (!this.$el.querySelectorAll) {
        return
      }
      this.select('h1').forEach(item => {
        item.classList.add('text-3xl', 'mb-3')
      })
      this.select('a').forEach(item => {
        item.classList.add('underline')
        const href = item.getAttribute('href')
        if (this.getConfig.addTrailingSlashToUrl && !this.hasTrailingSlash(href) && item.hasAttribute('v-link')) {
          item.setAttribute('href', `${href}/`)
        }
      })
      this.select('h2').forEach(item => {
        item.classList.add('text-xl', 'mb-3')
      })
      this.select('h3').forEach(item => {
        item.classList.add('text-lg', 'mb-2')
      })
      this.select('hr').forEach(item => {
        item.classList.add('bc-divider', 'my-1')
      })
      this.select('h4').forEach(item => {
        item.classList.add('text-base', 'mb-3')
      })
      this.select('h5, h6, p, ul, ol, div, span, pre, table').forEach(item => {
        item.classList.add('text-sm', 'mb-3')
        if (['OL', 'UL'].includes(item.tagName)) {
          item.classList.add('list-disc', 'list-style-position-inside')
        }
      })
      this.ready = true
    },
    select (selectors = '') {
      return this.$el.querySelectorAll(selectors)
    }
  }
}
</script>
