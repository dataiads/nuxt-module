export interface ProductImageProps {
  product: Product,
}

const [useProvideProductImage, useInjectProductImage] = createInjectionState((p) => {
  const product = ref(p)
  const index = ref(0)
  const dialog = ref(false)

  const images = computed(() => {
    let allImages: string[] = []
    if (
      product.value.extraData?.additionalImageLinks?.length ||
      product.value.extraData?.imageLink
    ) {
      // use collected images in priority
      if (product.value.extraData?.imageLink) {
        allImages.push(product.value.extraData.imageLink)
      }
      if (product.value.extraData?.additionalImageLinks) {
        allImages = allImages.concat(product.value.extraData.additionalImageLinks)
      }
    } else {
      // fallback on feed images otherwise
      if (product.value.data?.imageLink) {
        allImages.push(product.value.data.imageLink)
      }
      if (product.value.data?.additionalImageLinks) {
        allImages = allImages.concat(product.value.data.additionalImageLinks)
      }
    }
    return allImages
  })

  function setIndex (i: number) {
    index.value = i
  }

  function openDialog () {
    dialog.value = true
  }

  return { product, images, setIndex, index, dialog, openDialog } 
})


function useProductImage () {
  const productImageState = useInjectProductImage()

  if (!productImageState)
    throw new Error('useProductImage must be used within a <ProductImageWrapper />')

  return productImageState
}

export { useProductImage, useProvideProductImage }