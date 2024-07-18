import { createInjectionState } from '@vueuse/core'
import type { LayerParams } from 'dataiads-nuxt-layer/types'

export interface LayerProps {
  config: LayerParams,
  items: Ref<Product[][]>
}

const [useProvideLayer, useInjectLayer] = createInjectionState(
  ({
    config,
    items
  }: LayerProps) => {
    return {
      config,
      items,
    }
  }
)

function useLayer () {
  const layerState = useInjectLayer()

  if (!layerState)
    throw new Error('useLayer must be used within a <LayerWrapper />')

  return layerState
}

export { useLayer, useProvideLayer }