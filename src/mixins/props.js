const props = {
  props: {
    toolbarDropdownCssClassesSm: {
      type: Array,
      default () {
        return ['w-1', 'ml-2']
      }
    },
    toolbarDropdownCssClassesMd: {
      type: Array,
      default () {
        return ['w-2', 'ml-2']
      }
    },
    toolbarDropdownCssClassesXl: {
      type: Array,
      default () {
        return ['w-5', 'ml-2']
      }
    }
  }
}

export default props
