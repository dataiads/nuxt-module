import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export const useStickyAddToCart = (elements: MaybeComputedElementRef | MaybeRefOrGetter<MaybeElement[]> | MaybeComputedElementRef[]) => {
    const display = useState('addToCart.display')
    useIntersectionObserver(
    elements,
    ([{ isIntersecting }]) => {
        display.value = !isIntersecting
    }
    )
}