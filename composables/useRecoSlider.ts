import { createInjectionState } from '@vueuse/core'
import { ref } from 'vue'
import type { RecoSliderParams } from 'dataiads-nuxt-layer/types'

export interface RecoSliderProps {
  config: RecoSliderParams,
  arrowPlacement: 'inside' | 'outside'
  items: Product[][]
}

const [useProvideRecoSlider, useInjectRecoSlider] = createInjectionState(
  ({
    arrowPlacement,
    config,
    items
  }: RecoSliderProps) => {
    return {
      arrowPlacement,
      config,
      items
    }
  }
)

function useRecoSlider () {
  const recoSliderState = useInjectRecoSlider()

  if (!recoSliderState)
    throw new Error('useRecoSlider must be used within a <RecoSlider />')

  return recoSliderState
}

export { useRecoSlider, useProvideRecoSlider }