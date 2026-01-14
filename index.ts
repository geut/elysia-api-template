import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
import { Elysia } from 'elysia'

import { OpenAPI } from '@/auth'
import { betterAuthPlugin } from '@/plugins/better-auth'

export const app = new Elysia()
  .use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(betterAuthPlugin)
  .get('/user', ({ user }) => user, {
    auth: true,
  })
  .listen(3000)

// eslint-disable-next-line no-console
console.log(`Server running on http://localhost:3000`)
