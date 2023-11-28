import React from 'react';

import { AVATAR_EMPTY } from '../utils/constant';

export const CardUser = (props) => {
  const { item } = props;

  return (
    <li className='w-full lg:w-[calc(50%_-_8px)] border shadow border-gray-200 rounded-3xl p-6 dark:bg-secondary-color dark:text-white dark:border-none'>
      <div className='mb-4'>
        <img
          src={item.photo || AVATAR_EMPTY}
          alt='Avatar'
          className='w-6 h-6 rounded-full mr-2'
          onError={(e) => {
            e.target['onerror'] = null;
            e.target['src'] = AVATAR_EMPTY;
          }}
        />
      </div>
      <div>
        <h3 className='font-bold text-lg'>{item.username}</h3>
        <p className='font-medium'>{item.name}</p>
      </div>
    </li>
  );
};
