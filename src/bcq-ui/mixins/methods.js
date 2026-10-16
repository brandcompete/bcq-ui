const methods = {
  methods: {
    gcd (a, b) {
      return b ? this.gcd(b, a % b) : a
    },
    calculateAspectRatio (width, height) {
      const divisor = this.gcd(width, height)
      return width / divisor + "/" + height / divisor
    },
    percentage (partial, total) {
      return (100 * partial) / total
    },
    awaitForElement (selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector))
        }
        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            observer.disconnect()
            resolve(document.querySelector(selector))
          }
        })
        observer.observe(document.body, {childList: true, subtree: true})
      })
    },
    componentBaseCss (name = '', additionalCssClasses = []) {
      return `bc-${name}${additionalCssClasses.length ? ' ' + additionalCssClasses.join(' ') : ''}`
    },
    uuid () {
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      )
    },
    makeUiColorVariant (color, variant) {
      return `bg-${color}-${variant}`
    },
    makeUiLightnessColor (color, lightness) {
      return `text-${color}${lightness ? '-' + lightness : ''}`
    },
    makeFontSize (size = 'sm') {
      return `text-${size}`
    },
    makeBorderRadius (roundness = 'sm') {
      return `border-round-${roundness}`
    },
    makeElevation (elevation = 'sm') {
      return `shadow-${elevation}`
    },
    makeFontWeight (weight) {
      return `font-${weight}`
    },
    sleep (milliseconds = 1000) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    makeAnimation (animation = 'pulse') {
      return `animate-${animation}`
    },
    makeOpacity (opacity) {
      return `opacity-${opacity}`
    },
    makeXAlign (align) {
      return `text-${align}`
    }
  }
}

export default methods
