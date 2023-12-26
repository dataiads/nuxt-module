
declare global {
  interface Window {
    dataLayer: any[]
    tc_vars: Record<string, any>
  }
}

// Exposes a collected dataLayer into the window
export function sourceGTMDataLayerArray (product: Product, customAttributeName = 'dataLayer') {
  const dataLayerContent = getCustomAttrJSON(product, customAttributeName, [])

  if (!dataLayerContent?.length || !Array.isArray(dataLayerContent)) {
    console.error('can\'t source dataLayer')
    return
  }

  if (!window.dataLayer) {
    window.dataLayer = []
  }
  window.dataLayer.push(...dataLayerContent)
}

export function sourceTcVars (product: Product) {
  const tcVarsAttr = getCustomAttrJSON<Record<string, string>>(product, 'tcVars', {})
  window.tc_vars = {
    ...window.tc_vars,
    ...tcVarsAttr
  }
}
