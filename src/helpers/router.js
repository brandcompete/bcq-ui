import {
  createWebHistory,
  createRouter
} from 'vue-router'

import icons from './icons.js'

import PageIndex from '../pages/index.vue'
import * as meta from './meta.js'

// getting-started
import PageBcQuickStart from '../pages/getting-started/quick-start.vue'
import PageBcDevelopment from '../pages/getting-started/development.vue'
import PageBcDeployment from '../pages/getting-started/deployment.vue'
import PageBcPublishing from '../pages/getting-started/publishing.vue'
import PageBcReleaseNotes from '../pages/getting-started/release-notes.vue'
import PageBcRoadmap from '../pages/getting-started/roadmap.vue'
import PageBcBundler from '../pages/getting-started/bundler.vue'

// content
import PageBcApp from '../pages/content/app.vue'
import PageBcBrandColor from '../pages/content/brand-color.vue'
import PageBcContainer from '../pages/content/container.vue'
import PageBcCssAnimations from '../pages/content/css-animations.vue'
import PageBcCssVariables from '../pages/content/css-variables.vue'
import PageBcElevation from '../pages/content/elevation.vue'
import PageBcGrid from '../pages/content/grid.vue'
import PageBcHeading from '../pages/content/heading.vue'
import PageBcLayout from '../pages/content/layout.vue'
import PageBcLoremIpsum from '../pages/content/lorem-ipsum.vue'
import PageBcNavigatorOnline from '../pages/content/navigator-online.vue'
import PageBcReactiveStyle from '../pages/content/reactive-style.vue'
import PageBcTableLayout from '../pages/content/table-layout.vue'
import PageBcTypography from '../pages/content/typography.vue'
import PageBcColors from '../pages/content/colors.vue'
import PageBcUtilityCssClasses from '../pages/content/utility-css-classes.vue'
import PageBcTheme from '../pages/content/theme.vue'

// ui
import PageBcAlert from '../pages/ui/alert.vue'
import PageBcAmbientImage from '../pages/ui/ambient-image.vue'
import PageBcAvatar from '../pages/ui/avatar.vue'
import PageBcAvatarGroup from '../pages/ui/avatar-group.vue'
import PageBcBadge from '../pages/ui/badge.vue'
import PageBcBanner from '../pages/ui/banner.vue'
import PageBcBreadcrumbs from '../pages/ui/breadcrumbs.vue'
import PageBcBtn from '../pages/ui/btn.vue'
import PageBcBtnGroup from '../pages/ui/btn-group.vue'
import PageBcCard from '../pages/ui/card.vue'
import PageBcChip from '../pages/ui/chip.vue'
import PageBcCollapsible from '../pages/ui/collapsible.vue'
import PageBcColorPicker from '../pages/ui/color-picker.vue'
import PageBcContextMenu from '../pages/ui/context-menu.vue'
import PageBcDataTable from '../pages/ui/data-table.vue'
import PageBcDialogBox from '../pages/ui/dialog-box.vue'
import PageBcDivider from '../pages/ui/divider.vue'
import PageBcEditor from '../pages/ui/editor.vue'
import PageBcEmpty from '../pages/ui/empty.vue'
import PageBcFlag from '../pages/ui/flag.vue'
import PageBcIcon from '../pages/ui/icon.vue'
import PageBcKbd from '../pages/ui/kbd.vue'
import PageBcKpi from '../pages/ui/kpi.vue'
import PageBcLazyImage from '../pages/ui/lazy-image.vue'
import PageBcList from '../pages/ui/list.vue'
import PageBcLoadingOverlay from '../pages/ui/loading-overlay.vue'
import PageBcMeterGroup from '../pages/ui/meter-group.vue'
import PageBcMultilineEllipsis from '../pages/ui/multiline-ellipsis.vue'
import PageBcNotification from '../pages/ui/notification.vue'
import PageBcPager from '../pages/ui/pager.vue'
import PageBcProgressbar from '../pages/ui/progressbar.vue'
import PageBcRating from '../pages/ui/rating.vue'
import PageBcSkeletonLoader from '../pages/ui/skeleton-loader.vue'
import PageBcSnackbar from '../pages/ui/snackbar.vue'
import PageBcSparklines from '../pages/ui/sparklines.vue'
import PageBcSpeedDial from '../pages/ui/speed-dial.vue'
import PageBcSplitBtn from '../pages/ui/split-btn.vue'
import PageBcSvgIcon from '../pages/ui/svg-icon.vue'
import PageBcTabs from '../pages/ui/tabs.vue'
import PageBcTimeline from '../pages/ui/timeline.vue'
import PageBcToolbar from '../pages/ui/toolbar.vue'
import PageBcTooltip from '../pages/ui/tooltip.vue'
import PageBcTreeview from '../pages/ui/treeview.vue'
import PageBcVid from '../pages/ui/vid.vue'

