import { Context, Next } from 'hono';
import { Jwt } from 'hono/utils/jwt';

export const authmiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (token !== undefined && token !== null) {
      const decode = await Jwt.verify(token, c.env.JWT_TOKEN);
      console.log('inside middleware');
      console.log(decode);
      if (decode) {
        c.set('userId', decode);
        await next();
      }
    }
    return c.json(
      {
        message: 'invalid authentication',
      },
      401
    );
  } catch {
    return c.json(
      {
        message: 'invalid authentication',
      },
      401
    );
  }
};
