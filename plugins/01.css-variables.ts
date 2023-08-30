
export default defineNuxtPlugin(() => {
    const config = useLpoConfig()
    const rootStyle = document.documentElement.style

    // Defaults are currently available in assets/tailwind.css file

    if (config?.cssVariables) {
        for (let [key, value] of Object.entries(config.cssVariables)) {
            rootStyle.setProperty(key, value)
        }
    }
})