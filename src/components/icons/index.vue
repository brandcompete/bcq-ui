<template>
  <bc-container :class="[baseCss]" v-if="icons.length">
    <bc-grid>
      <bc-grid-col :span="12" v-if="title">
        <bc-table-layout y-align="middle">
          <bc-table-layout-row>
            <bc-table-layout-cell :class="['w-full', 'p-1']">
              <bc-heading :divider="false">{{ title }}</bc-heading>
            </bc-table-layout-cell>
            <bc-table-layout-cell v-if="providerUrl" x-align="center" :class="['p-1']">
              <bc-icon :name="$icons.link" tag="a" :href="providerUrl" target="_blank" :title="title" :class="['cursor-pointer']" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
      </bc-grid-col>
      <bc-grid-col :span="12" v-if="searchable" :class="['mb-1', 'px-1']">
        <bc-text-field clearable v-model:value="search" :placeholder="getLang.searchIcons(icons.length)" :icon-left="$icons.search" />
      </bc-grid-col>
      <bc-grid-col @click="copyIconName(icon)" :xl="3" :lg="3" :md="4" :sm="4" :xs="6" v-if="filteredIcons.length" v-for="icon in filteredIcons" :span="span" :class="['text-center', 'p-1']">
        <bc-card @click="copyIconName(icon)" :class="['cursor-pointer']" :title="getLang.copyToClipboard(icon)">
          <bc-card-title font-weight="normal" :class="['code', 'opacity-60']">{{ provider }}</bc-card-title>
          <bc-divider />
          <bc-card-text>
            <bc-icon :name="icon" :provider="provider" :size="size" />
          </bc-card-text>
          <bc-divider />
          <bc-card-title font-weight="normal" :class="['code', 'opacity-60']">{{ icon }}</bc-card-title>
        </bc-card>
      </bc-grid-col>
      <bc-grid-col v-else :span="12">
        <bc-alert :dismissible="false" :icon="$icons.alert" color="caution" variant="soft">
          <p :class="['font-bold']">{{ getLang.noIconsFound }}</p>
          <p :class="['opacity-75']">{{ getLang.tryDifferentSearch }}</p>
        </bc-alert>
      </bc-grid-col>
    </bc-grid>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'Icons',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'icons',
      icons: [],
      search: ''
    }
  },
  props: {
    searchable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    provider: {
      type: String,
      default: 'mdi'
    },
    providerUrl: {
      type: String
    },
    size: {
      type: Number,
      default: 3
    },
    span: {
      type: Number,
      default: 3
    }
  },
  computed: {
    filteredIcons () {
      return this.icons.filter(icon => {
        const search = this.search
        const term = search ? search.toLowerCase() : ''
        return icon.toLowerCase().indexOf(term) > -1
      })
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getIcons()
    },
    getIcons () {
      this.$http({url: `/data/icons/${this.provider}.json`}).then(response => {
        this.icons = response.data
      })
    },
    copyIconName (icon) {
      this.copyToClipboard(icon).then(() => {
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
