import { Elysia } from 'elysia';

import { auth } from '@/auth';

const app = new Elysia()

  .get('/api/auth/*', async ({ request }) => {

    return auth.handler(request);

  })

  .post('/api/auth/*', async ({ request }) => {

    return auth.handler(request);

  })

  .get('/', () => 'Hello Elysia with Better Auth!')

  .listen(3000);

console.log(`Server running on http://localhost:3000`);