import React, { useState, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Card } from './Card';

export const Cards = ({ listTerm }) => {
  const [flashcardData, setflashcardData] = useState([]);

  const cards = flashcardData.map((card) => {
    return <Card card={card} key={card.id} />;
  });

  const loading = <div className='loading'>Loading flashcard content...</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  useEffect(() => {
    setflashcardData(listTerm);
  }, []);

  return (
    <div className='border-b border-gray-300 pb-8'>
      {flashcardData && flashcardData.length > 0 ? cards[current] : loading}
      <div className='flex items-center justify-center gap-8 text-gray-700 font-medium mt-4'>
        {current > 0 ? (
          <button
            className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer'
            onClick={previousCard}
          >
            <ArrowBackIcon />
          </button>
        ) : (
          <button
            className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer disabled:bg-gray-100 disabled:cursor-auto'
            disabled
          >
            <ArrowBackIcon />
          </button>
        )}
        {flashcardData && flashcardData.length > 0 ? (
          <div className='cardNumber'>
            {current + 1} / {flashcardData.length}
          </div>
        ) : (
          ''
        )}
        {current < flashcardData.length - 1 ? (
          <button
            onClick={nextCard}
            className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer'
          >
            <ArrowForwardIcon />
          </button>
        ) : (
          <button
            className='flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer disabled:bg-gray-100 disabled:cursor-auto'
            disabled
          >
            <ArrowForwardIcon />
          </button>
        )}
      </div>
    </div>
  );
};
