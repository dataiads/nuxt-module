export const useLpoConfig = (): LPOConfig => {
    const { $lpoConfig } = useNuxtApp()
    return $lpoConfig as LPOConfig
}

export const useMirroredDomain = (): string => {
    const lpoConfig = useLpoConfig()
    const serverMirroredDomain = !process.server ? window.__LPO_MIRRORED_DOMAIN__ : ''
    const runtimeConfig = useRuntimeConfig()

    return (
        lpoConfig.mirroredDomainOverride ||
        serverMirroredDomain ||
        (runtimeConfig.mirroredDomain as string) ||
        runtimeConfig.public.mirroredDomain ||
        ''
    )
}