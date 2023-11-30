import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';

import { flashCardService } from '../../../services';
import { AVATAR_EMPTY } from '../../../utils/constant';
import { dateToYMD } from '../../../utils/datetime';

const CommentItem = ({ setListComment, comment, userInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRequestAPI, setIsRequestAPI] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async () => {
    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await flashCardService
        .deleteComment(comment.id)
        .then((res) => {
          setListComment((prev) =>
            prev.filter((item) => item.id !== comment.id)
          );
          setAnchorEl(null);
          setIsRequestAPI(false);
        })
        .catch((error) => {
          setAnchorEl(null);
          setIsRequestAPI(false);
        });
    }
  };

  return (
    <article className='py-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
      <footer className='flex justify-between items-center mb-2'>
        <div className='flex items-center'>
          <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
            <img
              src={comment?.user?.photo || AVATAR_EMPTY}
              alt='Avatar'
              className='mr-2 w-6 h-6 rounded-full'
              onError={(e) => {
                e.target['onerror'] = null;
                e.target['src'] = AVATAR_EMPTY;
              }}
            />
            {comment?.user?.name || ''}
          </p>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            <p>{dateToYMD(comment?.created_at || 0)}</p>
          </div>
        </div>
        {comment?.user?.id === userInfo.sub && (
          <>
            <button
              id={`dropdownComment${comment.id}Button`}
              className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              type='button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 3'
              >
                <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
              </svg>
              <span className='sr-only'>Comment settings</span>
            </button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleDeleteComment}>
                <DeleteIcon sx={{ marginRight: '4px' }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </footer>
      <p className='text-gray-500 dark:text-gray-400'>
        {comment?.comment || ''}
      </p>
    </article>
  );
};

export default CommentItem;
