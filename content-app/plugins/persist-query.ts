import { useRouter } from 'vue-router'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    if (from.query.lpoid && !to.query.lpoid) {
      next({ 
        path: to.path, 
        query: { ...to.query, lpoid: from.query.lpoid },
        hash: to.hash
      })
    } else {
      next()
    }
  })
})