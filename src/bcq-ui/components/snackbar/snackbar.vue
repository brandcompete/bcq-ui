<template>
  <bc-container :class="componentCssClasses" :style="componentStyles">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell v-text="message ? message.message : null" :class="[padding, 'text-left']" />
        <bc-table-layout-cell :class="[padding, `${baseCss}-icon-cell`, 'text-center']">
          <bc-icon :name="dismissIcon" :provider="iconProvider" :class="['cursor-pointer']" @click="dismiss" />
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'
import mitt from 'mitt'

export default {
  name: 'BcSnackbar',
  mixins: [
    methods
  ],
  data () {
    return {
      message: null,
      timer: null,
      baseCss: this.componentBaseCss('snackbar')
    }
  },
  computed: {
    componentCssClasses () {
      const bottom = this.bottom
      const message = this.message
      const baseCss  = this.baseCss
      const offset = this.offset
      return [
        baseCss,
        this.makeUiColorVariant(message ? message.color : 'primary', message ? message.variant : 'solid'),
        this.makeElevation(this.elevation),
        this.makeFontSize(this.size),
        this.makeBorderRadius(this.roundness),
        bottom ? message ? 'bottom-0' : `${baseCss}-bottom-hidden` : message ? 'top-0' : `${baseCss}-top-hidden`,
        bottom ? offset === 0 ? 'border-noround-bottom' : null : offset === 0 ? 'border-noround-top' : null,
        'transition-all',
        'transition-duration-200',
        'transition-ease-in-out',
        'fixed',
        'left-50',
        '-translate-x-50',
        'select-none',
        `my-${offset}`
      ]
    },
    componentStyles () {
      return {
        width: this.width,
        zIndex: this.zIndex
      }
    }
  },
  props: {
    bottom: {
      type: Boolean,
      default: true
    },
    dismissIcon: {
      type: String,
      default: 'close-circle-outline'
    },
    elevation: {
      type: String,
      default: 'xl'
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    offset: {
      type: Number,
      default: 3
    },
    padding: {
      type: Array,
      default () {
        return ['p-2']
      }
    },
    roundness: {
      type: String,
      default: 'sm'
    },
    size: {
      type: String,
      default: 'sm'
    },
    width: {
      type: String,
      default: '260px'
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    message () {
      clearTimeout(this.timer)
      if (this.message && this.message.autoCloseDelay) {
        this.timer = this.sleep(this.message.autoCloseDelay).then(this.dismiss)
      }
    }
  },
  created () {
    this.bind()
  },
  methods: {
    bind () {
      this.$emitter.on('bc-snackbar:message', data => {
        this.message = data
      })
    },
    dismiss () {
      this.message = null
    }
  }
}
</script>
<style>
.bc-snackbar .bc-snackbar-icon-cell
{
  width: var(--icon-cell-width);
}

.bc-snackbar .bc-icon
{
  font-size: inherit;
}

.bc-snackbar.bc-snackbar-bottom-hidden
{
  bottom: -100px;
}

.bc-snackbar.bc-snackbar-top-hidden
{
  top: -100px;
}

@media (max-width: 480px)
{
  .bc-snackbar
  {
    width: 90% !important;
  }
}
</style>
