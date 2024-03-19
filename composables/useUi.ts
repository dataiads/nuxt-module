import { twMerge } from 'tailwind-merge';

export const useUI = (defaultUI, props) => {
    const ui = computed(() => {
        const obj = {}
        Object.keys(defaultUI).forEach((el) => {
            if (props[el]) {
                obj[el] = twMerge(defaultUI[el], props[el].value)
            } else {
                obj[el] = defaultUI[el];
            }
        })
        return obj
    });
    return { ui }
}