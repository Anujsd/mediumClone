import { Hono } from 'hono';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsOfUser,
  getBlogById,
  updateBlog,
} from '../controller/blogController';
import { authmiddleware } from '../middleware/middleware';

export const blogRoutes = new Hono();

blogRoutes.get('/all', getAllBlogs);

blogRoutes.get('/', authmiddleware, getAllBlogsOfUser);
blogRoutes.post('/', authmiddleware, createBlog);
blogRoutes.get('/:id', getBlogById);
blogRoutes.put('/:id', authmiddleware, updateBlog);
blogRoutes.delete('/:id', authmiddleware, deleteBlog);
