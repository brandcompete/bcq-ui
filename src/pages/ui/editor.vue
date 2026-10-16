<template>
  <bc-grid v-if="config">
    <bc-grid-col :span="12">
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :span="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :span="12" :class="['p-1']">
            <component-work-in-progress name="bc-editor" :class="['mb-2']" />
          </bc-grid-col>
          <bc-grid-col :span="12" v-for="editor in config.editors" :class="['p-1']">
            <bc-card elevation="none">
              <bc-card-title>{{ editor.title }}</bc-card-title>
              <bc-divider :class="['my-1']" />
              <bc-card-text>
                <bc-editor
                  @update:value="onUpdateValue"
                  v-model:value="editor.value"
                  :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
                  :inert="config.disabledOptionsDropdownSelection[0] === 'inert'"
                  :theme="editor.theme"
                  :placeholder="editor.placeholder" />
              </bc-card-text>
<!--              <bc-divider :class="['my-1']" />-->
<!--              <bc-card-text>-->
<!--                <bc-text-field readonly size="xs" :class="['code']" multiline v-model:value="editor.value" />-->
<!--              </bc-card-text>-->
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
import ComponentWorkInProgress from '@/components/component-work-in-progress/index.vue'

export default {
  name: 'PageBcEditor',
  components: {ComponentWorkInProgress},
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
    onUpdateValue ($event) {
      this.log('@update:value', 'bc-editor', this.htmlToEntity($event))
    }
  }
}
</script>
