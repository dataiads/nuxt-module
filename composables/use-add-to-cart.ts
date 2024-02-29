import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export const useAddToCart = (elements: MaybeComputedElementRef | MaybeRefOrGetter<MaybeElement[]> | MaybeComputedElementRef[]) => {
    const display = useState('addToCart.display')
    useIntersectionObserver(
    elements,
    ([{ isIntersecting }]) => {
        display.value = !isIntersecting
    }
    )
}