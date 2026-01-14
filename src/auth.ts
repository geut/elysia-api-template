import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'

import { db } from '@/db/db'
import * as schema from '@/db/schema'

const basePath = '/auth'

export const auth = betterAuth({
  basePath: basePath,

  database: drizzleAdapter(db, {
    provider: 'pg',

    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [openAPI()],

  trustedOrigins: [process.env.CORS_ORIGIN!],

  advanced: {
    defaultCookieAttributes: {
      // This allows cross-site cookies; necessary if your frontend and backend are on different domains
      sameSite: 'none',
      secure: true,
      partitioned: true,
    },
  },
})

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema())

export const OpenAPI = {
  getPaths: (prefix = basePath) =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null)

      for (const path of Object.keys(paths)) {
        const key = prefix + path
        reference[key] = paths[path] || {}

        for (const method of Object.keys(paths[path] || {})) {
          const operation = (reference[key] as any)[method]

          operation.tags = ['Better Auth']
        }
      }

      return reference
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const
