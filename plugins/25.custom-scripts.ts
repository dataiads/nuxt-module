/* 
 * Allows users to inject custom scripts to the page, weather it's in the body or head.
 */
export default defineNuxtPlugin(() => {
  const lpoConfig = useLpoConfig()

  if (lpoConfig.customScripts?.length) {
    for (const cs of lpoConfig.customScripts) {
      if (cs.rawHtml) {
        const parser = new DOMParser()
        const html = parser.parseFromString(cs.rawHtml, 'text/html')
        if (cs.location === 'prependHead') {
          html.head?.childNodes.forEach(node => document.head?.prepend(node))
        } else if (cs.location === 'appendHead') {
          html.head?.childNodes.forEach(node => document.head?.append(node))
        } else if (cs.location === 'prependBody') {
          html.head?.childNodes.forEach(node => document.body?.prepend(node))
          html.body?.childNodes.forEach(node => document.body?.prepend(node))
        } else if (cs.location === 'appendBody') {
          html.head?.childNodes.forEach(node => document.body?.append(node))
          html.body?.childNodes.forEach(node => document.body?.append(node))
        }
        // Don't treat the rest of the code
        continue
      }

      const el = document.createElement('script')
      el.defer = cs.defer ?? false
      el.async = cs.async ?? false
      if (cs.src) {
        el.src = cs.src
      }
      if (cs.content) {
        el.innerHTML = cs.content
      }

      if (cs.attrs?.length) {
        cs.attrs.forEach(attr => {
          el.setAttribute(attr.name, attr.value)
        })
      }
      
      if (cs.location === 'prependHead') {
        document.head?.prepend(el)
      } else if (cs.location === 'appendHead') {
        document.head?.append(el)
      } else if (cs.location === 'prependBody') {
        document.body?.prepend(el)
      } else if (cs.location === 'appendBody') {
        document.body?.append(el)
      }
    }
  }
})