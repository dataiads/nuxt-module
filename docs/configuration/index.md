---
nav_order: 0
title: Configuration
has_children: true
---
# Configuration

To connect your app to the Dataiads system, you can configure the LPO domain as well as the original page domain in the Nuxt public runtime config.

## Required

| Param | Description | 
| ------- | ------- | 
| `mirroredDomain` | The original domain for the product pages. | 

## Optional

| Param | Description | Default | 
| ------- | ------- | ------- | 
| `enableImageLoad` | Enables image compression, use this if images are not already compressed by the original site. | `false` | 
| `layoutStyle` | Allows you to quickly modify the styling of different core elements on the page. Styling will be detailed in its own page. | 


## A basic example config.
``` typescript
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
      mirroredDomain: "https://shop.dataiads.io",
    }
  }
})
```