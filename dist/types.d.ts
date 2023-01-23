
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['dataiads']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['dataiads']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
