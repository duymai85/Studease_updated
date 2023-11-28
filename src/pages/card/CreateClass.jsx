import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { flashCardService } from '../../services';

import { KEY_LS } from '../../utils/constant';
import { handlePushTextToNotification } from '../../utils/common';

export const CreateClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (accessToken) {
      const dataClass = {
        ...data,
        setIds: [],
      };
      await flashCardService
        .createClass(dataClass)
        .then((res) => {
          if (res.data) {
            toast.success('Create class successfully.');
            handlePushTextToNotification(
              `You have successfully created class ${res.data.name}.`
            );
            navigate('/');
          }
        })
        .catch((error) => {
          toast.error('Create class failed.');
        });
    }
  };

  return (
    <>
      <div className='h-[90vh] flex items-center justify-center dark:text-white'>
        <div className='w-[90%] lg:w-1/3 p-10 shadow-xl dark:bg-secondary-color'>
          <h1 className='text-2xl mb-4 font-bold'>Create a new class</h1>
          <p>
            Create your own class and share them with your classmates/students
          </p>
          <form action='' onSubmit={handleSubmit(onSubmit)}>
            <div className='my-3'>
              <input
                placeholder='Enter a class name, subject etc.'
                className='bg-gray-300 text-black w-full px-4 py-2'
                {...register('name', { required: true })}
              ></input>
              {errors.name && (
                <span className='text-red-600 text-xs'>
                  Class name is required
                </span>
              )}
            </div>
            <div className='my-3'>
              <input
                placeholder='Enter a description (Optional)'
                className='bg-gray-300 text-black w-full px-4 py-2'
                {...register('description')}
              ></input>
            </div>
            <div className='my-3'>
              <input
                type='checkbox'
                className='bg-gray-300 text-black mr-3'
                {...register('permissions')}
              ></input>
              <label>Allow class members to add or remove sets</label>
            </div>
            <div className='my-3'>
              <input
                type='checkbox'
                className='bg-gray-300 text-black mr-3'
              ></input>
              <label>Allow class members to invite new members</label>
            </div>
            <div className='my-3'>
              <input
                placeholder='Enter the name of your school'
                className='bg-gray-300 text-black w-full px-4 py-2'
                {...register('school', { required: true })}
              ></input>
              {errors.school && (
                <span className='text-red-600 text-xs'>
                  Name of your school is required
                </span>
              )}
            </div>
            <div className='text-end'>
              <button className='text-white bg-gray-500 px-5 py-2 rounded-full'>
                Create class
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
