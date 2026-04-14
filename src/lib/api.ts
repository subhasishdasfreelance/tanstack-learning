import { treaty } from '@elysiajs/eden'
import { createIsomorphicFn } from '@tanstack/react-start'
import { app } from '@/server/app'

export const getApi = createIsomorphicFn()
  .server(() => treaty(app).api)
  .client(() => treaty<typeof app>('localhost:3000').api)
