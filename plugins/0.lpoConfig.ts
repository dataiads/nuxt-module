import { devConfig } from "dev.config"

export default defineNuxtPlugin(() => {
    const lpoConfig: LPOConfig = window.__LPO_CONFIG__ ?? {}

    lpoConfig.has = (key: string) => lpoConfig.fields.some(f => f.name === key)
    lpoConfig.get = (key: string, def: any) => {
        if (process.env.NODE_ENV === "development") {
            return devConfig[key] ?? def
        }

        const field = lpoConfig.fields?.find(f => f.name === key)
        if (!field) {
            return def
        }
        if (field.type === "json") {
            return JSON.parse(field.value)
        }
        return field.value
    }
    
    // Pop a decpreciation warning is the nuxt config has a field also in the LPO config.
    const config = useRuntimeConfig()
    Object.keys(config.public).filter(c => lpoConfig.has(c)).forEach(c => {
        console.warn(`DEPRECATED: "${c}" has been found in the nuxt.config but is now passed by the LPO config`)
    })

    return {
        provide: {
            lpoConfig: lpoConfig
        }
    }
})