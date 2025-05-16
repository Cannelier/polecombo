import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import app from './app';

app.use('*', clerkMiddleware())
app.get('/', (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
        return c.json({
            message: 'You are not logged in.',
        })
    }

    return c.json({
        message: 'You are logged in!',
        userId: auth.userId,
    })
})


Bun.serve({ fetch: app.fetch, port: 4000 });
console.log('🚀 API running at http://localhost:4000');

export default app