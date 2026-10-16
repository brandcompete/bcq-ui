<template>
  <bc-grid v-if="config">
    <code-files :code-files="config.codeFiles" />
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown label="color" :icon="$icons.color" v-model:value="config.color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['px-1', 'pb-2']">
              <bc-dropdown label="variant" :icon="$icons.variant" v-model:value="config.variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" :block="false" />
            </bc-grid-col>
            <bc-grid-col :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-model:checked="config.tile" label="tile" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col v-for="avatar in config.avatars" :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="['text-center', 'p-1']">
            <bc-card elevation="none">
              <bc-card-text :padding="['p-2']">
                <bc-avatar :font-size="avatar.fontSize" :tile="config.tile" :size="avatar.size" :icon="avatar.icon" :src="src(avatar.src)" :color="config.color[0]" :variant="config.variant[0]">
                  <template v-if="avatar.text">{{ avatar.text }}</template>
                </bc-avatar>
              </bc-card-text>
              <bc-divider />
              <bc-card-text :class="['text-left', 'p-2']">
                <code-chunk>tile: {{ config.tile }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>size: {{ avatar.size || 'null' }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>src: {{ avatar.src || 'null' }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>icon: {{ avatar.icon || 'null' }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>color: {{ config.color[0] }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>variant: {{ config.variant[0] }}</code-chunk>
              </bc-card-text>
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
  name: 'PageBcAvatar',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
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
    },
    src (src) {
      return src ? `${src}?${this.rnd()}` : null
    }
  }
}
</script>
