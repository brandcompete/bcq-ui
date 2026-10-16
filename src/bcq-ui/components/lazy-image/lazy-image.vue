<template>
  <bc-container :tag="tag" :to="to" :href="href" :display="block ? 'block' : 'inline-block'" :style="componentStyle" :class="componentCssClasses">
    <div v-if="loading || error" :class="['flex', 'align-items-center', 'justify-content-center', 'h-full']">
      <bc-icon :size="iconsSize" :provider="iconsProvider" :name="loading ? loadingIcon : errorIcon" :class="loadingIconCssClasses" />
    </div>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcLazyImage',
  mixins: [
    methods
  ],
  data () {
    return {
      observer: null,
      loading: true,
      image: null,
      error: false,
      baseCss: this.componentBaseCss('lazy-image')
    }
  },
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.loading ? ['cursor-wait', `${baseCss}-loading`] : null,
        this.error ? [`${baseCss}-error`] : null,
        this.block ? null : ['align-middle'],
        this.width ? null : ['w-full'],
        'select-none'
      ]
    },
    loadingIconCssClasses () {
      return [
        this.error ? null : 'animate-spin',
        this.makeFontSize(this.iconsSize)
      ]
    },
    componentStyle () {
      return {
        width: this.width,
        height: this.height,
        background: this.loading ? null : `url("${this.src}") no-repeat center/${this.backgroundSize}`,
        aspectRatio: !this.height && !this.width ? this.aspectRatio : null
      }
    }
  },
  props: {
    aspectRatio: {
      type: String,
      default: '4/3'
    },
    backgroundSize: {
      type: String,
      default: 'cover'
    },
    block: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'image-broken-variant'
    },
    height: {
      type: String
    },
    href: {
      type: String
    },
    loadingIcon: {
      type: String,
      default: 'loading'
    },
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    iconsSize: {
      default: '3xl'
    },
    options: {
      type: Object,
      default () {
        return {
          root: null,
          rootMargin: '0px',
          scrollMargin: '0px',
          threshold: 1
        }
      }
    },
    src: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'figure'
    },
    to: {
      type: String
    },
    width: {
      type: String
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.loading) {
        const target = this.$el
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const src = this.src
              const eventData = {src, el: target, component: this}
              this.image = new Image()
              this.image.src = this.src
              this.image.onerror = () => {
                this.error = true
                this.$emit('error', eventData)
              }
              this.image.onload = () => {
                this.image = null
                this.$emit('load', eventData)
              }
              this.loading = false
              this.observer.unobserve(target)
            }
          })
        }, this.options)
        this.observer.observe(target)
      }
    }
  }
}
</script>
<style>
.bc-lazy-image.bc-lazy-image-loading
{
  background: var(--lazy-image-light);
}

.bc-app-theme-dark .bc-lazy-image.bc-lazy-image-loading
{
  background: var(--lazy-image-dark);
}

.bc-lazy-image.bc-lazy-image-error
{
  background: var(--lazy-image-error) !important;
}
</style>
