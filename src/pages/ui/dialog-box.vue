<template>
  <bc-grid>
    <bc-grid-col v-if="config" :span="12">
      <flat-card :margin="[]">
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.size" @update:value="showDialogBox" v-model:value="config['title-font-size']" label="title-font-size" :items="mapToDropdownArray(getSizes)" />
            </bc-grid-col>
            <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
              <bc-dropdown :icon="$icons.color" @update:value="showDialogBox" v-model:value="config['title-color']" label="title-color" :visible-items="mapToDropdownArray(getUiColors).length" :items="mapToDropdownArray(getUiColors)" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1', 'align-content-center', 'text-center']">
              <bc-checkbox v-for="(checkbox, index) in config.propControls.checkboxes" :key="index" v-model:checked="config[checkbox['model:checked']]" :label="checkbox.label" :block="false" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1']">
              <component-work-in-progress name="bc-dialog-box" />
            </bc-grid-col>
            <bc-grid-col :span="12" :class="['p-1']">
              <bc-btn @click="showDialogBox" roundness="sm" icon-left="window-restore" :color="config['title-color'][0]" block :class="['mb-1']">Show Dialog Box</bc-btn>
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-dialog-box
          @update:visible="onUpdateVisible"
          v-model:visible="config['v-model:visible']"
          :modal="config['modal']"
          :title-bar="config['title-bar']"
          :persistent="config['persistent']"
          :title-divider="config['title-divider']"
          :dismiss-button="config['dismiss-button']"
          :title-color="config['title-color'][0]"
          :title-font-size="config['title-font-size'][0]"
          :title="config['title']"
          :content-height="config['content-height']"
          :content-overflow="config['content-overflow']"
          :full-screen="config['full-screen']"
          :modal-inert="config['modal-inert']"
          :icon="config['show-icon'] ? config['icon'] : null"
          :min-width="config['min-width']"
          :max-width="config['max-width']">
<!--          <bc-grid>-->
<!--            <bc-grid-col :span="6" :class="['p-1']">-->
<!--              <bc-dropdown :items="dd1items" v-model:value="dd1model" />-->
<!--            </bc-grid-col>-->
<!--            <bc-grid-col :span="6" :class="['p-1']">-->
<!--              <bc-dropdown :items="dd2items" v-model:value="dd2model" />-->
<!--            </bc-grid-col>-->
<!--            <bc-grid-col :span="6" :class="['p-1']">-->
<!--              <bc-dropdown :items="dd3items" v-model:value="dd3model" />-->
<!--            </bc-grid-col>-->
<!--            <bc-grid-col :span="6" :class="['p-1']">-->
<!--              <bc-dropdown :items="dd4items" v-model:value="dd4model" />-->
<!--            </bc-grid-col>-->
<!--          </bc-grid>-->
          <bc-alert roundness="xl" @click="hideDialogBox" :icon="$icons.info" :dismissible="false" :color="config['title-color'][0]" variant="soft" :class="['mt-1', 'mb-2', 'cursor-pointer']">
            <bc-container v-html="getLang.hideDialogBoxManually" />
          </bc-alert>
          <bc-lorem-ipsum :repeats="config['full-screen'] ? 50 : 3" />
        </bc-dialog-box>
      </flat-card>
    </bc-grid-col>
  </bc-grid>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'PageBcDialogBox',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      config: null
      // dd1model: [],
      // dd2model: [],
      // dd3model: [],
      // dd4model: [],
      // dd1items: [{
      //   label: 'Option 1-1',
      //   value: 'option-1-1'
      // }, {
      //   label: 'Option 1-2',
      //   value: 'option-1-2'
      // }, {
      //   label: 'Option 1-3',
      //   value: 'option-1-3'
      // }],
      // dd2items: [{
      //   label: 'Option 2-1',
      //   value: 'option-2-1'
      // }, {
      //   label: 'Option 2-2',
      //   value: 'option-2-2'
      // }, {
      //   label: 'Option 2-3',
      //   value: 'option-3-3'
      // }],
      // dd3items: [{
      //   label: 'Option 3-1',
      //   value: 'option-3-1'
      // }, {
      //   label: 'Option 3-2',
      //   value: 'option-3-2'
      // }, {
      //   label: 'Option 3-3',
      //   value: 'option-3-3'
      // }],
      // dd4items: [{
      //   label: 'Option 4-1',
      //   value: 'option-4-1'
      // }, {
      //   label: 'Option 4-2',
      //   value: 'option-4-2'
      // }, {
      //   label: 'Option 4-3',
      //   value: 'option-4-3'
      // }]
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
    showDialogBox () {
      this.config['v-model:visible'] = true
    },
    hideDialogBox () {
      this.config['v-model:visible'] = false
    },
    onUpdateVisible ($event) {
      this.log('@update:visible', 'bc-dialog-box', $event)
    }
  }
}
</script>
