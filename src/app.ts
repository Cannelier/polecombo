import { Hono } from 'hono';
import combos from './api/combos';

const app = new Hono();

app.route('/api/combos', combos);

export default app;