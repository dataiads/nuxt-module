export function useRegion(merchantId: string, regionId: string) {
  return useFetch<Product[]> (`/api/regions/${regionId}/merchants/${merchantId}`, { key: 'region' })
}
