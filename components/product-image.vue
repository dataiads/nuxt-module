<script setup lang="ts">
interface Props {
  product: Product;

  // customize images alt attribute
  alt?: string;

  // display additional images on the side
  maxAdditionalImages?: number;

  // customize element classes
  class?: string | string[];
  mainClass?: string | string[];
  asideClass?: string | string[];

  scroller?: boolean;
  asideScrollerClass?: string[];

  asideImageDirection?: 'horizontal' | 'vertical';
  // Apply zoom on the main image
  zoom?: boolean;
  defaultModal: boolean;

  filter?: (link: string) => boolean;
}
const props = withDefaults(defineProps<Props>(), {
  class: () => ['flex', 'flex-row'],
  asideClass: () => ['flex', 'flex-col', 'flex-nowrap'],
  asideScrollerClass: () => [
    'flex',
    'flex-col',
    'flex-nowrap',
    'overflow-y-scroll',
    'scrollbar-hide'
  ],
  mainClass: () => [
    'flex',
    'flex-row',
    'flex-nowrap',
    'overflow-x-scroll',
    'snap-x',
    'snap-mandatory',
    'scrollbar-hide',
    'md:overflow-hidden'
  ],
  alt: ({ product }) => product.data?.title || 'product image',
  maxAdditionalImages: Infinity,
  asideImageDirection: 'vertical',
  scroller: false,
  zoom: false,
  defaultModal: false
})

const imageSets = computed(() => {
  return getCustomAttrJSON<{ alt?: string; src?: string; srcset?: string }[]>(
    props.product,
    'product-image-sets',
    []
  ).filter((img) => img.src || img.srcset)
})

// use all available images, ordered by priority
let allImages: string[] = []
if (
  props.product?.extraData?.additionalImageLinks?.length ||
  props.product?.extraData?.imageLink
) {
  // use collected images in priority
  if (props.product?.extraData?.imageLink) {
    allImages.push(props.product.extraData.imageLink)
  }
  if (props.product?.extraData?.additionalImageLinks) {
    allImages = allImages.concat(props.product.extraData.additionalImageLinks)
  }
} else {
  // fallback on feed images otherwise
  if (props.product?.data?.imageLink) {
    allImages.push(props.product.data.imageLink)
  }
  if (props.product?.data?.additionalImageLinks) {
    allImages = allImages.concat(props.product.data.additionalImageLinks)
  }
}

// apply optionnal filter
if (props.filter) {
  allImages = allImages.filter(props.filter)
}

// remove falsy links and deduplicate
allImages = allImages.reduce<string[]>((acc, item) => {
  if (item && !acc.includes(item) && acc.length < props.maxAdditionalImages) {
    acc.push(item)
  }
  return acc
}, [])

// pointer to current image
const selectedImage = ref<string>('')
if (allImages.length > 0) {
  selectedImage.value = allImages[0]
}

const selectImage = (imageIndex: number) => {
  if (imageIndex > -1 && imageIndex < allImages.length) {
    selectedImage.value = allImages[imageIndex]
    scrollIntoView(imageIndex)
  }
}

const selectedIndex = computed(() => allImages.indexOf(selectedImage.value))

const clickPrevious = () => {
  if (selectedIndex.value === 0) {
    selectImage(allImages.length - 1)
  } else selectImage(selectedIndex.value - 1)
}

const clickNext = () => {
  if (selectedIndex.value === allImages.length - 1) {
    selectImage(0)
  } else selectImage(selectedIndex.value + 1)
}

const clickIndex = (index: number) => {
  if (index > -1 && index < allImages.length) {
    selectImage(index)
  }
}

const mouseenter = (imageIndex: number) => {
  scrollIntoView(imageIndex)
}

const mouseleave = () => {
  scrollIntoView(selectedIndex.value)
}

const scrollerRef = ref<HTMLElement>()
const mainImagesRef = ref<HTMLElement[]>([])
let ignoreNextScrollEvent = false

// update selected image on scroll
const onScroll = () => {
  if (ignoreNextScrollEvent) {
    ignoreNextScrollEvent = false
    return
  }
  if (scrollerRef.value) {
    const parentLeft = scrollerRef.value.getBoundingClientRect().left
    const [visibleIndex, _] = mainImagesRef.value.reduce(
      ([minIndex, minValue], ref, index) => {
        const value = Math.abs(parentLeft - ref.getBoundingClientRect().left)
        if (minIndex == -1 || value < minValue) {
          return [index, value]
        }
        return [minIndex, minValue]
      },
      [-1, 0]
    )
    if (visibleIndex > -1) {
      selectedImage.value = allImages[visibleIndex]
    }
  }
}

// scroll an image into view
const scrollIntoView = (index: number) => {
  if (scrollerRef.value && index > -1 && index < mainImagesRef.value.length) {
    const pos = mainImagesRef.value[index].offsetLeft
    ignoreNextScrollEvent = true
    scrollerRef.value.scroll({ left: pos, behavior: 'auto' })
  }
}

const openLightbox = ref(false)
const lightboxImageIndex = ref(0)

const onImageClick = (index: number) => {
  lightboxImageIndex.value = index
  openLightbox.value = true
}