// form components
import PageBcAsyncForm from '../pages/forms/async-form.vue'
import PageBcCheckbox from '../pages/forms/checkbox.vue'
import PageBcDropdown from '../pages/forms/dropdown.vue'
import PageBcRadioGroup from '../pages/forms/radio-group.vue'
import PageBcRangeSlider from '../pages/forms/range-slider.vue'
import PageBcSlider from '../pages/forms/slider.vue'
import PageBcSwitcher from '../pages/forms/switcher.vue'
import PageBcTextField from '../pages/forms/text-field.vue'
import PageBcUpload from '../pages/forms/upload.vue'

// directives
import PageBcAspectRatio from '../pages/directives/aspect-ratio.vue'
import PageBcBlur from '../pages/directives/blur.vue'
import PageBcDefaultBtn from '../pages/directives/default-btn.vue'
import PageBcGradientText from '../pages/directives/gradient-text.vue'
import PageBcIntersect from '../pages/directives/intersect.vue'
import PageBcLiquidGlass from '../pages/directives/liquid-glass.vue'
import PageBcResize from '../pages/directives/resize.vue'
import PageBcRipple from '../pages/directives/ripple.vue'
import PageBcScrollLock from '../pages/directives/scroll-lock.vue'
import PageBcTooltipDirective from '../pages/directives/tooltip.vue'

// category pages
import PageBcCategoryPage from '../pages/category.vue'

