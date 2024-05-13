import { Hono } from 'hono';
import { userRoutes } from './router/userRouter';
import { blogRoutes } from './router/blogRouter';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRoutes);
export default app;
