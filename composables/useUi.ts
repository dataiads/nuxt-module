import { twMerge } from 'tailwind-merge'

export const useUI = <T extends Record<string, any>>(defaultUI: T, props: any) => {
    const ui = computed(() => {
        const obj = {} as { [key: string]: any }
        if(!props.value) return defaultUI;
        Object.keys(defaultUI).forEach((el) => {
                if (props.value[el]) {
                    obj[el] = twMerge(defaultUI[el], props.value[el])
                } else {
                    obj[el] = defaultUI[el]
                }
            })
            return obj as T
    })
    return { ui }
}