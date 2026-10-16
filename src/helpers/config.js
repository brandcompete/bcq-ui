import methods from '../mixins/methods.js'

// const seoBlock = document.querySelector('.seo-block')
// if (seoBlock) {
//   document.querySelector('body').removeChild(seoBlock)
// }

import {
  vendor,
  appName,
  version,
  website,
  description
} from '../../package.json'

const theme = '__bcqui_dark__'
const storedTheme = methods.methods.getLocalData(theme)

const config = {
  vendor,
  appName,
  website,
  version,
  description,
  dark: storedTheme === null || storedTheme,
  showPageData: process.env.NODE_ENV === 'development',
  siteWorkInProgress: false,
  showLoadingOverlayInHttpRequests: false,
  appAbbreviation: 'BCQ',
  mobileThreshold: 880,
  defaultSidebarsZIndex: 900,
  addTrailingSlashToUrl: true,
  defaultFloatingSidebarsCollapsedZIndex: 880,
  floatingSidebarsBlockerBlur: true,
  localDataKeys: {
    theme
  },
  highlightJs: {
    version: '11.11.1',
    stylesheetDark: 'rainbow',
    stylesheetLight: 'stackoverflow-light'
  },
  homePageGradient: [
    '#42d392',
    '#5f8bef'
  ],
  shadows: [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl'
  ],
  badgePlacements: [
    'top-right',
    'bottom-right',
    'bottom-left',
    'top-left'
  ],
  locales: [
    'bg-BG',
    'de-DE',
    'en-GB',
    'en-US',
    'jp-JP'
  ],
  opacity: [
    0,
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9,
    1
  ],
  uiColors: [
    'primary',
    'secondary',
    'danger',
    'info',
    'discovery',
    'success',
    'caution'
  ],
  pageCategories: [
    'getting-started',
    'content',
    'ui',
    'forms',
    'directives'
  ],
  uiColorVariants: [
    'solid',
    'soft',
    'outline',
    'ghost'
  ],
  xAlign: [
    'left',
    'center',
    'right'
  ],
  yAlign: [
    'top',
    'middle',
    'bottom'
  ],
  sizes: [
    '3xs',
    '2xs',
    'xs',
    'sm',
    'base',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl'
  ],
  weights: [
    'light',
    'normal',
    'medium',
    'semibold',
    'bold'
  ],
  placements: [
    'top',
    'right',
    'bottom',
    'left'
  ],
  positions: [
    'static',
    'relative',
    'absolute',
    'fixed',
    'sticky'
  ],
  colorSwatches: [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'blue-grey',
    'grey'
  ]
}

export default config
