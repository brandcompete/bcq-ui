<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-table-layout y-align="middle" :class="['mb-2']">
            <bc-table-layout-row>
              <bc-table-layout-cell :class="['w-full', 'px-1']">
                <bc-text-field v-model:value="search" :placeholder="getLang.searchFlags(config.flags.length)" :icon-left="$icons.search" />
              </bc-table-layout-cell>
              <bc-table-layout-cell :class="['px-1']">
                <bc-checkbox v-model:checked="config.square" label="square" :block="false" />
              </bc-table-layout-cell>
            </bc-table-layout-row>
          </bc-table-layout>
          <bc-alert :dismissible="false" v-if="!flags.length" :icon="$icons.alert" variant="soft" color="caution" :class="['m-1', 'my-2']">
            <p :class="['font-bold']">{{ getLang.noFlagsFound }}</p>
            <p :class="['opacity-75']">{{ getLang.tryDifferentSearch }}</p>
          </bc-alert>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="2" :lg="2" :md="3" :sm="4" :xs="6" :class="['p-1']" v-for="flag in flags">
            <bc-card elevation="none" :class="['text-center']">
              <bc-card-title v-text="flag.name" x-align="center" />
              <bc-card-text :padding="[]">
                <bc-flag :square="config.square" :code="flag.code" />
              </bc-card-text>
              <bc-card-title font-weight="normal" truncate>code: {{ flag.code }}</bc-card-title>
              <bc-divider />
              <bc-card-title :class="['opacity-75']" font-size="xs" font-weight="normal" truncate>capital: {{ flag.capital || 'null' }}</bc-card-title>
              <bc-divider />
              <bc-card-title :class="['opacity-75']" font-size="xs" font-weight="normal" truncate>continent: {{ flag.continent || 'null' }}</bc-card-title>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcFlag',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      search: '',
      config: null
    }
  },
  computed: {
    flags () {
      return this.config.flags.filter(flag => {
        return this.searchIn.some(key => (flag[key] || '').toLowerCase().includes(this.search.toLowerCase()))
      })
    }
  },
  props: {
    searchIn: {
      type: Array,
      default () {
        return [
          'name',
          'code',
          'capital',
          'continent'
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPageMeta().then(data => {
        this.config = data.config
      })
    }
  }
}
</script>
