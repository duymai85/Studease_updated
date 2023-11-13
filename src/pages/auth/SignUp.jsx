import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { userService } from '../../services';

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkUser = async (username) => {
    let flag = false;

    await userService
      .checkExistUser(username)
      .then((res) => {
        if (res.data.length) {
          flag = true;
        }
      })
      .catch((error) => {
        toast.error('Account already exists.');
      });

    return flag;
  };

  const onSubmit = async (data) => {
    const isExistUser = await checkUser(data.username);
    const dataUser = {
      id: uuidv4(),
      phone: '',
      name: data.username,
      country: '',
      ...data,
    };
    delete dataUser.confirmPassword;
    if (!isExistUser) {
      await userService
        .register(dataUser)
        .then((res) => {
          if (res.data) {
            toast.success('Register account successfully.');
            navigate('/login');
          } else {
            toast.error('Register account failed.');
          }
        })
        .catch((error) => {
          toast.error('Register account failed.');
        });
    } else {
      toast.error('Account already exists..');
    }
  };

  return (
    <section className='h-full'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen h-full lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-center'>
              <Link
                to='/'
                className='text-3xl text-blue-800 font-mono font-semibold'
              >
                StudEase
              </Link>
            </h1>
            <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Sign up
            </h2>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  for='username'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Your username
                </label>
                <input
                  type='text'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder=''
                  {...register('username', { required: true })}
                />
                {errors.username && (
                  <span className='text-red-600 text-xs'>
                    Your username is required
                  </span>
                )}
              </div>
              <div>
                <label
                  for='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
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
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className='text-red-600 text-xs'>
                    Password is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Confirm password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (val) => {
                      if (watch('password') !== val) {
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
              <button
                type='submit'
                className='w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign up
              </button>
              <p className='text-sm font-light text-gray-500'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
