import React from 'react';

export const CardUser = (props) => {
  const { item } = props;

  return (
    <li className='w-full lg:w-[calc(50%_-_8px)] border shadow border-gray-200 rounded-3xl p-6'>
      <div className='mb-4'>
        <img
          src='https://picsum.photos/300/300'
          alt='Avatarr'
          className='w-16 h-16 rounded-full'
        />
      </div>
      <div>
        <h3 className='font-bold text-lg'>{item.username}</h3>
        <p className='font-medium'>{item.name}</p>
      </div>
    </li>
  );
};