const routes = [{
  path: '/',
  component: PageIndex,
  render: false,
  category: null,
  icon: icons.home,
  name: 'PageIndex',
  meta: meta.index
}, {
  path: '/:category',
  component: PageBcCategoryPage,
  render: false,
  category: null,
  icon: 'home',
  name: 'PageBcCategoryPage'
}, {
  path: '/getting-started/quick-start',
  component: PageBcQuickStart,
  render: true,
  category: 'getting-started',
  icon: 'speedometer',
  name: 'PageBcQuickStart',
  meta: meta.quickStart
}, {
  path: '/content/app',
  component: PageBcApp,
  render: true,
  category: 'getting-started',
  icon: 'apps',
  name: 'PageBcApp',
  meta: meta.app
}, {
  path: '/getting-started/publishing',
  component: PageBcPublishing,
  render: false,
  category: 'getting-started',
  icon: 'npm',
  name: 'PageBcPublishing',
  meta: meta.publishing
}, {
  path: '/getting-started/deployment',
  component: PageBcDeployment,
  render: false,
  category: 'getting-started',
  icon: 'upload',
  name: 'PageBcDeployment',
  meta: meta.deployment
}, {
  path: '/getting-started/release-notes',
  component: PageBcReleaseNotes,
  render: true,
  category: 'getting-started',
  icon: 'message-text',
  name: 'PageBcReleaseNotes',
  meta: meta.releaseNotes
}, {
  path: '/getting-started/roadmap',
  component: PageBcRoadmap,
  render: true,
  category: 'getting-started',
  icon: 'road-variant',
  name: 'PageBcRoadmap',
  meta: meta.roadmap
}, {
  path: '/getting-started/development',
  component: PageBcDevelopment,
  render: true,
  category: 'getting-started',
  icon: 'code-tags',
  name: 'PageBcDevelopment',
  meta: meta.development
}, {
  path: '/getting-started/bundler',
  component: PageBcBundler,
  render: true,
  category: 'getting-started',
  icon: 'package-variant',
  name: 'PageBcBundler',
  meta: meta.bundler
}, {
  path: '/content/app',
  component: PageBcApp,
  render: true,
  category: 'content',
  icon: 'apps',
  name: 'PageBcApp',
  meta: meta.app
}, {
  path: '/content/layout',
  component: PageBcLayout,
  render: true,
  category: 'content',
  icon: 'floor-plan',
  name: 'PageBcLayout',
  meta: meta.layout
}, {
  path: '/content/theme',
  component: PageBcTheme,
  render: true,
  category: 'content',
  icon: 'theme-light-dark',
  name: 'PageBcTheme',
  meta: meta.theme
}, {
  path: '/content/heading',
  component: PageBcHeading,
  render: true,
  category: 'content',
  icon: 'page-layout-header',
  name: 'PageBcHeading',
  meta: meta.heading
}, {
  path: '/content/container',
  component: PageBcContainer,
  render: true,
  category: 'content',
  icon: 'archive-outline',
  name: 'PageBcContainer',
  meta: meta.container
}, {
  path: '/content/grid',
  component: PageBcGrid,
  render: true,
  category: 'content',
  icon: 'table-large',
  name: 'PageBcGrid',
  meta: meta.grid
}, {
  path: '/content/table-layout',
  component: PageBcTableLayout,
  render: true,
  category: 'content',
  icon: 'grid',
  name: 'PageBcTableLayout',
  meta: meta.tableLayout
}, {
  path: '/content/colors',
  component: PageBcColors,
  render: true,
  category: 'content',
  icon: 'palette',
  name: 'PageBcColors',
  meta: meta.colors
}, {
  path: '/content/brand-color',
  component: PageBcBrandColor,
  render: true,
  category: 'content',
  icon: 'format-color-fill',
  name: 'PageBcBrandColor',
  meta: meta.brandColor
}, {
  path: '/content/elevation',
  component: PageBcElevation,
  render: true,
  category: 'content',
  icon: 'box-shadow',
  name: 'PageBcElevation',
  meta: meta.elevation
}, {
  path: '/ui/empty',
  component: PageBcEmpty,
  render: true,
  category: 'content',
  icon: 'minus-circle',
  name: 'PageBcEmpty',
  meta: meta.empty
}, {
  path: '/directives/liquid-glass',
  component: PageBcLiquidGlass,
  render: true,
  category: 'content',
  icon: 'liquid-spot',
  name: 'PageBcLiquidGlass',
  meta: meta.liquidGlass
}, {
  path: '/content/navigator-online',
  component: PageBcNavigatorOnline,
  render: true,
  category: 'content',
  icon: 'wifi',
  name: 'PageBcNavigatorOnline',
  meta: meta.navigatorOnline
}, {
  path: '/content/reactive-style',
  component: PageBcReactiveStyle,
  render: true,
  category: 'content',
  icon: 'language-css3',
  name: 'PageBcReactiveStyle',
  meta: meta.reactiveStyle
}, {
  path: '/content/typography',
  component: PageBcTypography,
  render: true,
  category: 'content',
  icon: 'format-size',
  name: 'PageBcTypography',
  meta: meta.typography
}, {
  path: '/content/css-variables',
  component: PageBcCssVariables,
  render: true,
  category: 'content',
  icon: 'variable-box',
  name: 'PageBcCssVariables',
  meta: meta.cssVariables
}, {
  path: '/content/utility-css-classes',
  component: PageBcUtilityCssClasses,
  render: true,
  category: 'content',
  icon: 'language-css3',
  name: 'PageBcUtilityCssClasses',
  meta: meta.utilityCssClasses
}, {
  path: '/content/css-animations',
  component: PageBcCssAnimations,
  render: true,
  category: 'content',
  icon: 'animation',
  name: 'PageBcCssAnimations',
  meta: meta.cssAnimations
}, {
  path: '/content/lorem-ipsum',
  component: PageBcLoremIpsum,
  render: true,
  category: 'content',
  icon: 'format-text',
  name: 'PageBcLoremIpsum',
  meta: meta.loremIpsum
}, {
  path: '/ui/multiline-ellipsis',
  component: PageBcMultilineEllipsis,
  render: true,
  category: 'content',
  icon: 'dots-horizontal-circle-outline',
  name: 'PageBcMultilineEllipsis',
  meta: meta.multilineEllipsis
}, {
  path: '/ui/alert',
  component: PageBcAlert,
  render: true,
  category: 'ui',
  icon: 'alert',
  name: 'PageBcAlert',
  meta: meta.alert
}, {
  path: '/ui/ambient-image',
  component: PageBcAmbientImage,
  render: true,
  category: 'ui',
  icon: 'television-ambient-light',
  name: 'PageBcAmbientImage',
  meta: meta.ambientImage
}, {
  path: '/content/app',
  component: PageBcApp,
  render: true,
  category: 'ui',
  icon: 'apps',
  name: 'PageBcApp',
  meta: meta.app
}, {
  path: '/ui/avatar',
  component: PageBcAvatar,
  render: true,
  category: 'ui',
  icon: 'account',
  name: 'PageBcAvatar',
  meta: meta.avatar
}, {
  path: '/ui/avatar-group',
  component: PageBcAvatarGroup,
  render: true,
  category: 'ui',
  icon: 'account-multiple',
  name: 'PageBcAvatarGroup',
  meta: meta.avatarGroup
}, {
  path: '/ui/badge',
  component: PageBcBadge,
  render: true,
  category: 'ui',
  icon: 'square-rounded-badge-outline',
  name: 'PageBcBadge',
  meta: meta.badge
}, {
  path: '/ui/banner',
  component: PageBcBanner,
  render: true,
  category: 'ui',
  icon: 'bullhorn',
  name: 'PageBcBanner',
  meta: meta.banner
}, {
  path: '/content/brand-color',
  component: PageBcBrandColor,
  render: true,
  category: 'ui',
  icon: 'format-color-fill',
  name: 'PageBcBrandColor',
  meta: meta.brandColor
}, {
  path: '/ui/breadcrumbs',
  component: PageBcBreadcrumbs,
  render: true,
  category: 'ui',
  icon: 'navigation',
  name: 'PageBcBreadcrumbs',
  meta: meta.breadcrumbs
}, {
  path: '/ui/btn',
  component: PageBcBtn,
  render: true,
  category: 'ui',
  icon: 'button-cursor',
  name: 'PageBcBtn',
  meta: meta.btn
}, {
  path: '/ui/btn-group',
  component: PageBcBtnGroup,
  render: true,
  category: 'ui',
  icon: 'button-cursor',
  name: 'PageBcBtnGroup',
  meta: meta.btnGroup
}, {
  path: '/ui/card',
  component: PageBcCard,
  render: true,
  category: 'ui',
  icon: 'cards',
  name: 'PageBcCard',
  meta: meta.card
}, {
  path: '/ui/chip',
  component: PageBcChip,
  render: true,
  category: 'ui',
  icon: 'tag',
  name: 'PageBcChip',
  meta: meta.chip
}, {
  path: '/ui/collapsible',
  component: PageBcCollapsible,
  render: true,
  category: 'ui',
  icon: 'format-line-spacing',
  name: 'PageBcCollapsible',
  meta: meta.collapsible
}, {
  path: '/ui/color-picker',
  component: PageBcColorPicker,
  render: true,
  category: 'ui',
  icon: 'palette',
  name: 'PageBcColorPicker',
  meta: meta.colorPicker
}, {
  path: '/content/container',
  component: PageBcContainer,
  render: true,
  category: 'ui',
  icon: 'archive-outline',
  name: 'PageBcContainer',
  meta: meta.container
}, {
  path: '/ui/context-menu',
  component: PageBcContextMenu,
  render: true,
  category: 'ui',
  icon: 'chevron-down',
  name: 'PageBcContextMenu',
  meta: meta.contextMenu
}, {
  path: '/ui/data-table',
  component: PageBcDataTable,
  render: true,
  category: 'ui',
  icon: 'grid',
  name: 'PageBcDataTable',
  meta: meta.dataTable
}, {
  path: '/ui/dialog-box',
  component: PageBcDialogBox,
  render: true,
  category: 'ui',
  icon: 'window-restore',
  name: 'PageBcDialogBox',
  meta: meta.dialogBox
}, {
  path: '/ui/divider',
  component: PageBcDivider,
  render: true,
  category: 'ui',
  icon: 'format-line-style',
  name: 'PageBcDivider',
  meta: meta.divider
}, {
  path: '/ui/editor',
  component: PageBcEditor,
  render: true,
  category: 'ui',
  icon: 'note-edit',
  name: 'PageBcEditor',
  meta: meta.editor
}, {
  path: '/ui/empty',
  component: PageBcEmpty,
  render: true,
  category: 'ui',
  icon: 'minus-circle',
  name: 'PageBcEmpty',
  meta: meta.empty
}, {
  path: '/ui/flag',
  component: PageBcFlag,
  render: true,
  category: 'ui',
  icon: 'flag',
  name: 'PageBcFlag',
  meta: meta.flag
}, {
  path: '/content/grid',
  component: PageBcGrid,
  render: true,
  category: 'ui',
  icon: 'table-large',
  name: 'PageBcGrid',
  meta: meta.grid
}, {
  path: '/content/heading',
  component: PageBcHeading,
  render: true,
  category: 'ui',
  icon: 'page-layout-header',
  name: 'PageBcHeading',
  meta: meta.heading
}, {
  path: '/ui/icon',
  component: PageBcIcon,
  render: true,
  category: 'ui',
  icon: 'emoticon',
  name: 'PageBcIcon',
  meta: meta.icon
}, {
  path: '/ui/kbd',
  component: PageBcKbd,
  render: true,
  category: 'ui',
  icon: 'keyboard',
  name: 'PageBcKbd',
  meta: meta.kbd
}, {
  path: '/ui/kpi',
  component: PageBcKpi,
  render: true,
  category: 'ui',
  icon: 'bullseye-arrow',
  name: 'PageBcKpi',
  meta: meta.kpi
}, {
  path: '/content/layout',
  component: PageBcLayout,
  render: true,
  category: 'ui',
  icon: 'floor-plan',
  name: 'PageBcLayout',
  meta: meta.layout
}, {
  path: '/ui/lazy-image',
  component: PageBcLazyImage,
  render: true,
  category: 'ui',
  icon: 'image',
  name: 'PageBcLazyImage',
  meta: meta.lazyImage
}, {
  path: '/ui/list',
  component: PageBcList,
  render: true,
  category: 'ui',
  icon: 'view-list',
  name: 'PageBcList',
  meta: meta.list
}, {
  path: '/ui/loading-overlay',
  component: PageBcLoadingOverlay,
  render: true,
  category: 'ui',
  icon: 'reload',
  name: 'PageBcLoadingOverlay',
  meta: meta.loadingOverlay
}, {
  path: '/content/lorem-ipsum',
  component: PageBcLoremIpsum,
  render: true,
  category: 'ui',
  icon: 'format-text',
  name: 'PageBcLoremIpsum',
  meta: meta.loremIpsum
}, {
  path: '/ui/meter-group',
  component: PageBcMeterGroup,
  render: true,
  category: 'ui',
  icon: 'ruler',
  name: 'PageBcMeterGroup',
  meta: meta.meterGroup
}, {
  path: '/ui/multiline-ellipsis',
  component: PageBcMultilineEllipsis,
  render: true,
  category: 'ui',
  icon: 'dots-horizontal-circle-outline',
  name: 'PageBcMultilineEllipsis',
  meta: meta.multilineEllipsis
}, {
  path: '/ui/notification',
  component: PageBcNotification,
  render: true,
  category: 'ui',
  icon: 'message-badge-outline',
  name: 'PageBcNotification',
  meta: meta.notification
}, {
  path: '/ui/pager',
  component: PageBcPager,
  render: true,
  category: 'ui',
  icon: 'page-last',
  name: 'PageBcPager',
  meta: meta.pager
}, {
  path: '/ui/progressbar',
  component: PageBcProgressbar,
  render: true,
  category: 'ui',
  icon: 'thermometer-lines',
  name: 'PageBcProgressbar',
  meta: meta.progressbar
}, {
  path: '/ui/rating',
  component: PageBcRating,
  render: true,
  category: 'ui',
  icon: 'star',
  name: 'PageBcRating',
  meta: meta.rating
}, {
  path: '/ui/skeleton-loader',
  component: PageBcSkeletonLoader,
  render: true,
  category: 'ui',
  icon: 'monitor-dashboard',
  name: 'PageBcSkeletonLoader',
  meta: meta.skeletonLoader
}, {
  path: '/ui/snackbar',
  component: PageBcSnackbar,
  render: true,
  category: 'ui',
  icon: 'notification-clear-all',
  name: 'PageBcSnackbar',
  meta: meta.snackbar
}, {
  path: '/ui/sparklines',
  component: PageBcSparklines,
  render: true,
  category: 'ui',
  icon: 'chart-line-variant',
  name: 'PageBcSparklines',
  meta: meta.sparklines
}, {
  path: '/ui/speed-dial',
  component: PageBcSpeedDial,
  render: true,
  category: 'ui',
  icon: 'knob',
  name: 'PageBcSpeedDial',
  meta: meta.speedDial
}, {
  path: '/ui/split-btn',
  component: PageBcSplitBtn,
  render: true,
  category: 'ui',
  icon: 'arrow-down-bold-box',
  name: 'PageBcSplitBtn',
  meta: meta.splitBtn
}, {
  path: '/ui/svg-icon',
  component: PageBcSvgIcon,
  render: true,
  category: 'ui',
  icon: 'svg',
  name: 'PageBcSvgIcon',
  meta: meta.svgIcon
}, {
  path: '/content/table-layout',
  component: PageBcTableLayout,
  render: true,
  category: 'ui',
  icon: 'grid',
  name: 'PageBcTableLayout',
  meta: meta.tableLayout
}, {
  path: '/ui/tabs',
  component: PageBcTabs,
  render: true,
  category: 'ui',
  icon: 'tab',
  name: 'PageBcTabs',
  meta: meta.tabs
}, {
  path: '/ui/timeline',
  component: PageBcTimeline,
  render: true,
  category: 'ui',
  icon: 'timeline',
  name: 'PageBcTimeline',
  meta: meta.timeline
}, {
  path: '/ui/toolbar',
  component: PageBcToolbar,
  render: true,
  category: 'ui',
  icon: 'page-layout-header',
  name: 'PageBcToolbar',
  meta: meta.toolbar
}, {
  path: '/ui/tooltip',
  component: PageBcTooltip,
  render: true,
  category: 'ui',
  icon: 'tooltip',
  name: 'PageBcTooltip',
  meta: meta.tooltip
}, {
  path: '/ui/treeview',
  component: PageBcTreeview,
  render: true,
  category: 'ui',
  icon: 'file-tree',
  name: 'PageBcTreeview',
  meta: meta.treeview
}, {
  path: '/ui/vid',
  component: PageBcVid,
  render: true,
  category: 'ui',
  icon: 'video',
  name: 'PageBcVid',
  meta: meta.vid
}, {
  path: '/forms/async-form',
  component: PageBcAsyncForm,
  render: true,
  category: 'forms',
  icon: 'cards-variant',
  name: 'PageBcAsyncForm',
  meta: meta.asyncForm
}, {
  path: '/ui/btn',
  component: PageBcBtn,
  render: true,
  category: 'forms',
  icon: 'button-cursor',
  name: 'PageBcBtn',
  meta: meta.btn
}, {
  path: '/forms/checkbox',
  component: PageBcCheckbox,
  render: true,
  category: 'forms',
  icon: 'checkbox-marked-outline',
  name: 'PageBcCheckbox',
  meta: meta.checkbox
}, {
  path: '/ui/color-picker',
  component: PageBcColorPicker,
  render: true,
  category: 'forms',
  icon: 'palette',
  name: 'PageBcColorPicker',
  meta: meta.colorPicker
}, {
  path: '/forms/dropdown',
  component: PageBcDropdown,
  render: true,
  category: 'forms',
  icon: 'chevron-down',
  name: 'PageBcDropdown',
  meta: meta.dropdown
}, {
  path: '/forms/radio-group',
  component: PageBcRadioGroup,
  render: true,
  category: 'forms',
  icon: 'radiobox-marked',
  name: 'PageBcRadioGroup',
  meta: meta.radioGroup
}, {
  path: '/forms/range-slider',
  component: PageBcRangeSlider,
  render: true,
  category: 'forms',
  icon: 'ray-start-vertex-end',
  name: 'PageBcRangeSlider',
  meta: meta.rangeSlider
}, {
  path: '/ui/rating',
  component: PageBcRating,
  render: true,
  category: 'forms',
  icon: 'star',
  name: 'PageBcRating',
  meta: meta.rating
}, {
  path: '/forms/slider',
  component: PageBcSlider,
  render: true,
  category: 'forms',
  icon: 'ray-vertex',
  name: 'PageBcSlider',
  meta: meta.slider
}, {
  path: '/forms/switcher',
  component: PageBcSwitcher,
  render: true,
  category: 'forms',
  icon: 'toggle-switch',
  name: 'PageBcSwitcher',
  meta: meta.switcher
}, {
  path: '/forms/text-field',
  component: PageBcTextField,
  render: true,
  category: 'forms',
  icon: 'form-textbox',
  name: 'PageBcTextField',
  meta: meta.textField
}, {
  path: '/forms/upload',
  component: PageBcUpload,
  render: true,
  category: 'forms',
  icon: 'upload-box',
  name: 'PageBcUpload',
  meta: meta.upload
}, {
  path: '/directives/aspect-ratio',
  component: PageBcAspectRatio,
  render: true,
  category: 'directives',
  icon: 'move-resize',
  name: 'PageBcAspectRatio',
  meta: meta.aspectRatio
}, {
  path: '/directives/blur',
  component: PageBcBlur,
  render: true,
  category: 'directives',
  icon: 'blur-linear',
  name: 'PageBcBlur',
  meta: meta.blur
}, {
  path: '/directives/default-btn',
  component: PageBcDefaultBtn,
  render: true,
  category: 'directives',
  icon: 'button-pointer',
  name: 'PageBcDefaultBtn',
  meta: meta.defaultBtn
}, {
  path: '/directives/gradient-text',
  component: PageBcGradientText,
  render: true,
  category: 'directives',
  icon: 'gradient-horizontal',
  name: 'PageBcGradientText',
  meta: meta.gradientText
}, {
  path: '/directives/intersect',
  component: PageBcIntersect,
  render: true,
  category: 'directives',
  icon: 'vector-intersection',
  name: 'PageBcIntersect',
  meta: meta.intersect
}, {
  path: '/directives/liquid-glass',
  component: PageBcLiquidGlass,
  render: true,
  category: 'directives',
  icon: 'liquid-spot',
  name: 'PageBcLiquidGlass',
  meta: meta.liquidGlass
}, {
  path: '/directives/resize',
  component: PageBcResize,
  render: true,
  category: 'directives',
  icon: 'resize',
  name: 'PageBcResize',
  meta: meta.resize
}, {
  path: '/directives/ripple',
  component: PageBcRipple,
  render: true,
  category: 'directives',
  icon: 'cursor-default-click',
  name: 'PageBcRipple',
  meta: meta.ripple
}, {
  path: '/directives/scroll-lock',
  component: PageBcScrollLock,
  render: true,
  category: 'directives',
  icon: 'arrow-vertical-lock',
  name: 'PageBcScrollLock',
  meta: meta.scrollLock
}, {
  path: '/directives/tooltip',
  component: PageBcTooltipDirective,
  render: true,
  category: 'directives',
  icon: 'tooltip',
  name: 'PageBcTooltipDirective',
  meta: meta.tooltipDirective
}, {
  path: '/:pathMatch(.*)*',
  redirect: '/',
  render: false
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
