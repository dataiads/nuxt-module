Generic layer for building Dataïads landing pages

# Installation
First install package using `yarn add dataiads-nuxt-layer`.

Update your ts config to use the layer by adding:
```
extends: [
  "dataiads-nuxt-layer"
]
```
in `defineNuxtConfig`.


# Configuration

To connect your app to the Dataiads system, you can configure the LPO domain as well as the original page domain in the Nuxt public runtime config.

## Required

| Param | Description | 
| ------- | ------- | 
| `lpoDomain` | The dataiads domain for the product pages. | 
| `mirroredDomain` | The original domain for the product pages. | 

## Optional

| Param | Description | Default | 
| ------- | ------- | ------- | 
| `enableImageLoad` | Enables image compression, use this if images are not already compressed by the original site. | `false` | 
| `layoutStyle` | Allows you to quickly modify the styling of different core elements on the page. Styling will be detailed in its own page. | 


## A basic example config.
``` TS
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
