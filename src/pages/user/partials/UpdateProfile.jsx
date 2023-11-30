import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AVATAR_EMPTY } from '../../../utils/constant';
import { userService } from '../../../services';
import { cloudinary } from '../../../config/cloudinary';

const UpdateProfile = ({ userInfo, setUserInfo }) => {
  const [photo, setPhoto] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', cloudinary.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', cloudinary.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append('folder', 'Cloudinary-React');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const res = await response.json();
      if (res.url) {
        setPhoto(res.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (userInfo) {
      const dataUser = Object.assign(userInfo, { ...data, photo });
      await userService
        .updateUser(dataUser)
        .then((res) => {
          if (res.data) {
            setUserInfo(res.data);
            toast.success('Update information user successfully.');
          }
        })
        .catch((error) => {
          toast.error('Update information user failed.');
        });
    }
  };

  useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name || '');
      setValue('email', userInfo.email || '');
      setValue('phone', userInfo.phone || '');
      setValue('country', userInfo.country || '');
      setPhoto(userInfo.photo || '');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
        <h2 className='text-2xl font-bold sm:text-xl'>Public Profile</h2>
        <div className='grid max-w-2xl mx-auto mt-8'>
          <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
            <img
              className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
              src={photo || AVATAR_EMPTY}
              alt='Bordered avatar'
              onError={(e) => {
                e.target['onerror'] = null;
                e.target['src'] = AVATAR_EMPTY;
              }}
            />

            <div className='flex flex-col space-y-5 sm:ml-8'>
              <input
                type='file'
                id='upload'
                hidden
                onChange={handleChangeAvatar}
              />
              <label
                htmlFor='upload'
                className='py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer'
              >
                Change picture
              </label>
            </div>
          </div>

          <form
            className='items-center mt-8 sm:mt-14 text-[#202142]'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your name
              </label>
              <input
                type='text'
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className='text-red-600 text-xs'>Name is required</span>
              )}
            </div>

            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('email')}
                disabled
              />
            </div>

            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='phone'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your phone
              </label>
              <input
                type='text'
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('phone', { required: true })}
              />
              {errors.phone && (
                <span className='text-red-600 text-xs'>Phone is required</span>
              )}
            </div>

            <div className='mb-6'>
              <label
                htmlFor='phone'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Country
              </label>
              <input
                type='text'
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
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
  );
};

export default UpdateProfile;
