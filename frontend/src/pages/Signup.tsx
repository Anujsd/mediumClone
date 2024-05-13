import { Link } from 'react-router-dom';
import QuoteArea from '../Components/QuoteArea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { BACK_URL } from '../App';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const handleSignup = async () => {
    try {
      console.log(username, email, password);
      if (!username || !email || !password) {
        alert('input are empty');
        return;
      }
      const res = await axios.post(`${BACK_URL}/api/v1/user/signup`, {
        name: username,
        email: email,
        password: password,
      });

      localStorage.setItem('token', res.data.token);
      navigator('/');
    } catch (error: any) {
      console.log(error);
      if (error.name === 'AxiosError') {
        alert(
          'Invalid Input, needed valid email and password length more than 6'
        );
      }
    }
  };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='flex h-screen items-center justify-center flex-col'>
        <div className='flex flex-col items-center'>
          <div className='text-3xl font-bold'>Create an Account</div>
          <div className='font-semibold text-gray-500'>
            Already have an account?{' '}
            <Link className='underline' to='/signin'>
              Login
            </Link>
          </div>
        </div>
        <form className='mt-3' onSubmit={(e) => e.preventDefault()}>
          <div className='p-1'>
            <div className='font-semibold'>Username</div>
            <input
              type='text'
              className='px-5 py-2 border border-gray-400 rounded-md min-w-72'
              placeholder='Enter your name'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='p-1'>
            <div className='font-semibold'>Email</div>
            <input
              type='text'
              className='px-5 py-2 border border-gray-400 rounded-md min-w-72'
              placeholder='anuj@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='p-1'>
            <div className='font-semibold'>Password</div>
            <input
              type='password'
              className='px-5 py-2 border border-gray-400 rounded-md min-w-72'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='on'
            />
          </div>
          <div className='mt-2'>
            <div
              className='bg-black text-white text-center py-2 rounded-md'
              onClick={handleSignup}
            >
              Signup
            </div>
          </div>
        </form>
      </div>
      <QuoteArea />
    </div>
  );
};

export default Signup;
