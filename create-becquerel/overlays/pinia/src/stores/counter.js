import { defineStore } from 'pinia'

// Example store, used by src/components/pinia-counter.vue. Its state is shared by every component that uses it.
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment () {
      this.count++
    },
    reset () {
      this.count = 0
    }
  }
})
