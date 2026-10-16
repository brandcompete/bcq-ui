const computed = {
  computed: {
    getLang () {
      return this.$lang
    },
    getConfig () {
      return this.$config
    },
    getRoutes () {
      return this.$router.options.routes
    },
    getUiColors () {
      return this.$config.uiColors
    },
    getUiColorVariants () {
      return this.$config.uiColorVariants
    },
    getLocales () {
      return this.$config.locales
    },
    getSizes () {
      return this.$config.sizes
    },
    getWeights () {
      return this.$config.weights
    },
    isHomePage () {
      return this.$route.path === '/'
    },
    getShadows () {
      return this.$config.shadows
    },
    getXAlign () {
      return this.$config.xAlign
    },
    getYAlign () {
      return this.$config.yAlign
    },
    getPositions () {
      return this.$config.positions
    },
    getPlacements () {
      return this.$config.placements
    },
    getBadgePlacements () {
      return this.$config.badgePlacements
    },
    getLocalDataKeys () {
      return this.$config.localDataKeys
    },
    getOpacity () {
      return this.$config.opacity
    },
    copyCodeIconCssClasses () {
      return [
        'my-1',
        'cursor-pointer',
        'opacity-50',
        'hover:opacity-100',
        'transition-opacity',
        'transition-duration-300'
      ]
    },
    getCurrentRoute () {
      return this.getRoutes.find(route => route.path === this.$route.path)
    }
  }
}

export default computed
