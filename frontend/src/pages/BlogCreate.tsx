import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACK_URL } from '../App';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log(title, content);
      const res = await axios.post(
        `${BACK_URL}/api/v1/blog`,
        {
          title: title,
          content: content,
          published: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      alert('post has been save successfully');
    } catch (error) {
      console.log(error);
      alert('Error Saving post');
    }
  };
  return (
    <div className='w-screen'>
      <div className='flex justify-between p-3 border-b-2 items-center'>
        <Link to='/'>Medium</Link>
        <div className='flex'>
          <div
            className='bg-gray-600 p-2 mr-3 text-white rounded-md'
            onClick={handleSave}
          >
            Save Blog
          </div>
          <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <span className='font-medium text-gray-600 dark:text-gray-300'>
              JL
            </span>
          </div>
        </div>
      </div>
      <div className='p-10 w-full'>
        <div>
          <div className='text-xl font-bold'>Title</div>
          <textarea
            className='border bg-gray-100 w-full rounded-sm p-2'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className='text-xl font-bold'>Content</div>
          <textarea
            className='border bg-gray-100 w-full h-96 rounded-sm p-2'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;
