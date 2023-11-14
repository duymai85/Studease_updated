import React from 'react';
import { Link } from 'react-router-dom';

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

export const CardClass = (props) => {
  const { item } = props;
  return (
    <li className='p-6 border shadow border-gray-200 rounded-xl lg:w-[calc(50%_-_8px)] w-full'>
      <Link to={`/class/${item.id}`} className='w-full block'>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium'>{item.name}</h4>
            <p className='text-gray-500 font-medium'>{item.school}</p>
          </div>
          <div>
            <GroupOutlinedIcon fontSize='large' color='primary' />
          </div>
        </div>
        <div className='bg-gray-200 rounded-3xl inline-flex items-center justify-center text-[10px] py-1 px-2 font-medium mt-12'>
          <span className='inline-block'>
            {item.setIds ? item.setIds.length : 0} study set
          </span>
        </div>
      </Link>
    </li>
  );
};
