import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  return (
    <>
      <div className='flex justify-between'>
        <div className='w-2/5 bg-green-200 text-black flex rounded-full py-2'>
          <div className='font-bold h-full flex items-center px-3'>
            <AddIcon />
          </div>
          <Link to='/create-card'>
            <h1 className='font-bold text-xl'>Create flashcards</h1>
            <p>Create & customize your own flashcards</p>
          </Link>
        </div>
        <div className='w-2/5 bg-pink-300 text-black flex rounded-full py-2'>
          <div className='font-bold h-full flex items-center px-3'>
            <SaveIcon />
          </div>
          <Link to='/create-class'>
            <h1 className='font-bold text-xl'>Create classes</h1>
            <p>Create & customize your own classes</p>
          </Link>
        </div>
      </div>
      <div className='font-bold text-2xl mt-5'>
        <h1>Achievement</h1>
      </div>
      <div className='rounded-lg bg-blue-300 py-10 px-10'>
        <div className='grid grid-cols-10 gap-20'>
          <div className='col-span-5 flex justify-end items-center'>
            <div>
              <h1 className='font-bold text-xl'>2-day streak</h1>
              <p className=''>Study tomorrow to get the streak going!</p>
            </div>
          </div>
          <div className='col-span-5 flex justify-start'>
            <div className='w-4/6 bg-blue-400 p-6 rounded-full'>
              <ul className='flex justify-between font-bold'>
                <li>S</li>
                <li>M</li>
                <li>T</li>
                <li>W</li>
                <li>T</li>
                <li>F</li>
                <li>S</li>
              </ul>
              <ul className='flex justify-between font-bold'>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='font-bold text-2xl mt-5'>
        <h1>Recent</h1>
      </div>
      <div className='grid grid-cols-12 gap-10 '>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 1</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 2</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 3</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-10 mt-5'>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 4</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 5</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-400 col-span-4 rounded-3xl'>
          <div className='px-6 py-2'>
            <h1 className='font-bold'>Quiz 6</h1>
            <p>11 items</p>
            <div className='flex'>
              <CircleIcon className='text-red-500' />
              <p className='ml-3'>User_name1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
