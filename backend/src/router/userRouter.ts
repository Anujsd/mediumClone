import { Hono } from 'hono';
import { createUser, loginUser } from '../controller/userController';

export const userRoutes = new Hono();

userRoutes.get('/', (c) => {
  return c.text('You are in users route');
});

userRoutes.post('/signin', loginUser);
userRoutes.post('/signup', createUser);
