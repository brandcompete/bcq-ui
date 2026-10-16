<template>
  <bc-grid v-if="config">
    <bc-grid-col v-if="config">
      <bc-async-form :form-data="config.formData" autocomplete="off" @submit="onSubmit" @reset="onReset">
<!--        <template v-slot:top>top</template>-->
<!--        <template v-slot:bottom>bottom</template>-->
        <flat-card>
          <bc-grid>
            <bc-grid-col :class="['p-1']" :xl="field.span" :lg="field.span" :sm="12" :xs="12" :md="field.span" v-for="(field, name) in config.formData" :key="name">
              <bc-card elevation="none">
                <bc-card-text>
                  <bc-text-field
                    v-if="field.input === 'text'"
                    v-model:value="field['model:value']"
                    :multiline="field.multiline"
                    :auto-resize="true"
                    :rows="10"
                    :label="getLang[name]"
                    :placeholder="getLang[name]"
                    :min-height="field.minHeight"
                    :icon-left="field.icon"
                    :type="field.type" />
                  <bc-dropdown
                    v-if="field.input === 'dropdown'"
                    v-model:value="field['model:value']"
                    :multiple="field.multiple"
                    :icon="field.icon"
                    :label="field.label"
                    :visible-items="field.items.length"
                    :items="field.items" />
                  <bc-switcher
                    v-if="field.input === 'switcher'"
                    v-model:checked="field['model:checked']"
                    :label="getLang[name]" />
                  <bc-checkbox
                    v-if="field.input === 'checkbox'"
                    v-model:checked="field['model:checked']"
                    :label="getLang[name]" />
                  <bc-slider
                    v-if="field.input === 'slider'"
                    v-model:value="field['model:value']"
                    color="discovery"
                    :min="field.min"
                    :max="field.max"
                    :min-max-labels="field.minMaxLabels"
                    :label="getLang[name]" />
                  <bc-range-slider
                    v-if="field.input === 'range-slider'"
                    v-model:value="field['model:value']"
                    color="discovery"
                    :min="field.min"
                    :max="field.max"
                    :min-max-labels="field.minMaxLabels"
                    :label="getLang[name]" />
                  <bc-alert color="discovery" variant="soft" :dismissible="false" v-if="['slider', 'range-slider'].includes(field.input)" :class="['m-1']">
                    <code-chunk :class="['text-center']">v-model:value: {{ JSON.stringify(field['model:value']) }}</code-chunk>
                  </bc-alert>
                  <bc-radio-group
                    v-if="field.input === 'radio-group'"
                    v-model:value="field['model:value']"
                    :name="field.name">
                    <bc-radio v-for="item in field.radios" :value="item" :label="item" />
                  </bc-radio-group>
                  <bc-upload
                    v-if="field.input === 'upload'"
                    :label="field.label"
                    :color="field.color"
                    :mime-types="field.mimeTypes"
                    :max-file-size="field.maxFileSize"
                    :multiple="field.multiple"
                    :file-list-image-thumbnail-size="field.fileListImageThumbnailSize"
                    :class="['mt-1']" />
                </bc-card-text>
              </bc-card>
            </bc-grid-col>
          </bc-grid>
          <bc-divider />
          <bc-card-actions :class="['align-right', 'p-2']">
            <bc-btn :class="['w-2', 'ml-2']" v-for="button in config.buttons" :color="button.color" :key="button" :type="button.type">{{ button.label }}</bc-btn>
          </bc-card-actions>
        </flat-card>
      </bc-async-form>
    </bc-grid-col>
    <code-files :code-files="config.codeFiles" />
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import FlatCard from '@/components/flat-card/index.vue'
import CodeChunk from '@/components/code-chunk/index.vue'

export default {
  name: 'PageBcAsyncForm',
  components: {CodeChunk},
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
    onSubmit ($event) {
      this.log('@submit', 'bc-async-form', $event)
    },
    onReset ($event) {
      this.log('@reset', 'bc-async-form', $event)
    }
  }
}
</script>
