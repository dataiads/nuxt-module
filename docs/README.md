Generic layer for building Dataïads landing pages

## installation
First install package using `yarn add dataiads-nuxt-layer`.

Update your ts config to use the layer.

```
export default defineNuxtConfig({
  ssr: false,

  typescript: {
    strict: true,
  },

  extends: [
    "dataiads-nuxt-layer"
  ],

  runtimeConfig: {
    public: {
      lpoDomain: "https://lpo-demo.dataiads.io",
      mirroredDomain: "https://shop.dataiads.io",
    }
  }
})
```
