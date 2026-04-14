import { treaty } from '@elysiajs/eden'
import { createIsomorphicFn } from '@tanstack/react-start'
import { app } from '@/server/app'

export const getEden = createIsomorphicFn()
  .server(() => treaty(app).api)
  .client(() => treaty<typeof app>('localhost:3000').api)

export const eden = new Proxy({} as ReturnType<typeof getEden>, {
  get(_, key) {
    const api = getEden()
    return api[key as keyof typeof api]
  },
})
