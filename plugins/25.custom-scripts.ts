/* 
 * Allows users to inject custom scripts to the page, weather it's in the body or head.
 */
export default defineNuxtPlugin(() => {
  const lpoConfig = useLpoConfig()

  if (lpoConfig.customScripts?.length) {
    for (const cs of lpoConfig.customScripts) {
      if (cs.rawHtml) {
        if (cs.location === 'prependHead') {
          document.head.insertAdjacentHTML('afterbegin', cs.rawHtml)
        } else if (cs.location === 'appendHead') {
          document.head.insertAdjacentHTML('beforeend', cs.rawHtml)
        } else if (cs.location === 'prependBody') {
          document.body.insertAdjacentHTML('afterbegin', cs.rawHtml)
        } else if (cs.location === 'appendBody') {
          document.body.insertAdjacentHTML('beforeend', cs.rawHtml)
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