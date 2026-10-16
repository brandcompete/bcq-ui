<template>
  <bc-container :class="componentCssClasses">
    <aside v-if="ifSlotsSidebarLeft" :class="sidebarLeftCssClasses">
      <bc-container>
        <bc-table-layout y-align="middle" equal-cells>
          <bc-table-layout-row>
            <bc-table-layout-cell x-align="left" :class="['p-2']" v-if="ifSlotsSidebarLeftControls">
              <slot name="sidebar-left-controls" />
            </bc-table-layout-cell>
            <bc-table-layout-cell x-align="right" :class="[`${baseCss}-sidebar-toggle-icon-cell`, 'p-2']">
              <bc-icon @click="toggleSidebar('sidebarLeft')" :provider="iconsProvider" :name="sidebarLeftToggleIcon" :class="['cursor-pointer']" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
        <bc-container display="initial" :class="sidebarLeftSlotCssClasses">
          <slot name="sidebar-left" />
        </bc-container>
      </bc-container>
      <bc-reactive-style>
      .{{ baseCss }}-sidebar-left
      {
        z-index: {{ sidebarLeftInternal.zIndex }};
        width: {{ sidebarLeftInternal.expanded ? sidebarLeftInternal.width : sidebarsCollapsedWidth }}px;
      }
      </bc-reactive-style>
    </aside>
    <header v-if="ifSlotsHeader" :class="headerCssClasses">
      <bc-container :class="['p-2']">
        <slot name="header" />
      </bc-container>
      <bc-reactive-style>
      .{{ baseCss }}-header
      {
        z-index: {{ headerInternal.zIndex }};
      }
      </bc-reactive-style>
    </header>
    <main v-if="ifSlotsMain" :class="mainCssClasses">
      <bc-container :class="[`${baseCss}-main-inner`, 'py-4', 'px-2', 'm-auto']">
        <slot name="main" />
      </bc-container>
      <bc-reactive-style v-if="!floatingSidebars">
      .{{ baseCss }}-main,
      .{{ baseCss }}-header,
      .{{ baseCss }}-footer
      {
        margin-left: {{ sidebarLeftInternal.expanded ? sidebarLeftInternal.width : $slots['sidebar-left'] ? sidebarsCollapsedWidthInternal : 0 }}px;
        margin-right: {{ sidebarRightInternal.expanded ? sidebarRightInternal.width : $slots['sidebar-right'] ? sidebarsCollapsedWidthInternal : 0 }}px;
      }
      </bc-reactive-style>
      <bc-reactive-style v-else>
      .{{ baseCss }}-floating-sidebars-blocker
      {
        z-index: {{ floatingSidebarsBlockerZIndex }};
      }
      .{{ baseCss }}-main,
      .{{ baseCss }}-header,
      .{{ baseCss }}-footer
      {
        margin-left: {{ sidebarLeftInternal.expanded ? null : sidebarsCollapsedWidthInternal }}px;
        margin-right: {{ sidebarRightInternal.expanded ? null : sidebarsCollapsedWidthInternal }}px;
      }
      .{{ baseCss }}-header,
      .{{ baseCss }}-footer
      {
        padding-left: {{ sidebarLeftInternal.expanded ? sidebarsCollapsedWidthInternal : null }}px;
        padding-right: {{ sidebarRightInternal.expanded ? sidebarsCollapsedWidthInternal : null }}px;
      }
      </bc-reactive-style>
      <bc-reactive-style>
      .{{ baseCss }}-main
      {
        margin-top: {{ headerHeight }}px;
        min-height: calc(100dvh - {{ headerHeight }}px);
      }
      .{{ baseCss }}-main .{{ baseCss }}-main-inner
      {
        max-width: {{ main.maxWidth }};
        min-width: {{ main.minWidth }};
      }
      </bc-reactive-style>
    </main>
    <aside v-if="ifSlotsSidebarRight" :class="sidebarRightCssClasses">
      <bc-container>
        <bc-table-layout y-align="middle" equal-cells>
          <bc-table-layout-row>
            <bc-table-layout-cell x-align="left" :class="[`${baseCss}-sidebar-toggle-icon-cell`, 'p-2']">
              <bc-icon @click="toggleSidebar('sidebarRight')" :provider="iconsProvider" :name="sidebarRightToggleIcon" :class="['cursor-pointer']" />
            </bc-table-layout-cell>
            <bc-table-layout-cell x-align="left" :class="['p-2']" v-if="ifSlotsSidebarRightControls">
              <slot name="sidebar-right-controls" />
            </bc-table-layout-cell>
          </bc-table-layout-row>
        </bc-table-layout>
        <bc-container display="initial" :class="sidebarRightSlotCssClasses">
          <slot name="sidebar-right" />
        </bc-container>
      </bc-container>
      <bc-reactive-style>
      .{{ baseCss }}-sidebar-right
      {
        z-index: {{ sidebarRightInternal.zIndex }};
        width: {{ sidebarRightInternal.expanded ? sidebarRightInternal.width : sidebarsCollapsedWidthInternal }}px;
      }
      </bc-reactive-style>
    </aside>
    <footer v-if="ifSlotsFooter" :class="footerCssClasses">
      <bc-container :class="['p-2']">
        <slot name="footer" />
      </bc-container>
      <bc-reactive-style>
      .{{ baseCss }}-footer
      {
        z-index: {{ footerInternal.zIndex }};
      }
      </bc-reactive-style>
    </footer>
    <bc-reactive-style>
    .{{ baseCss }} .{{ baseCss }}-sidebar-toggle-icon-cell
    {
      width: {{ sidebarsCollapsedWidthInternal }}px;
    }
    .{{ baseCss }} .{{ baseCss }}-header
    {
      min-height: {{ headerHeight }}px;
    }
    .{{ baseCss }} .{{ baseCss }}-footer
    {
      min-height: {{ footerHeight }}px;
    }
    </bc-reactive-style>
    <bc-container :class="floatingSidebarsBlockerCssClasses" @click="hideSidebars" v-if="sidebarLeftInternal && sidebarRightInternal" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcLayout',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('layout'),
      sidebarLeftInternal: null,
      sidebarRightInternal: null,
      mainInternal: null,
      headerInternal: null,
      footerInternal: null,
      sidebarsCollapsedWidthInternal: null
    }
  },
  props: {
    iconsProvider: {
      type: String,
      default: 'mdi'
    },
    sidebarsCollapsedWidth: {
      type: Number,
      default: 42
    },
    floatingSidebars: {
      type: Boolean,
      default: false
    },
    floatingSidebarsBlockerBlur: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: Number,
      default: 42
    },
    footerHeight: {
      type: Number,
      default: 42
    },
    sidebarLeft: {
      type: Object,
      default () {
        return {
          width: 260,
          elevation: 'none',
          iconOpen: 'menu-close',
          iconClose: 'menu-open',
          expanded: true,
          zIndex: 900,
          overflow: 'auto'
        }
      }
    },
    sidebarRight: {
      type: Object,
      default () {
        return {
          width: 260,
          elevation: 'none',
          iconOpen: 'menu-open',
          iconClose: 'menu-close',
          expanded: true,
          zIndex: 900,
          overflow: 'auto'
        }
      }
    },
    main: {
      type: Object,
      default () {
        return {
          maxWidth: '960px',
          minWidth: '200px'
        }
      }
    },
    header: {
      type: Object,
      default () {
        return {
          elevation: 'none',
          zIndex: 800
        }
      }
    },
    footer: {
      type: Object,
      default () {
        return {
          elevation: 'none',
          zIndex: 800
        }
      }
    }
  },
  computed: {
    floatingSidebarsBlockerZIndex () {
      const sidebarLeftInternal = this.sidebarLeftInternal
      const sidebarRightInternal = this.sidebarRightInternal
      let zIndex = 0
      if (sidebarLeftInternal) {
        zIndex += sidebarLeftInternal.zIndex
      }
      if (sidebarRightInternal) {
        zIndex += sidebarRightInternal.zIndex
      }
      return zIndex / 2 - 10
    },
    floatingSidebarsBlockerCssClasses () {
      return [
        `${this.baseCss}-floating-sidebars-blocker`,
        this.floatingSidebars && (this.sidebarLeftInternal.expanded || this.sidebarRightInternal.expanded) ? 'opacity-100' : ['opacity-0', 'pointer-events-none'],
        this.floatingSidebarsBlockerBlur ? `${this.baseCss}-floating-sidebars-blocker-blur` : null,
        'fixed',
        'left-0',
        'top-0',
        'right-0',
        'bottom-0',
        'h-dvh-full'
      ]
    },
    sidebarLeftToggleIcon () {
      const sidebarLeftInternal = this.sidebarLeftInternal
      return sidebarLeftInternal[sidebarLeftInternal.expanded ? 'iconClose' : 'iconOpen']
    },
    sidebarRightToggleIcon () {
      const sidebarRightInternal = this.sidebarRightInternal
      return sidebarRightInternal[sidebarRightInternal.expanded ? 'iconClose' : 'iconOpen']
    },
    ifSlotsFooter () {
      return this.$slots['footer'] && this.footerInternal
    },
    ifSlotsSidebarRightControls () {
      return this.$slots['sidebar-right-controls'] && this.sidebarRightInternal.expanded
    },
    ifSlotsSidebarRight () {
      return this.$slots['sidebar-right'] && this.sidebarRightInternal
    },
    ifSlotsHeader () {
      return this.$slots['header'] && this.headerInternal
    },
    ifSlotsSidebarLeftControls () {
      return this.$slots['sidebar-left-controls'] && this.sidebarLeftInternal.expanded
    },
    ifSlotsSidebarLeft () {
      return this.$slots['sidebar-left'] && this.sidebarLeftInternal
    },
    ifSlotsMain () {
      return this.$slots['main'] && this.mainInternal && this.sidebarLeftInternal && this.sidebarRightInternal && this.headerInternal
    },
    sidebarRightCssClasses () {
      const baseCss = this.baseCss
      return [
        `${baseCss}-sidebar`,
        `${baseCss}-sidebar-right`,
        'cursor-default',
        'fixed',
        'top-0',
        'right-0',
        'bottom-0',
        'h-dvh-full',
        `shadow-${this.sidebarRightInternal.elevation}`
      ]
    },
    sidebarRightSlotCssClasses () {
      const sidebarRightInternal = this.sidebarRightInternal
      return [
        `${this.baseCss}-sidebar-slot`,
        sidebarRightInternal.expanded ? null : 'hidden',
        `overflow-${sidebarRightInternal.overflow}`,
        'p-2'
      ]
    },
    mainCssClasses () {
      return [
        `${this.baseCss}-main`,
        'cursor-default'
      ]
    },
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.floatingSidebars ? `${baseCss}-floating-sidebars` : null,
        'h-dvh-full'
      ]
    },
    sidebarLeftCssClasses () {
      const baseCss = this.baseCss
      return [
        `${baseCss}-sidebar`,
        `${baseCss}-sidebar-left`,
        'cursor-default',
        'fixed',
        'top-0',
        'left-0',
        'bottom-0',
        'h-dvh-full',
        `shadow-${this.sidebarLeftInternal.elevation}`
      ]
    },
    sidebarLeftSlotCssClasses () {
      const sidebarLeftInternal = this.sidebarLeftInternal
      return [
        `${this.baseCss}-sidebar-slot`,
        sidebarLeftInternal.expanded ? null : 'hidden',
        `overflow-${sidebarLeftInternal.overflow}`,
        'p-2'
      ]
    },
    headerCssClasses () {
      return [
        `${this.baseCss}-header`,
        'cursor-default',
        `shadow-${this.headerInternal.elevation}`,
        'fixed',
        'top-0',
        'left-0',
        'right-0'
      ]
    },
    footerCssClasses () {
      return [
        `${this.baseCss}-footer`,
        `shadow-${this.footerInternal.elevation}`,
        'cursor-default',
        'fixed',
        'bottom-0',
        'left-0',
        'right-0'
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.sidebarLeftInternal = this.sidebarLeft
      this.sidebarRightInternal = this.sidebarRight
      this.mainInternal = this.main
      this.headerInternal = this.header
      this.footerInternal = this.footer
      this.sidebarsCollapsedWidthInternal = this.sidebarsCollapsedWidth
      if (!this.$slots['sidebar-left']) {
        this.sidebarLeftInternal.width = 0
      }
      if (!this.$slots['sidebar-right']) {
        this.sidebarRightInternal.width = 0
      }
    },
    toggleSidebar (sidebar) {
      this[`${sidebar}Internal`].expanded = !this[`${sidebar}Internal`].expanded
    },
    hideSidebars () {
      const sidebarLeftInternal = this.sidebarLeftInternal
      const sidebarRightInternal = this.sidebarRightInternal
      if (sidebarLeftInternal) {
        sidebarLeftInternal.expanded = false
      }
      if (sidebarRightInternal) {
        sidebarRightInternal.expanded = false
      }
    }
  }
}
</script>
<style>
.bc-layout .bc-layout-sidebar
{
  transition: width var(--sidebars-easing);
}

