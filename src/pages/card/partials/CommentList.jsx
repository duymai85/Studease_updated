import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { flashCardService } from '../../../services';
import { checkUserLogin } from '../../../utils';
import CommentItem from './CommentItem';

const CommentList = ({ listComment, userInfo, setListComment }) => {
  const [comment, setComment] = useState('');
  const [isRequestAPI, setIsRequestAPI] = useState(false);
  const { id } = useParams();

  const handleComment = async (e) => {
    e.preventDefault();

    if (id && comment.trim()) {
      if (!isRequestAPI) {
        setIsRequestAPI(true);
        const data = {
          comment,
        };
        await flashCardService
          .createComment(id, data)
          .then((res) => {
            if (res.data) {
              setListComment((prev) => [...prev, res.data]);
              setComment('');
            }
            setIsRequestAPI(false);
          })
          .catch((error) => {
            setIsRequestAPI(false);
          });
      }
    }
  };

  return (
    <section className='bg-white dark:bg-gray-900 py-8 mt-1 lg:py-16 antialiased'>
      <div className='mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Discussion ({listComment.length || 0})
          </h2>
        </div>
        {checkUserLogin() ? (
          <form className='mb-6' onClick={handleComment}>
            <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
              <label htmlFor='comment' className='sr-only'>
                Your comment
              </label>
              <textarea
                id='comment'
                rows='6'
                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                placeholder='Write a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-800'
            >
              Post comment
            </button>
          </form>
        ) : (
          <button
            className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-6 text-center mb-8'
            onClick={() => (window.location.href = '/login')}
          >
            Login to comment
          </button>
        )}

        {listComment && listComment.length ? (
          [...listComment]
            .reverse()
            .map((comment, index) => (
              <CommentItem
                key={index}
                comment={comment}
                userInfo={userInfo}
                setListComment={setListComment}
              />
            ))
        ) : (
          <div className='p-3 border border-gray-200 rounded-lg flex items-center justify-center gap-1'>
            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
            <p className='font-medium text-gray-800'>No comments yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentList;
