import app from './app';

Bun.serve({ fetch: app.fetch, port: 4000 });
console.log('🚀 API running at http://localhost:4000');

export default app