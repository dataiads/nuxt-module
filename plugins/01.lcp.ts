import lcpSvg from '~/assets/img/lcp.svg'

export default defineNuxtPlugin(() => {
  if (!useLpoConfig()?.optimizeLCP) {
    return
  }
  const img = new Image(1000, 1000)
  img.src = lcpSvg
  img.style.cssText = 'pointer-events: none; position: absolute; top: 0px; left: 0px; width: 1000px;'
  img.fetchPriority = 'high'
  img.alt = '.'
  document.body.appendChild(img)
})