import combos from '@/src/api/combos';
import moves from '@/src/api/moves';
import { Hono } from 'hono';

const app = new Hono();

app.route('/api/combos', combos);
app.route('/api/moves', moves);

export default app;