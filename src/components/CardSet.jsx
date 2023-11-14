import React from 'react';
import { Link } from 'react-router-dom';

export const CardSet = (props) => {
  const { item } = props;
  return (
    <li className='p-6 border shadow border-gray-200 rounded-xl lg:w-[calc(50%_-_8px)] w-full'>
      <Link to={`/set/${item.id}`} className='w-full block'>
        <h4 className='font-medium'>{item.name}</h4>
        <div className='bg-gray-200 rounded-3xl inline-flex items-center justify-center text-[10px] py-1 px-2 font-medium'>
          <span>{item.data ? item.data.length : 0} Terms</span>
        </div>
        <div className='flex items-center gap-1 mt-12'>
          <img
            src='https://picsum.photos/300/300'
            alt='Avatar'
            className='w-6 h-6 rounded-full mr-2'
          />
          <h5 className='font-medium text-xs'>{item.userName || ''}</h5>
        </div>
      </Link>
    </li>
  );
};
