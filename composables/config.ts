export const useLpoConfig = (): LPOConfig => {
    const {$lpoConfig} = useNuxtApp()
    return $lpoConfig as LPOConfig
}

export const useMirroredDomain = (): string => {
    const lpoConfig = useLpoConfig()
    const runtimeConfig = useRuntimeConfig()

    return lpoConfig.mirroredDomainOverride || (runtimeConfig.mirroredDomain as string) || runtimeConfig.public.mirroredDomain || "";
}