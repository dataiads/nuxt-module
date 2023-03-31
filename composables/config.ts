export const useLpoConfig = () => {
    const {$lpoConfig} = useNuxtApp()
    return $lpoConfig
}

export const useMirroredDomain = () => {
    const lpoConfig = useLpoConfig()
    const runtimeConfig = useRuntimeConfig()

    return lpoConfig.mirroredDomainOverride || runtimeConfig.mirroredDomain
}