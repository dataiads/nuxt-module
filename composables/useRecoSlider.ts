import { createInjectionState } from '@vueuse/core'
import { ref, computed } from 'vue'
import type { RecoSliderParams } from 'dataiads-nuxt-layer/types'

export interface RecoSliderProps {
  config: Ref<RecoSliderParams>,
  arrowPlacement: Ref<'inside' | 'outside'>,
  items: Ref<Product[][]>
}

const [useProvideRecoSlider, useInjectRecoSlider] = createInjectionState(
  ({
    arrowPlacement,
    config,
    items
  }: RecoSliderProps) => {
    const currentIndex = ref(1)
    const slideInView = ref(1)

    const getDisplayCount = computed<number>(() => 
      Math.min(currentIndex.value * slideInView.value, items?.value?.length)
    )

    return {
      arrowPlacement,
      config,
      items,
      currentIndex,
      getDisplayCount,
      slideInView
    }
  }
)

function useRecoSlider () {
  const recoSliderState = useInjectRecoSlider()

  if (!recoSliderState)
    throw new Error('useRecoSlider must be used within a <RecoSliderWrapper />')

  return recoSliderState
}

export { useRecoSlider, useProvideRecoSlider }