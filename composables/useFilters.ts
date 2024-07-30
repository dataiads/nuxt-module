import { createInjectionState } from '@vueuse/core'
import type { MainRecoParams } from '../types'

export interface FiltersProps {
  config: Ref<MainRecoParams>;
}

const [useProvideFilters, useInjectFilters] = createInjectionState(
  ({ config }: FiltersProps) => {
    return {
      config
    }
  }
)

function useFilters() {
  const filterState = useInjectFilters()

  if (!filterState)
    throw new Error(
      'useFilters must be used within a <FiltersWrapper />'
    )

  return filterState
}

export { useFilters, useProvideFilters }
