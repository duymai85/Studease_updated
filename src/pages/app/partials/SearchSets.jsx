import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { userService } from '../../../services';
import { flashCardService } from '../../../services';
import { CardSet } from '../../../components';

export const SearchSets = (props) => {
  const { stringSearch } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [listSet, setListSet] = useState([]);

  const getListSet = async () => {
    setIsLoading(true);
    await flashCardService
      .getAllSetByName(stringSearch)
      .then(async (res) => {
        if (res.data.length) {
          const data = [];
          for (const item of res.data) {
            const name = await getNameOfUser(item.userId);
            data.push({ ...item, userName: name });
          }
          setListSet(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getNameOfUser = async (id) => {
    let name = '';
    if (id) {
      await userService
        .getUserById(id)
        .then((res) => {
          if (res.data) {
            name = res.data.username;
          }
        })
        .catch((error) => {});
    }
    return name;
  };

  useEffect(() => {
    getListSet();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      {listSet.length ? (
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg text-[#2E3856] font-bold'>Study Sets</h3>
          </div>
          <ul className='flex flex-wrap gap-4'>
            {listSet.map((item, index) => (
              <CardSet item={item} key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
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