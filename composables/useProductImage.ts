import { breakpointsTailwind } from '@vueuse/core'
export interface UseProductImageOptions {
  hover?: boolean
}

export const useProductImage = (options: UseProductImageOptions = {}) => {
  const {
    hover = false
  } = options


  const product = useProduct()
  const api = ref()
  const thumbnailApi = ref()
  
  const carouselRef = ref()
  const isHovered = useElementHover(carouselRef)
  const selectedIndex = ref()

  const onSelect = () => {
    if (api.value) selectedIndex.value = api.value.selectedScrollSnap()
    if (thumbnailApi.value) thumbnailApi.value.scrollTo(api.value.selectedScrollSnap())
  }

  const onThumbClick = (index: number) => {
    if (!api.value || !thumbnailApi.value) return
    api.value.scrollTo(index)
  }

  watchOnce(api, (api) => {
    if (!api) return

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
  })

  const images = computed(() => product.value.data.additionalImageLinks)
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isDesktop = breakpoints.greaterOrEqual('lg')

  if (hover) {
    watch(() => isHovered.value, (value) => {
      if (value) {
        api.value.scrollTo(selectedIndex.value + 1)
      } else {
        api.value.scrollTo(selectedIndex.value - 1)
      }
    })
  }

  return { api, thumbnailApi, images, onThumbClick, isDesktop, selectedIndex, carouselRef, isHovered }

}