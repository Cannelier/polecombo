import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

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


serve({ fetch: app.fetch, port: 3000 });
console.log('🚀 API running at http://localhost:3000');

export default app