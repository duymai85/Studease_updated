import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

export const CreateCard = (props) => {
  useEffect(() => {
    props.changeUI(true);
  }, []);
  return (
    <>
      <div className='grid grid-cols-2 gap-20 '>
        <div className='w-full flex justify-center'>
          <div className='w-4/5 border-2 border-black shadow-xl px-3 py-1'>
            <div className='w-full flex justify-center'>
              <h1 className='w-4/5 border-2 border-dashed border-black flex justify-center text-xl text-center font-bold py-2'>
                What's this location?
              </h1>
            </div>
            <div className='border-2 border-dashed border-black mt-16 p-3'>
              <a className='border-2 border-black px-3 py-1 rounded-lg'>
                Image Attached
              </a>
              <div className='w-full flex justify-center'>
                <div className='w-1/3'>
                  <img src='https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-4/5 border-2 border-black shadow-xl px-3 py-1'>
            <div className='w-full flex justify-center'>
              <h1 className='w-4/5 border-2 border-dashed border-black flex justify-center text-xl text-center font-bold py-2'>
                What's this location?
              </h1>
            </div>
            <div className='border-2 border-dashed border-black mt-16 p-3'>
              <a className='border-2 border-black px-3 py-1 rounded-lg'>
                Image Attached
              </a>
              <div className='w-full flex justify-center'>
                <div className='w-1/3'>
                  <img src='https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-4/5 border-2 border-black shadow-xl px-3 py-1'>
            <div className='w-full flex justify-center'>
              <h1 className='w-4/5 border-2 border-dashed border-black flex justify-center text-xl text-center font-bold py-2'>
                What's this location?
              </h1>
            </div>
            <div className='border-2 border-dashed border-black mt-16 p-3'>
              <a className='border-2 border-black px-3 py-1 rounded-lg'>
                Image Attached
              </a>
              <div className='w-full flex justify-center'>
                <div className='w-1/3'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-4/5 border-2 border-black shadow-xl px-3 py-1'>
            <div className='w-full flex justify-center'>
              <h1 className='w-4/5 border-2 border-dashed border-black flex justify-center text-xl text-center font-bold py-2'>
                What's this location?
              </h1>
            </div>
            <div className='border-2 border-dashed border-black mt-16 p-3'>
              <a className='border-2 border-black px-3 py-1 rounded-lg'>
                Image Attached
              </a>
              <div className='w-full flex justify-center'>
                <div className='w-1/3'>
                  <img src='https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-center mt-5'>
        <div className='rounded-xl bg-gray-500 p-2'>
          <AddIcon className='text-3xl' />
        </div>
      </div>
      <div className='w-full text-end mt-5'>
        <button className='bg-blue-800 text-white px-6 py-2 rounded-md text-xl mb-20 mr-10'>
          Save
        </button>
      </div>
    </>
  );
};
