<template>
  <bc-grid v-if="config">
    <bc-grid-col>
      <flat-card>
        <toolbar :margin="[]" :divider="false">
          <bc-grid>
            <bc-grid-col :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="gridClasses">
              <bc-dropdown searchable :icon="getTypeOptions.icon" v-model:value="config.type" label="type" :disabled="config.multiline" :items="mapToDropdownArray(Object.keys(config.types))" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.icon" v-model:value="config.icon" label="icon" :items="mapToDropdownArray(config.icons)" :visible-items="config.icons.length" />
            </bc-grid-col>
            <bc-grid-col :xl="4" :lg="4" :md="6" :sm="12" :xs="12" :class="gridClasses">
              <bc-dropdown :icon="$icons.disabled" v-model:value="config.disabledOptionsDropdownSelection" label="disabled or inert" :items="mapToDropdownArray(config.disabledOptionsDropdown)" :visible-items="config.disabledOptionsDropdown.length" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.label" label="label" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.hint" label="hint" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.labelsUppercase" label="labels-uppercase" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.clearable" label="clearable" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.error" label="error" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.multiline" label="multiline" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.autoResize" label="auto-resize (if multiline = true)" :disabled="!config.multiline" :block="false" />
            </bc-grid-col>
            <bc-grid-col :xl="3" :lg="3" :md="6" :sm="6" :xs="12" :class="[gridClasses, 'text-left']">
              <bc-checkbox v-model:checked="config.reveal" :disabled="config.type[0] !== 'password'" label="reveal (if type = password)" :block="false" />
            </bc-grid-col>
          </bc-grid>
        </toolbar>
        <bc-grid>
          <bc-grid-col :class="gridClasses">
            <bc-text-field
              v-model:value="getTypeOptions.value"
              @update:value="onValueUpdate($event)"
              @icon-left-click="onIconLeftClick"
              @icon-right-click="onIconRightClick"
              @keyup="onKey"
              @keydown="onKey"
              @focusin="onFocusIn"
              @focusout="onFocusOut"
              :type="config.type[0]"
              :placeholder="getLang.bcTextFieldLabel(config.type[0])"
              :label="makeLabelOrHint('label')"
              :hint="makeLabelOrHint('hint')"
              :labels-uppercase="config.labelsUppercase"
              :icon-left="setIcon('icon-left')"
              :icon-right="setIcon('icon-right')"
              :multiline="config.multiline"
              :auto-resize="config.autoResize"
              :clearable="config.clearable"
              :reveal="config.reveal"
              :error="config.error"
              :disabled="config.disabledOptionsDropdownSelection[0] === 'disabled'"
              :inert="config.disabledOptionsDropdownSelection[0] === 'inert'">
              <!-- <template v-slot:top>top slot</template>-->
              <!-- <template v-slot:right>right slot</template>-->
              <!-- <template v-slot:bottom>bottom slot</template>-->
              <!-- <template v-slot:left>left slot</template>-->
            </bc-text-field>
            <bc-container :class="['text-center', 'mt-3']">
              <bc-divider :class="['my-2']" />
              <code-chunk>v-model:value: {{ getTypeOptions.value }}</code-chunk>
            </bc-container>
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
  name: 'PageBcTextField',
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
  computed: {
    getTypeOptions () {
      return this.config.types[this.config.type[0]]
    },
    gridClasses () {
      return ['p-1']
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
    makeLabelOrHint (type = 'label') {
      return this.config[type] ? `${this.getLang.type}: ${this.config.type[0]} (${type})` : null
    },
    setIcon (position) {
      const selectedIcon = this.config.icon[0]
      const icon = this.getTypeOptions.icon
      const iconLeft = 'icon-left'
      const iconRight = 'icon-right'
      const iconNone = 'none'
      if (position === iconLeft && selectedIcon === iconLeft) {
        return selectedIcon === iconNone ? null : icon
      } else if (position === iconRight && selectedIcon === iconRight) {
        return selectedIcon === iconNone ? null : icon
      } else {
        return null
      }
    },
    onValueUpdate ($event, textField) {
      this.log('@update:value', 'bc-text-field', 'v-model:value: ', `"${$event}"`, 'type: ', `"${this.config.type[0]}"`, this.getTypeOptions)
    },
    onIconLeftClick ($event) {
      this.log('@icon-left-click', 'bc-text-field', $event)
    },
    onIconRightClick ($event) {
      this.log('@icon-right-click', 'bc-text-field', $event)
    },
    onFocusIn ($event) {
      this.log('@focusin', 'bc-text-field', $event)
    },
    onFocusOut ($event) {
      this.log('@focusout', 'bc-text-field', $event)
    },
    onKey ($event) {
      this.log('@keyup|keydown', 'bc-text-field', {key: $event.key, code: $event.code, keyCode: $event.keyCode}, $event)
    }
  }
}
</script>
