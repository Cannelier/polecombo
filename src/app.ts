import combos from '@/src/api/combos';
import moves from '@/src/api/moves';
import users from '@/src/api/users';
import { Hono } from 'hono';

const app = new Hono();

app.route('/api/combos', combos);
app.route('/api/moves', moves);
app.route('/api/users', users);

export default app;