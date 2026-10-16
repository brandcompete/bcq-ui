<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.color" v-model:value="config.color" label="color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.variant" v-model:value="config.variant" label="variant" :visible-items="mapToDropdownArray(getUiColorVariants).length" :items="mapToDropdownArray(getUiColorVariants)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.size" v-model:value="config.size" label="size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-checkbox v-model:checked="config.multiple" label="multiple" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-checkbox v-model:checked="config.clearable" label="clearable" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="gridClasses">
              <bc-checkbox v-model:checked="config.loading" label="loading" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :xl="config.span" :lg="config.span" :md="12" :sm="12" :xs="12" v-for="upload in config.uploads" :class="['p-1']">
            <bc-card elevation="none" :class="['h-full']">
              <bc-card-text :class="['p-2']">
                <bc-upload
                  @files="onFiles"
                  @clear="onClear"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :icon-left="config.showIconLeft ? upload.icon : null"
                  :icon-right="config.showIconRight ? upload.icon : null"
                  :loading="config.loading"
                  :labels-font-weight="config.labelsFontWeight"
                  :labels-uppercase="config.labelsUppercase"
                  :size="config.size[0]"
                  :multiple="config.multiple"
                  :clearable="config.clearable"
                  :roundness="config.roundness"
                  :elevation="config.elevation"
                  :color="config.color[0]"
                  :variant="config.variant[0]"
                  :file-list-max-height="config.fileListMaxHeight"
                  :mime-types="upload.mimeTypes"
                  :max-file-size="upload.maxFileSize"
                  :hint="upload.hint"
                  :label="upload.label" />
              </bc-card-text>
              <bc-divider :class="['my-2']" />
              <bc-card-text :class="['p-2']">
                <code-chunk>max-file-size: {{ formatByteSize(upload.maxFileSize) }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>file-list-max-height: {{ config.fileListMaxHeight }}</code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>multiple: {{ config.multiple }} </code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>clearable: {{ config.clearable }} </code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>labels-uppercase: {{ config.labelsUppercase }} </code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>loading: {{ config.loading }} </code-chunk>
                <bc-divider :class="['my-1']" />
                <code-chunk>mime-types: {{ upload.mimeTypes }} </code-chunk>
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
  name: 'PageBcUpload',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null,
      gridClasses: [
        'p-1',
        'text-left'
      ]
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
    onFiles ($event) {
      this.log('@files', 'bc-upload', $event)
    },
    onClear ($event) {
      this.log('@clear', 'bc-upload', $event)
    }
  }
}
</script>
