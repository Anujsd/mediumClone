import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

export const getAllBlogs = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: true,
        createdAt: true,
      },
    });
    console.log(posts);
    return c.json(
      {
        message: 'find All blogs',
        length: posts.length,
        posts: posts,
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

export const getAllBlogsOfUser = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    console.log(posts);
    return c.json(
      {
        message: 'find posts',
        length: posts.length,
        posts: posts,
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

export const getBlogById = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    console.log(postId);
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: true,
        createdAt: true,
      },
    });

    if (!post) {
      return c.json({ message: 'Post does not exist' }, 404);
    }
    return c.json(
      {
        message: 'find post below',
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          published: post.published,
          author: post.author,
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

export const createBlog = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post: {
      title: string;
      content: string;
      published: boolean;
    } = await c.req.json();
    console.log(post);
    const userId = c.get('userId');
    const res = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: userId,
      },
    });
    console.log(res);
    return c.json(
      {
        message: 'post created successfully',
        post: {
          id: res.id,
          title: res.title,
          content: res.content,
          published: res.published,
          createdAt: res.createdAt,
        },
      },
      201
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

export const updateBlog = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    const reqData: {
      title: string;
      content: string;
      published: boolean;
    } = await c.req.json();

    console.log(reqData);

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: c.get('userId'),
      },
    });

    if (!post) {
      return c.json({ message: 'Post does not exist' }, 404);
    }

    const res = await prisma.post.update({
      where: {
        id: postId,
        authorId: c.get('userId'),
      },
      data: {
        title: reqData.title,
        content: reqData.content,
        published: reqData.published,
        authorId: c.get('userId'),
      },
    });

    return c.json(
      {
        message: 'post updated successfully',
        post: {
          id: res.id,
          title: res.title,
          content: res.content,
          published: res.published,
          createdAt: res.createdAt,
        },
      },
      200
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

export const deleteBlog = async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: c.get('userId'),
      },
    });

    if (!post) {
      return c.json({ message: 'post does not exist' }, 404);
    }
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: c.get('userId'),
      },
    });
    return c.json(
      {
        message: 'post deleted successfully',
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
