import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { KEY_LS } from '../../utils/constant';
import { userService } from '../../services';
import { toast } from 'react-toastify';

export const Settings = () => {
  const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setValue('name', userInfo.name || '');
      setValue('email', userInfo.email || '');
      setValue('phone', userInfo.phone || '');
      setValue('country', userInfo.country || '');
      setUserInfo(userInfo);
    }
  }, []);

  const onSubmit = async (data) => {
    if (userInfo) {
      const dataUser = Object.assign(userInfo, data);
      await userService
        .updateUser(dataUser)
        .then((res) => {
          if (res.data) {
            setUserInfo(res.data);
            localStorage.setItem(KEY_LS.USER_INFO, JSON.stringify(res.data));
            toast.success('Update information user successfully.');
          }
        })
        .catch((error) => {
          toast.error('Update information user failed.');
        });
    }
  };

  return (
    <div className='bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-12 md:flex-row text-[#161931]'>
      <aside className='hidden py-4 md:w-1/3 lg:w-1/4 md:block'>
        <div className='sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12'>
          <h2 className='pl-3 mb-4 text-2xl font-semibold'>Settings</h2>
          <Link
            to='#'
            className='flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full'
          >
            Pubic Profile
          </Link>
          <Link
            to='#'
            className='flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full'
          >
            Account Settings
          </Link>
          <Link
            to='#'
            className='flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  '
          >
            Notifications
          </Link>
        </div>
      </aside>
      <main className='w-full min-h-screen py-1 md:w-2/3 lg:w-3/4'>
        <div className='p-2 md:p-4'>
          <div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
            <h2 className='pl-6 text-2xl font-bold sm:text-xl'>
              Public Profile
            </h2>

            <div className='grid max-w-2xl mx-auto mt-8'>
              <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
                <img
                  className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
                  src='https://picsum.photos/300/300'
                  alt='Bordered avatar'
                />

                <div className='flex flex-col space-y-5 sm:ml-8'>
                  <button
                    type='button'
                    className='py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 '
                  >
                    Change picture
                  </button>
                </div>
              </div>

              <form
                className='items-center mt-8 sm:mt-14 text-[#202142]'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='mb-2 sm:mb-6'>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Your name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <span className='text-red-600 text-xs'>
                      Name is required
                    </span>
                  )}
                </div>

                <div className='mb-2 sm:mb-6'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    {...register('email')}
                    disabled
                  />
                </div>

                <div className='mb-2 sm:mb-6'>
                  <label
                    htmlFor='phone'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Your phone
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    {...register('phone', { required: true })}
                  />
                  {errors.phone && (
                    <span className='text-red-600 text-xs'>
                      Phone is required
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='phone'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    {...register('country', { required: true })}
                  />
                  {errors.country && (
                    <span className='text-red-600 text-xs'>
                      Country is required
                    </span>
                  )}
                </div>

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
