<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <bc-grid>
          <bc-grid-col :span="12" :class="['p-1']">
            <toolbar :margin="[]" :divider="false">
              <bc-grid>
                <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
                  <bc-dropdown label="animation" :icon="$icons.animation" v-model:value="config.animation" :visible-items="mapToDropdownArray(config.animations).length" :items="mapToDropdownArray(config.animations)" />
                </bc-grid-col>
                <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
                  <bc-dropdown label="color" :icon="$icons.color" v-model:value="config.color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
                </bc-grid-col>
                <bc-grid-col :xl="4" :lg="4" :md="4" :sm="4" :xs="12" :class="['p-1']">
                  <bc-dropdown label="variant" :icon="$icons.variant" v-model:value="config.variant" :visible-items="mapToDropdownArray(getUiColorVariants).length"  :items="mapToDropdownArray(getUiColorVariants)" />
                </bc-grid-col>
              </bc-grid>
            </toolbar>
          </bc-grid-col>
          <bc-grid-col :span="12" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-text>
                <bc-table-layout y-align="middle">
                  <bc-table-layout-row>
                    <bc-table-layout-cell :class="['p-1', 'w-1']">
                      <bc-skeleton-loader
                        v-aspect-ratio="1/1"
                        roundness="full"
                        :class="['w-full']"
                        :height="null"
                        :variant="config.variant[0]"
                        :color="config.color[0]"
                        :animation="config.animation[0]" />
                    </bc-table-layout-cell>
                    <bc-table-layout-cell :class="['p-1']">
                      <bc-skeleton-loader
                        v-for="loader in config.skeletonLoaders.right"
                        :variant="config.variant[0]"
                        :color="config.color[0]"
                        :animation="config.animation[0]"
                        :class="[loader, 'my-2']" />
                    </bc-table-layout-cell>
                  </bc-table-layout-row>
                </bc-table-layout>
              </bc-card-text>
              <bc-divider />
              <bc-card-text :class="['text-right']">
                <bc-skeleton-loader
                  v-for="loader in config.skeletonLoaders.bottom"
                  :variant="config.variant[0]"
                  :color="config.color[0]"
                  :animation="config.animation[0]"
                  height="32px"
                  :block="false" :class="[loader, 'm-1']" />
              </bc-card-text>
            </bc-card>
          </bc-grid-col>
        </bc-grid>
      </flat-card>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcSkeletonLoader',
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
    }
  }
}
</script>
