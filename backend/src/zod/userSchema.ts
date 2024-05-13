import { z } from 'zod';

export const userSignUp = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const userSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
