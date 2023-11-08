import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='fixed h-16 bg-blue-800 top-0 right-0 left-0 flex items-center px-10'>
        <Link to='/home' className='text-2xl text-white font-mono w-1/12'>
          StudEase
        </Link>
        {props.changeUI ? (
          <div className='w-11/12 flex justify-between'>
            <div className='flex items-center w-2/5 justify-between '>
              <Link
                to='/about'
                className='text-2xl text-white font-mono font-bold'
              >
                About
              </Link>
              <button
                className='text-white text-2xl font-mono font-bold inline-flex items-center'
                type='button'
              >
                Your Subject
                <svg
                  className='w-2.5 h-2.5 ml-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>
              <button
                className='text-white text-2xl font-mono font-bold inline-flex items-center'
                type='button'
              >
                Your Class
                <svg
                  className='w-2.5 h-2.5 ml-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>
            </div>
            <div className='flex items-center w-3/5 justify-around'>
              <form className='w-1/2' onSubmit={() => navigate('/search')}>
                <label
                  htmlFor='default-search'
                  className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                >
                  Search
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='search'
                    id='default-search'
                    className='block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Flash cards, quizzes, questions...'
                    required
                  />
                  <button type='submit' hidden='hidden'></button>
                </div>
              </form>
              <div className='bg-gray-500 rounded-3xl px-2 py-1'>
                <AddIcon />
              </div>
              <div className='bg-gray-500 rounded-3xl px-2 py-1'>
                <NotificationsNoneIcon />
              </div>
              <div className='bg-gray-500 rounded-3xl px-2 py-1'>
                <PersonIcon />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
