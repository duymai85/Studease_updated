import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { userService } from '../services';
import { KEY_LS } from '../utils/constant';

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await userService
      .login(data)
      .then((res) => {
        if (res.data.length) {
          toast.success('Login successfully.');
          localStorage.setItem(KEY_LS.USER_INFO, JSON.stringify(res.data[0]));
          navigate('/');
        } else {
          toast.error('Account does not exist.');
        }
      })
      .catch((error) => {
        toast.error('Login failed.');
      });
  };

  return (
    <section className='dark:bg-gray-900 h-full'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen h-full lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-center'>
              <Link
                to='/'
                className='text-3xl text-blue-800 font-semibold font-mono'
              >
                StudEase
              </Link>
            </h1>
            <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Login
            </h2>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  for='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@gmail.com'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email?.message && (
                  <span className='text-red-600 text-xs'>
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  for='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className='text-red-600 text-xs'>
                    Password is required
                  </span>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      for='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to='/'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Login
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
            <div className='w-full flex justify-center mt-4'>
              <div className='justify-around flex items-center gap-4'>
                <GoogleIcon />
                <GitHubIcon />
                <FacebookIcon />
                <MoreHorizIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
