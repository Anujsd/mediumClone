import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { userSignIn, userSignUp } from '../zod/userSchema';
import { z } from 'zod';
import { Jwt } from 'hono/utils/jwt';

export const createUser = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user: z.infer<typeof userSignUp> = await c.req.json();

    const zodParse = userSignUp.safeParse(user);
    if (zodParse.success === false) {
      return c.json({ message: 'invalid input' }, 400);
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userExists) {
      return c.json({ message: 'account already exists' }, 200);
    }

    const userCreate = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    const token = await Jwt.sign(userCreate.id, c.env.JWT_TOKEN);

    return c.json(
      {
        message: 'user is successfully created',
        token: token,
        user: {
          userId: userCreate.id,
          name: userCreate.name,
          email: userCreate.email,
        },
      },
      201
    );
  } catch (error) {
    console.log(error);
    return c.json(
      {
        message: 'internal server error',
      },
      500
    );
  }
};

export const loginUser = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user: z.infer<typeof userSignIn> = await c.req.json();
    console.log(user);
    const zodParse = userSignIn.safeParse(user);
    if (zodParse.success === false) {
      return c.json({ message: 'invalid input' }, 400);
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
        password: user.password,
      },
    });
    if (!userExists) {
      return c.json({ message: 'email or password is wrong' }, 200);
    }
    const token = await Jwt.sign(userExists.id, c.env.JWT_TOKEN);
    return c.json(
      {
        message: 'user is successfully logged in',
        token: token,
        user: {
          userId: userExists.id,
          name: userExists.name,
          email: userExists.email,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: 'internal server error',
      },
      500
    );
  }
};