.bc-layout:not(.bc-layout-floating-sidebars) .bc-layout-main,
.bc-layout .bc-layout-header,
.bc-layout .bc-layout-footer
{
  transition: margin var(--sidebars-easing);
}

.bc-layout .bc-layout-floating-sidebars-blocker
{
  transition: opacity var(--sidebars-easing);
}

.bc-layout  .bc-layout-sidebar-slot
{
  height: calc(100dvh - 42px);
}

.bc-layout .bc-layout-sidebar-left
{
  background: var(--bg-sidebar-left-light);
  color: var(--text-sidebar-left-light);
  border-right: solid 1px var(--border-sidebar-left-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-sidebar-left
{
  background: var(--bg-sidebar-left-dark);
  color: var(--text-sidebar-left-dark);
  border-right-color: var(--border-sidebar-left-dark);
}

.bc-layout .bc-layout-sidebar-right
{
  background: var(--bg-sidebar-right-light);
  color: var(--text-sidebar-right-light);
  border-left: solid 1px var(--border-sidebar-right-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-sidebar-right
{
  background: var(--bg-sidebar-right-dark);
  color: var(--text-sidebar-right-dark);
  border-left-color: var(--border-sidebar-right-dark);
}

.bc-layout .bc-layout-main
{
  background: var(--bg-main-light);
  color: var(--text-main-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-main
{
  background: var(--bg-main-dark);
  color: var(--text-main-dark);
}

.bc-layout .bc-layout-header
{
  background: var(--bg-header-light);
  color: var(--text-header-light);
  border-bottom: solid 1px var(--border-header-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-header
{
  background: var(--bg-header-dark);
  color: var(--text-header-dark);
  border-bottom-color: var(--border-header-dark);
}

.bc-layout .bc-layout-footer
{
  background: var(--bg-footer-light);
  color: var(--text-footer-light);
  border-top: solid 1px var(--border-footer-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-footer
{
  background: var(--bg-footer-dark);
  color: var(--text-footer-dark);
  border-top-color: var(--border-footer-dark);
}

.bc-layout  .bc-layout-floating-sidebars-blocker.bc-layout-floating-sidebars-blocker-blur
{
  backdrop-filter: var(--backdrop-blur);
}

.bc-layout .bc-layout-floating-sidebars-blocker
{
  background: var(--semi-transparent-light);
}

.bc-app-theme-dark .bc-layout .bc-layout-floating-sidebars-blocker
{
  background: var(--semi-transparent-dark);
}
</style>
