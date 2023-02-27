import { devConfig } from "../dev.config"

export default defineNuxtPlugin(() => {
    /**
     * LPOConfig is user modified configuration that can be set in the backoffice.
     * A dev.config.ts file is available in this repo for use in dev env.
     * 
     */

    const lpoConfig: LPOConfig = window.__LPO_CONFIG__ ?? {}

    /**
     * 
     * Checks that the lpoConfig contains the key.
     * If running on a dev env, this will read the dev.config.ts file.
     * 
     * @param key The key of the configuration to retrieve
     */
    lpoConfig.has = (key: string) => {
        if (process.env.NODE_ENV === "development") {
            return devConfig.hasOwnProperty(key)
        }

        return lpoConfig.fields?.some(f => f.name === key) ?? false
    }

    /**
     * Retrieves the value of the key from the lpoConfig defined in the backoffice.
     * If running on a dev env, this will read the dev.config.ts file.
     * 
     * @param key The key of the configuration to retrieve
     * @param def The default value to return if the key does not exist
     */
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
        let warn = `DEPRECATED: "${c}" has been found in the nuxt.config but is now handled by the LPO config`
        if (process.env.NODE_ENV === "development") {
            warn += `
            
              USING DEV VALUE: ${c} -> "${devConfig[c]}"`
        }
        console.warn(warn)
    })

    return {
        provide: {
            lpoConfig: lpoConfig
        }
    }
})