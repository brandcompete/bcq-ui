/// <reference types="vite/client" />
import type { Emitter, EventType } from 'mitt'

// Type for this.$emitter (set in src/main.ts), used by Becquerel UI components and available in your own components
declare module 'vue' {
  interface ComponentCustomProperties {
    $emitter: Emitter<Record<EventType, any>>
  }
}
