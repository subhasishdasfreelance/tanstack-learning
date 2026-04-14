import type { App } from '#/server'
import { treaty } from '@elysiajs/eden'

const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

export const eden = treaty<App>(baseUrl).api
