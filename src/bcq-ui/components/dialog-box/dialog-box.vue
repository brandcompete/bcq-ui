<template>
  <transition name="dialog-pop" :data-dialog-box-id="id">
    <bc-container v-scroll-lock @click="persistent ? null : dismiss()" v-if="visible" :style="style" display="initial" :class="componentCssClasses">
      <bc-card @click.stop="onDialogBodyClick" :style="cardStyle" :class="cardCssClasses" :elevation="fullScreen ? 'none' : elevation" :roundness="fullScreen ? 'none' : roundness" :border-width="0">
        <template v-if="titleBar">
          <bc-card-title :id="`${id}-title-bar`" :font-size="titleFontSize" :font-weight="titleFontWeight" :class="titleBarCssClasses">
            <bc-table-layout y-align="middle">
              <bc-table-layout-row>
                <bc-table-layout-cell x-align="center" :class="[`${baseCss}-title-bar-icon-cell`]" v-if="icon">
                  <bc-icon :name="icon" :provider="iconProvider" @dblclick="dismiss" :class="['cursor-pointer']" />
                </bc-table-layout-cell>
                <bc-table-layout-cell :class="['px-1', 'w-full']">
                  <bc-container v-text="title" :class="['truncate']" />
                </bc-table-layout-cell>
                <bc-table-layout-cell x-align="center" :class="[`${baseCss}-title-bar-icon-cell`]" v-if="dismissButton">
                  <bc-icon name="close" :provider="iconProvider" @click="dismiss" :class="['cursor-pointer']" />
                </bc-table-layout-cell>
              </bc-table-layout-row>
            </bc-table-layout>
          </bc-card-title>
          <bc-divider v-if="titleDivider" />
        </template>
        <bc-card-text :height="contentHeight" :padding="contentPadding" :overflow="fullScreen ? 'auto' : contentOverflow">
          <slot />
        </bc-card-text>
      </bc-card>
      <bc-reactive-style v-if="fullScreen">
      .{{ baseCss }}[data-dialog-box-id="{{ id }}"] > .bc-card > .bc-card-text
      {
        height: calc(100dvh - {{ titleBarHeight }}px)
      }
      </bc-reactive-style>
    </bc-container>
  </transition>
</template>
<script>
// @todo modal-inert should dispatch dismiss if not set to persistent

import methods from '../../mixins/methods'

export default {
  name: 'BcDialogBox',
  data () {
    return {
      id: `bc-dialog-box-${this.uuid()}`,
      titleBarHeight: null,
      baseCss: this.componentBaseCss('dialog-box')
    }
  },
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        this.baseCss,
        'fixed',
        'top-0',
        'right-0',
        'bottom-0',
        'left-0',
        this.titleBar ? `${baseCss}-title-bar` : null,
        this.modal && !this.fullScreen ? null : ['pointer-events-none', `${this.baseCss}-modal-inert`],
        this.modalInert ? `${baseCss}-modal-inert` : null,
        this.backdropBlur ? 'bc-dialog-box-backdrop-blur' : null,
        this.fullScreen ? `${baseCss}-full-screen` : null
      ]
    },
    titleBarCssClasses () {
      return [
        'select-none',
        `bg-${this.titleColor}-solid`
      ]
    },
    cardCssClasses () {
      const fullScreen = this.fullScreen
      return [
        'fixed',
        fullScreen ? 'top-0' : 'top-50',
        fullScreen ? 'left-0' : 'left-50',
        fullScreen ? null : '-translate-50',
        fullScreen ? 'h-device' : null,
        'transition-all',
        'transition-duration-100',
        'pointer-events-all'
      ]
    },
    style () {
      return {
        zIndex: this.zIndex
      }
    },
    cardStyle () {
      return {
        minWidth: this.minWidth,
        maxWidth: this.maxWidth
      }
    }
  },
  emits: [
    'update:visible'
  ],
  props: {
    backdropBlur: {
      type: Boolean,
      default: true
    },
    contentHeight: {
      type: String
    },
    contentOverflow: {
      type: String
    },
    contentPadding: {
      type: Array,
      default () {
        return ['p-1']
      }
    },
    dismissButton: {
      type: Boolean,
      default: true
    },
    dismissOnRouteChange: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: '3xl'
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String
    },
    maxWidth: {
      type: String,
      default: '60%'
    },
    minWidth: {
      type: String,
      default: '480px'
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalInert: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: 'xl'
    },
    title: {
      type: [
        Number,
        String
      ]
    },
    titleBar: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: 'primary'
    },
    titleDivider: {
      type: Boolean,
      default: true
    },
    titleFontSize: {
      type: String
    },
    titleFontWeight: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    visible () {
      if (this.visible && this.fullScreen) {
        this.awaitForElement(`#${this.id}-title-bar`).then(element => {
          this.titleBarHeight = element.offsetHeight
        })
      }
    },
    '$route.path' () {
      this.dismiss()
    }
  },
  methods: {
    dismiss () {
      this.$emit('update:visible', false)
    },
    onDialogBodyClick ($event) {
      this.$emitter.emit('bc-dropdown-hide', $event)
    }
  }
}
</script>
<style>
.bc-dialog-box
{
  background: var(--semi-transparent-light);
}

.bc-app-theme-dark .bc-dialog-box
{
  background: var(--semi-transparent-dark);
}

.bc-dialog-box.bc-dialog-box-backdrop-blur
{
  backdrop-filter: var(--backdrop-blur);
}

.bc-dialog-box:active:not(.bc-dialog-box-full-screen) > .bc-card
{
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.05);
}

.bc-dialog-box:active:not(.bc-dialog-box-full-screen) > .bc-card:active
{
  transform: translate(-50%, -50%) scale(1);
}

.bc-dialog-box.bc-dialog-box-full-screen > .bc-card
{
  min-width: unset !important;
  max-width: unset !important;
}

.bc-dialog-box.bc-dialog-box-modal-inert
{
  background: none !important;
  backdrop-filter: blur(0) !important;
}

.bc-dialog-box .bc-dialog-box-title-bar-icon-cell
{
  min-width: var(--icon-cell-width);
}

.dialog-pop-enter > .bc-card,
.dialog-pop-leave-to > .bc-card
{
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.dialog-pop-enter-active > .bc-card,
.dialog-pop-leave-active > .bc-card
{
  transition: all .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.dialog-pop-enter-from > .bc-card,
.dialog-pop-leave-to > .bc-card
{
  transform: translate(-50%, -50%) scale(0);
}

.dialog-pop-enter,
.dialog-pop-leave-to
{
  opacity: 0;
}

.dialog-pop-enter-active,
.dialog-pop-leave-active
{
  transition: opacity 1s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.dialog-pop-enter-from,
.dialog-pop-leave-to
{
  opacity: 0;
}
</style>
