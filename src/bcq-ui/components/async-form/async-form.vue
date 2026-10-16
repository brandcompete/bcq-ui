<template>
  <bc-container :class="componentCssClasses" :inert="inert">
    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      :class="[`${baseCss}-form`]"
      :method="method.toLowerCase()"
      :action="action"
      :name="name"
      :enctype="enctype"
      :accept-charset="acceptCharset"
      :autocomplete="autocomplete">
      <bc-container v-if="$slots['top']" :class="[`${baseCss}-form-slot-top`]">
        <slot name="top" />
      </bc-container>
      <bc-container :class="[`${baseCss}-form-content`]">
        <slot />
      </bc-container>
      <bc-container v-if="$slots['bottom']" :class="[`${baseCss}-form-slot-bottom`]">
        <slot name="bottom" />
      </bc-container>
    </form>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcAsyncForm',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('async-form')
    }
  },
  emits: [
    'submit',
    'reset'
  ],
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.disabled && !this.inert ? 'disabled' : null
      ]
    }
  },
  props: {
    acceptCharset: {
      type: String
    },
    action: {
      type: String
    },
    autocomplete: {
      type: String,
      default: 'on',
      validator: value => {
        return [
          'on',
          'off'
        ].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enctype: {
      type: String,
      default: 'application/x-www-form-urlencoded',
      validator: value => {
        return [
          'text/plain',
          'application/x-www-form-urlencoded',
          'multipart/form-data'
        ].includes(value)
      }
    },
    inert: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    formData: {
      type: Object,
      required: true,
      default: () => {}
    },
    method: {
      type: String,
      default: 'GET'
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.formData)
    },
    onReset () {
      this.$emit('reset', this.formData)
    }
  }
}
</script>
