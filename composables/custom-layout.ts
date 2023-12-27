
import type { StructuredRecommender } from '~/types'

export const useCustomLayout = () => {
    const filtersSlideoverState = useState<boolean>('customLayout.showFiltersSlideover', () => false)
    const filterState = useState<StructuredRecommender>('customLayout.mainRecommender')

    return {
        // main recommendation recommender
        filter: filterState,

        // filter slideover
        showFiltersSlideover: filtersSlideoverState,
        toggleFiltersSlideover: () => filtersSlideoverState.value = ! filtersSlideoverState.value
    }
}