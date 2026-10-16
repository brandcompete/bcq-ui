<template>
  <bc-grid>
    <bc-grid-col v-if="config">
      <flat-card>
        <toolbar :divider="false" :title="false" :margin="[]">
          <bc-container :class="['p-1', 'mt-1']">
            <bc-btn block roundness="sm" color="discovery" :icon-left="$icons.theme" @click="toggleAppTheme">{{ getLang.toggleLightDarkTheme }}</bc-btn>
          </bc-container>
        </toolbar>
        <bc-grid>
          <bc-grid-col v-for="shadow in config.shadows" :xl="2" :lg="2" :md="3" :sm="4" :xs="6" :class="['p-1']">
            <bc-card :elevation="shadow" :class="['elevation-demo']" v-tooltip="{position: 'top', text: makeShadowClass(shadow)}">
              <bc-card-text :class="['flex', 'align-items-center', 'justify-content-center']" v-aspect-ratio="1/1">
                <bc-container :class="['text-center']">
                  <code-chunk>.{{ makeShadowClass(shadow) }}</code-chunk>
                  <bc-divider :class="['my-2']" />
                  <code-chunk>"{{ shadow }}"</code-chunk>
                </bc-container>
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
  name: 'PageBcElevation',
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
        data.config.shadows = this.getShadows
        this.config = data.config
      })
    }
  }
}
</script>
