interface SourceGTMDataLayer {
  attributeName: string;
  target: string; /// Key of the object in which to inject the layer
}

const sourceGTMDataLayerDefaultOptions: SourceGTMDataLayer = {
  attributeName: "dataLayer",
  target: "dataLayer",
};

// Exposes a collected dataLayer into the window
export function sourceGTMDataLayerArray(product: Product, options = sourceGTMDataLayerDefaultOptions) {
  const dataLayerAttr = getCustomAttr(product, options.attributeName);

  if (!dataLayerAttr) {
    return;
  }

  try {
    const dataLayer = JSON.parse(dataLayerAttr);

    if (!Array.isArray(dataLayer)) {
      return;
    }

    window[options.target] = window[options.target] || [];
    dataLayer.forEach((layer) => {
      window[options.target].push(layer);
    });
  } catch (error) {
    console.error("can't source dataLayer");
  }
}

export function sourceTcVars(product: Product) {
  const tcVarsAttr = getCustomAttr(product, "tcVars");

  if (!tcVarsAttr) {
    return;
  }

  try {
    const tcVars = JSON.parse(tcVarsAttr);

    window.tc_vars = {
      ...window.tc_vars,
      ...tcVars,
    }
  } catch(error) {
    console.error("can't source tcVars");
  }
}
