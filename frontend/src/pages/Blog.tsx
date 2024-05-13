import { useEffect, useState } from 'react';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACK_URL } from '../App';

interface postInterface {
  author: any;
  content: string;
  createdAt: string;
  id: string;
  published: boolean;
  title: string;
}
const Blog = () => {
  const [post, setPost] = useState<postInterface>({
    author: {},
    content: '',
    createdAt: '',
    id: '',
    published: false,
    title: '',
  });
  const { blogId } = useParams();

  const getPost = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const res = await axios.get(`${BACK_URL}/api/v1/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setPost(res.data.post);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      <Appbar />
      {post && (
        <div className='flex h-screen'>
          <div className='w-full p-10'>
            <div className='text-3xl font-bold'>{post.title}</div>
            <div className='text-gray-500'>{post.createdAt}</div>
            <div className='mt-3'>{post.content}</div>
          </div>
          <div className='bg-slate-100 w-1/6 p-10 flex items-start flex-col'>
            <div>Author</div>
            <div className='flex justify-center items-center mt-5'>
              <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                <span className='font-medium text-gray-600 dark:text-gray-300'>
                  <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                    <span className='font-medium text-gray-600 dark:text-gray-300'>
                      {post.author.name && post.author.name[0]}
                    </span>
                  </div>
                </span>
              </div>
              <div className='ml-3'>{post.author.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
