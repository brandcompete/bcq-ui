<template>
  <flat-card :class="[baseCss, '-mt-2']" v-if="links.length" :content-padding="['p-0']">
    <bc-heading font-size="sm" :divider-margin="['my-1']" :padding="['px-2', 'pt-1']" :class="['opacity-50']">{{ getLang.pageLinks }}</bc-heading>
    <bc-list hoverable clickable :max-height="listStyle" divider>
      <bc-list-item v-if="topLink" :class="['opacity-50']" @click.prevent="scrollToTop" :title="label('topOfThePage')">
        <bc-list-item-icon>
          <bc-icon :name="$icons.chevronUp" />
        </bc-list-item-icon>
        <bc-list-item-content>
          <bc-list-item-content-title font-weight="normal" v-text="label('topOfThePage')" />
        </bc-list-item-content>
      </bc-list-item>
      <bc-list-item @click.prevent="scroll(link)" v-for="(link, index) in links" :key="index" :title="label(link)">
        <bc-list-item-icon>
          <bc-icon :name="$icons.chevronLeft" />
        </bc-list-item-icon>
        <bc-list-item-content>
          <bc-list-item-content-title :class="['capitalize']" font-weight="normal" v-text="label(link)" />
        </bc-list-item-content>
      </bc-list-item>
      <bc-list-item v-if="getConfig.showPageData" @click.prevent="scroll('page-data')" :title="label('pageData')" :class="['opacity-50']">
        <bc-list-item-icon>
          <bc-icon :name="$icons.chevronDown" />
        </bc-list-item-icon>
        <bc-list-item-content>
          <bc-list-item-content-title font-weight="normal" v-text="label('pageData')" />
        </bc-list-item-content>
      </bc-list-item>
    </bc-list>
  </flat-card>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageAnchors',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'page-anchors',
    }
  },
  props: {
    topLink: {
      type: Boolean,
      default: true
    },
    links: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    listStyle () {
      return 'calc(100dvh - 94px)'
    }
  },
  watch: {
    'links.length' () {
      this.$emit('toggle-sidebar-right', this.links.length)
    }
  },
  methods: {
    scroll (link) {
      this.scrollToElement(`[data-anchor="${link}"]`)
    },
    label (link) {
      return this.removeDashes((this.getLang[link] || link))
    }
  }
}
</script>
