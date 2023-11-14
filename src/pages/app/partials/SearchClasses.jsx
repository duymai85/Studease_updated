import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { flashCardService } from '../../../services';
import { CardClass } from '../../../components';

export const SearchClasses = (props) => {
  const { stringSearch } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [listClass, setListClass] = useState([]);

  const getListClass = async () => {
    setIsLoading(true);
    await flashCardService
      .getAllClassByName(stringSearch)
      .then((res) => {
        if (res.data.length) {
          setListClass(res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getListClass();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      {listClass.length ? (
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg text-[#2E3856] font-bold dark:text-white'>
              Classes
            </h3>
          </div>
          <ul className='flex flex-wrap gap-4'>
            {listClass.map((item, index) => (
              <CardClass item={item} key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col items-center dark:text-white'>
          <h2 className='text-3xl font-bold mb-4'>
            We couldn't find any results.
          </h2>
          <p className='text-xl font-semibold mb-4'>
            Here are some suggestions to improve your search results:
          </p>
          <ul className='list-disc text-lg'>
            <li>Check the spelling or try alternate spellings</li>
            <li>Search using different keywords</li>
            <li>Clear the filters</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchClasses;
