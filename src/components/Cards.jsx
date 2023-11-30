import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Card } from './Card';
import { handleSaveDataProgress } from '../utils/common';
import { Congratulation } from '../assets/icons';

export const Cards = ({ listTerm, id }) => {
  const [flashcardData, setflashcardData] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  const cards = flashcardData?.map((card) => {
    return <Card card={card} key={card.id} />;
  });

  // navigation in cards
  const [current, setCurrent] = useState(0);
  const previousCard = () => {
    const percentProgress = Math.floor(
      ((current - 1) / flashcardData.length) * 100
    );
    setCurrent(current - 1);
    setOverallProgress(percentProgress);
  };
  const nextCard = () => {
    const percentProgress = Math.floor(
      ((current + 1) / flashcardData.length) * 100
    );
    setCurrent(current + 1);
    setOverallProgress(percentProgress);
  };

  const handleBackToQuestion = () => {
    const percentProgress = Math.floor(
      ((current - 1) / flashcardData.length) * 100
    );
    setCurrent(current - 1);
    setOverallProgress(percentProgress);
  };

  useEffect(() => {
    setflashcardData(listTerm);
    // eslint-disable-next-line
  }, []);

  window.onbeforeunload = () => {
    handleSaveDataProgress(id, overallProgress);
  };

  return (
    <>
      <div className='pb-8'>
        {current < flashcardData?.length ? (
          <>
            {flashcardData && flashcardData?.length > 0 ? (
              cards[current]
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <div className='flex items-center justify-center gap-8 text-gray-700 font-medium mt-4 pb-8'>
              {current > 0 ? (
                <button
                  className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer dark:text-black dark:bg-white'
                  onClick={previousCard}
                >
                  <ArrowBackIcon />
                </button>
              ) : (
                <button
                  className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer disabled:bg-gray-100 disabled:cursor-auto dark:disabled:bg-gray-300'
                  disabled
                >
                  <ArrowBackIcon />
                </button>
              )}
              {flashcardData && flashcardData?.length > 0 ? (
                <div className='cardNumber dark:text-white'>
                  {current + 1} / {flashcardData.length}
                </div>
              ) : (
                ''
              )}
              <button
                onClick={nextCard}
                className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer dark:text-black dark:bg-white dark:disabled:'
              >
                <ArrowForwardIcon />
              </button>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700'>
              <div
                className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500`}
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className='relative w-full h-[400px] flex items-center justify-center flex-col'>
            <Confetti className='w-full h-[400px]' recycle={false} />
            <div className='flex gap-8 items-center'>
              <h3 className='font-bold text-2xl w-[350px]'>
                Congratulations on completing the set.
              </h3>
              <img src={Congratulation} alt='congralutation' />
            </div>
            <button
              onClick={handleBackToQuestion}
              className='mt-24 font-semibold text-sm'
            >
              <ArrowBackIcon sx={{ marginRight: '8px' }} />
              Back to the last question
            </button>
          </div>
        )}
      </div>
    </>
  );
};
