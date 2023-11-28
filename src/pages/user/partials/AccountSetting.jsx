import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { userService } from '../../../services';

const AccountSetting = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await userService
      .changePassword(data)
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.detail || 'Register account failed.'
        );
      });
  };

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
        <h2 className='text-2xl font-bold sm:text-xl'>Account Settings</h2>
        <div className='grid max-w-2xl mx-auto'>
          <form
            className='items-center mt-2 sm:mt-8 text-[#202142]'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='current-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Current password
              </label>
              <input
                type='password'
                id='current-password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('currentPassword', { required: true })}
              />
              {errors.oldPassword && (
                <span className='text-red-600 text-xs'>
                  Current password is required
                </span>
              )}
            </div>

            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='new-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                New password
              </label>
              <input
                type='password'
                id='new-password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('newPassword', { required: true })}
              />
              {errors.oldPassword && (
                <span className='text-red-600 text-xs'>
                  New password is required
                </span>
              )}
            </div>
            <div className='mb-2 sm:mb-6'>
              <label
                htmlFor='confirm-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Confirm password
              </label>
              <input
                type='password'
                id='confirm-password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none'
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
              />
              {errors.confirmPassword?.message && (
                <span className='text-red-600 text-xs'>
                  {errors.confirmPassword?.message}
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

export default AccountSetting;
