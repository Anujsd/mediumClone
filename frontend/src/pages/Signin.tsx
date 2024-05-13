import { Link, useNavigate } from 'react-router-dom';
import QuoteArea from '../Components/QuoteArea';
import { useState } from 'react';
import axios from 'axios';
import { BACK_URL } from '../App';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const handleSignin = async () => {
    try {
      console.log(email, password);
      if (!email || !password) {
        alert('input are empty');
        return;
      }
      const res = await axios.post(`${BACK_URL}/api/v1/user/signin`, {
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
          <div className='text-3xl font-bold'>Login to account</div>
          <div className='font-semibold text-gray-500'>
            Not having account?{' '}
            <Link className='underline' to='/signup'>
              Signup
            </Link>
          </div>
        </div>
        <div className='mt-3'>
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
              onClick={handleSignin}
            >
              Login
            </div>
          </div>
        </div>
      </div>
      <QuoteArea />
    </div>
  );
};

export default Signin;
