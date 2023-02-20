
// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig, useState } from "#app";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const [protocol, mirroredHost] = config.public.mirroredDomain.split("//")

    // global add to cart state
    const quantity = useState<number>("cart.quantity", () => 1)
    const size = useState<string>("cart.size", () => "")

    // unique transaction id for every visitor to avoid adding to cart twice
    // add to cart script handles session wide persistence
    const transactionId = Math.floor(Math.random() * 100000)
    
    return {
        provide: {
            oriUrl(link: string, query?: Record<string, string>): string {
                // force original domain on a link, add query parameters
                let url = new URL(link)
                url.protocol = protocol
                url.hostname = mirroredHost
                if (query) {
                    for (const key in query) {
                        url.searchParams.set(key, query[key])
                    }
                }
                return url.toString()
            },
            isSafeLink(url: string): boolean {
                return url.startsWith("/") || url.startsWith(`${config.public.mirroredDomain}/`) || url === config.public.mirroredDomain
            },
            addToCartUrl(searchParams?: Record<string, string>): string {
                const product = useState<Product>("product")

                let url = new URL(product.value.data.link)
                url.protocol = protocol
                url.hostname = mirroredHost

                url.searchParams.set("lpo-basket", "add") 
                url.searchParams.set("lpo-transaction", transactionId.toString()) 

                if (quantity.value != 1) {
                    url.searchParams.set('lpo-qty', quantity.value.toString())
                }

                if (size.value) {
                    url.searchParams.set('lpo-size', size.value)
                }

                if (typeof searchParams !== 'undefined') {
                    for (const [key, value] of Object.entries(searchParams)) {
                        url.searchParams.set(key, value)
                    }
                }
                
                return url.toString()
            },
            recoAddToCartUrl(product: Product, searchParams?: Record<string, string>): string {
                let url = new URL(product.data.link)
                url.protocol = protocol
                url.hostname = mirroredHost

                url.searchParams.set("lpo-basket", "add") 
                url.searchParams.set("lpo-transaction", transactionId.toString()) 

                if (typeof searchParams !== 'undefined') {
                    for (const [key, value] of Object.entries(searchParams)) {
                        url.searchParams.set(key, value)
                    }
                }

                return url.toString()
            },
        }
    }
})