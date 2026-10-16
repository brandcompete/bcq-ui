import {
  defineStore
} from 'pinia'

export const PageStore = defineStore('page', {
  state: () => {
    return {
      page: null
    }
  },
  actions: {
    setPageData (data) {
      this.page = data
    },
    getPageData () {
      return this.page
    },
    removePageData () {
      this.page = null
    }
  }
})
