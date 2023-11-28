import React from 'react';
import { Link } from 'react-router-dom';
import { AVATAR_EMPTY } from '../utils/constant';

export const CardSet = (props) => {
  const { item } = props;
  return (
    <li className='p-6 border shadow border-gray-200 rounded-xl lg:w-[calc(50%_-_8px)] w-full dark:bg-secondary-color dark:border-none dark:text-white'>
      <Link to={`/set/${item.id}`} className='w-full block'>
        <h4 className='font-medium'>{item.name}</h4>
        <div className='bg-gray-200 rounded-3xl inline-flex items-center justify-center text-[10px] py-1 px-2 font-medium'>
          <span className='dark:text-black'>
            {item.data ? item.data.length : 0} Terms
          </span>
        </div>
        <div className='flex items-center gap-1 mt-12'>
          <img
            src={item.user.photo || AVATAR_EMPTY}
            alt='Avatar'
            className='w-6 h-6 rounded-full mr-2'
            onError={(e) => {
              e.target['onerror'] = null;
              e.target['src'] = AVATAR_EMPTY;
            }}
          />
          <h5 className='font-medium text-xs'>{item.user.name || ''}</h5>
        </div>
      </Link>
    </li>
  );
};
