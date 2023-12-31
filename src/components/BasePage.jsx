import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const BasePage = (props) => {
  useEffect(() => {
    props.changeUI(true);
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid grid-cols-10 gap-8 lg:mx-20 mx-10'>
      <div className='col-span-10 lg:col-span-7'>
        <Outlet />
      </div>
      <div className='col-span-10 lg:col-span-3'>
        <div className='flex items-center justify-center h-full'>
          <div className=''>
            <img
              src='https://www.ketchum.edu/sites/default/files/2022-08/First%20%28Top%29%20Image%20.jpeg'
              alt='mobile phone'
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
