import { Link } from 'react-router-dom';

const Appbar = () => {
  return (
    <div className='flex justify-between p-3 border-b-2 items-center'>
      <Link to='/'>Medium</Link>
      <div className='flex'>
        <Link
          to='/blog/create'
          className='bg-gray-600 p-2 mr-3 text-white rounded-md'
        >
          Create Blog
        </Link>
        <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
          <span className='font-medium text-gray-600 dark:text-gray-300'>
            JL
          </span>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
