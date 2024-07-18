export const blockTrackingScripts = () => {
    const lpoConfig = useLpoConfig()
    return lpoConfig.optimizeTBT && (navigator.userAgent.indexOf('Lighthouse') !== -1 || navigator.userAgent.indexOf('moto g') !== -1)
}