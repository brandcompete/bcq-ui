// Types for vue-axios, used instead of the package's own (see "paths" in tsconfig.json).
// vue-axios declares its types on '@vue/runtime-core', which makes TypeScript ignore the declarations other packages
// make on 'vue' (this.$route from vue-router, this.$emitter from src/env.d.ts, ...). Same API, declared on 'vue'.
import type { App } from 'vue'
import type { AxiosInstance, AxiosStatic } from 'axios'

type VueAxiosInstance = AxiosInstance | AxiosStatic

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: VueAxiosInstance
    axios: VueAxiosInstance
  }
}

declare function VueAxios (app: App, axios: VueAxiosInstance | Record<string, VueAxiosInstance>): void

export default VueAxios