const lightboxIncrIndex = () => {
  if (lightboxImageIndex.value < allImages.length - 1) {
    lightboxImageIndex.value += 1
  }
}

const lightboxDecrIndex = () => {
  if (lightboxImageIndex.value > 0) {
    lightboxImageIndex.value -= 1
  }
}
const onNextLightbox = () => {
  if (lightboxImageIndex.value === allImages.length - 1) {
    lightboxImageIndex.value = 0
  } else lightboxIncrIndex()
}

const onPrevLightbox = () => {
  if (lightboxImageIndex.value === 0) {
    lightboxImageIndex.value = allImages.length - 1
  } else lightboxDecrIndex()
}
</script>

<template>
  <div :class="props.class ?? ''">
    <slot
      name="lightbox"
      :close="() => (openLightbox = false)"
      :images="allImages"
      :incr-index="lightboxIncrIndex"
      :decr-index="lightboxDecrIndex"
      :next="onNextLightbox"
      :previous="onPrevLightbox"
      :open="openLightbox"
      :selected-index="lightboxImageIndex"
    >
      <Dialog
        v-if="defaultModal"
        v-model="openLightbox"
        @close="() => (openLightbox = false)"
      >
        <ProductImageCarousel
          :selected-index="lightboxImageIndex"
          :images="allImages"
          @close="() => (openLightbox = false)"
          @previous="onPrevLightbox"
          @next="onNextLightbox"
        >
          <template #previous>
            <slot name="carousel-previous" />
          </template>
          <template #next>
            <slot name="carousel-next" />
          </template>
          <template #image="{ image }">
            <slot name="carousel-image" :image="image" />
          </template>
        </ProductImageCarousel>
      </Dialog>
    </slot>

    <div :class="props.asideClass">
      <template v-for="(additionalImage, index) in allImages" v-if="!scroller" :key="index">
        <div
          @click="selectImage(index)"
          @mouseenter="selectImage(index)"
          @mouseleave="mouseleave"
        >
          <slot
            name="aside-image"
            :alt="props.alt"
            :src="additionalImage"
            :active="additionalImage === selectedImage"
          >
            <!-- default content for slot additional-image -->
            <Image
              :src="additionalImage"
              :alt="props.alt"
              height="80"
              width="80"
              class="cursor-pointer"
            />
          </slot>
        </div>
      </template>
      <Slider
        v-else
        :items="allImages"
        :direction="props.asideImageDirection"
        :scroller-class="props.asideScrollerClass"
      >
        <template #item="{ item, key }">
          <div
            @click="selectImage(key)"
            @mouseenter="selectImage(key)"
            @mouseleave="mouseleave"
          >
            <slot
              name="aside-image"
              :alt="props.alt"
              :src="item"
              :active="item === selectedImage"
            >
              <!-- default content for slot additional-image -->
              <Image
                :src="item"
                :alt="props.alt"
                height="80"
                width="80"
                class="cursor-pointer"
              />
            </slot>
          </div>
        </template>

        <template #previous-btn="scope">
          <slot name="aside-previous-btn" v-bind="scope" />
        </template>

        <template #next-btn="scope">
          <slot name="aside-next-btn" v-bind="scope" />
        </template>
      </Slider>
    </div>

    <div class="flex-1 relative">
      <div ref="scrollerRef" :class="mainClass" @scroll="onScroll">
        <div
          v-for="(image, index) in imageSets"
          v-if="imageSets.length > 0"
          ref="mainImagesRef"
          class="flex-none snap-center max-w-fit min-w-full"
          @click="() => onImageClick(index)"
        >
          <slot
            name="main-image"
            :src="image.src"
            :srcset="image.srcset"
            :alt="image.alt || props.alt"
          >
            <!-- default content for slot for main image -->
            <Image
              height="400"
              width="400"
              :src="image.src || ''"
              :srcset="image.srcset"
              :alt="image.alt || props.alt"
              zoom
            />
          </slot>
        </div>
        <div
          v-for="(additionalImage, index) in allImages"
          v-else
          ref="mainImagesRef"
          class="flex-none snap-center max-w-fit min-w-full"
          @click="() => onImageClick(index)"
        >
          <slot name="main-image" :src="additionalImage" :alt="props.alt">
            <!-- default content for slot for main image -->
            <Image
              height="400"
              width="400"
              :src="additionalImage"
              :alt="props.alt"
              zoom
            />
          </slot>
        </div>
      </div>

      <div
        v-if="allImages.length > 1"
        class="absolute bottom-0 top-0 left-0 pointer-events-none flex-col justify-center h-full flex"
      >
        <div class="pointer-events-auto cursor-pointer" @click="clickPrevious">
          <slot name="previous-btn" />
        </div>
      </div>

      <div
        v-if="allImages.length > 1"
        class="absolute bottom-0 top-0 right-0 pointer-events-none flex-col justify-center h-full flex"
      >
        <div class="pointer-events-auto cursor-pointer" @click="clickNext">
          <slot name="next-btn" />
        </div>
      </div>

      <div v-if="allImages.length > 1">
        <slot
          name="navigation"
          :all-images="allImages"
          :click-index="clickIndex"
          :selected-index="selectedIndex"
        />
      </div>
    </div>
  </div>
</template>
