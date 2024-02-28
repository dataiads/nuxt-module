// @ts-ignore
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const lpoConfig = useLpoConfig()
  const product = useProduct()

  // app:beforeMount hook is used because product data fetch happens in app:created hook
  nuxtApp.hook('app:beforeMount', async () => {
    if (lpoConfig.productHook) {
      try {
        const f = Function(
          'product',
          'getCustomAttr',
          'getCustomAttrFloat',
          'getCustomAttrInt',
          'getCustomAttrJSON',
          lpoConfig.productHook
        )
        f(
          product.value,
          getCustomAttr,
          getCustomAttrFloat,
          getCustomAttrInt,
          getCustomAttrJSON
        )
      } catch (e: any) {
        console.error('productHook error:', e)
      }
    }
  })
})

// PRODUCTHOOK FUNCTIONS
// Get the device of user
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
  ) {
    return "mobile"
  }
  return "desktop"
}

// Get the current price
const getCurrentPrice = (price: string, salePrice: string) => {
  if (salePrice !== null || salePrice !== undefined) {
    return parseFloat(salePrice)
  }
  else {
    return parseFloat(price)
  }
}

// Get the browser of user
const getBrowserType = () => {
  var test = regexp => {
    return regexp.test(navigator.userAgent);
  };

  if (test(/opr\//i) || !!window.opr) {
    return 'opera';
  } else if (test(/edg/i)) {
    return 'microsoft edge';
  } else if (test(/chrome|chromium|crios/i)) {
    return 'google chrome';
  } else if (test(/firefox|fxios/i)) {
    return 'firefox';
  } else if (test(/safari/i)) {
    return 'safari';
  } else if (test(/trident/i)) {
    return 'internet explorer';
  } else if (test(/ucbrowser/i)) {
    return 'uc browser';
  } else if (test(/samsungbrowser/i)) {
    return 'samsung browser';
  } else {
    return 'unknown browser';
  }
}