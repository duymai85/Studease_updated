import React, { useState } from 'react';

export const Card = ({ card }) => {
  const [side, setSide] = useState();

  const handleClick = () => {
    setSide(!side);
  };

  return (
    <div className={`card ${side ? 'side' : ''}`} onClick={handleClick}>
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className='front text-center'>
        <p>{card.front}</p>
        {card.image && (
          <img
            src={card.image}
            alt={card.front}
            className='w-[300px] h-[200px] object-cover mt-4'
          />
        )}
      </div>
      <div className='back'>{card.back}</div>
    </div>
  );
};
