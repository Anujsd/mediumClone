import { useEffect, useState } from 'react';
import Appbar from '../Components/Appbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACK_URL } from '../App';

const Main = () => {
  const navigator = useNavigate();
  const [allPosts, setAllPosts] = useState([]);

  const getAllPost = async () => {
    const res = await axios.get(`${BACK_URL}/api/v1/blog/all`);
    console.log(res.data);
    setAllPosts(res.data.posts);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigator('/signup');
    }
    getAllPost();
  }, []);
  return (
    <div>
      <Appbar />
      <div className='flex flex-col items-center'>
        {allPosts &&
          allPosts.map(
            (post: {
              author: any;
              content: string;
              createdAt: string;
              id: string;
              published: boolean;
              title: string;
            }) => {
              return (
                <div
                  key={post.id}
                  className='flex flex-col border-b border-gray-500 p-7 w-5/6'
                >
                  <div className='flex items-center'>
                    <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                      <span className='font-medium text-gray-600 dark:text-gray-300'>
                        <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                          <span className='font-medium text-gray-600 dark:text-gray-300'>
                            {post.author.name[0]}
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className='ml-3'>{post.author.name}</div>
                  </div>

                  <Link to={`blog/${post.id}`} className='text-2xl font-bold'>
                    {post.title}
                  </Link>
                  <div className=''>{post.content}</div>
                  <div className='text-gray-400 py-5'>3 min read</div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Main;
