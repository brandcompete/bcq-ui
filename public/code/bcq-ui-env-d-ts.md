import type { Emitter, EventType } from 'mitt'

// Type for this.$emitter, used by BCQ UI components and available in your own components
declare module 'vue' {
  interface ComponentCustomProperties {
    $emitter: Emitter<Record<EventType, any>>
  }
}

export {}
