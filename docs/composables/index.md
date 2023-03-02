## Available composables
* `useLPOConfig` in production: loads the config provided by the backend. In dev: loads the config found in `runtimeConfig.public.devLPOConfig`.
* `useProduct` a shortcut to access the main product data stored inside a global state. data is automatically fetched on application startup.
* `useCollectorData` a shortcut to access the global collector data stored inside a global state. data is automatically fetched on application startup.
* `getCustomAttr`, `getCustomAttrInt`, `getCustomAttrFloat`, `getCustomAttrJSON` to access product custom attributes
* `salePriceDifference` to get a products regular/sale price difference as a percentage
* `mask` a utility function to extract parts of a string using a regular expression
* `itemPart` a utility that splits a string and returns the requested part based on an index
