import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { userService } from '../../../services';
import { flashCardService } from '../../../services';
import { CardClass, CardSet, CardUser } from '../../../components';

export const SearchAll = (props) => {
  const { stringSearch } = props;
  const [listUser, setListUser] = useState([]);
  const [listClass, setListClass] = useState([]);
  const [listSet, setListSet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListUser = async () => {
    setIsLoading(true);
    await userService
      .getAllUserByUsername(stringSearch)
      .then((res) => {
        if (res.data) {
          setListUser(res.data.users);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getListClass = async () => {
    setIsLoading(true);
    await flashCardService
      .getAllClassByName(stringSearch)
      .then((res) => {
        if (res.data) {
          setListClass(res.data.classes);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getListSet = async () => {
    setIsLoading(true);
    await flashCardService
      .getAllSetByName(stringSearch)
      .then((res) => {
        if (res.data) {
          setListSet(res.data.sets);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getListUser();
    getListClass();
    getListSet();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : !listUser.length && !listSet.length && !listClass.length ? (
    <div className='flex flex-col items-center dark:text-white'>
      <h2 className='text-3xl font-bold mb-4'>We couldn't find any results.</h2>
      <p className='text-xl font-semibold mb-4'>
        Here are some suggestions to improve your search results:
      </p>
      <ul className='list-disc text-lg'>
        <li>Check the spelling or try alternate spellings</li>
        <li>Search using different keywords</li>
        <li>Clear the filters</li>
      </ul>
    </div>
  ) : (
    <>
      {listUser.length ? (
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg text-[#2E3856] font-bold dark:text-white'>
              Users
            </h3>
            <Link
              to={`/search?query=${stringSearch}&type=users}`}
              onClick={() => {
                window.location.href = `/search?query=${stringSearch}&type=users`;
              }}
              className='font-semibold text-blue-700 dark:text-white'
            >
              View all
            </Link>
          </div>
          <ul className='flex flex-wrap gap-4'>
            {listUser.slice(0, 2).map((item, index) => (
              <CardUser item={item} key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {listSet.length ? (
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg text-[#2E3856] font-bold dark:text-white'>
              Study Sets
            </h3>
            <Link
              to={`/search?query=${stringSearch}&type=sets}`}
              onClick={() => {
                window.location.href = `/search?query=${stringSearch}&type=sets`;
              }}
              className='font-semibold text-blue-700 dark:text-white'
            >
              View all
            </Link>
          </div>
          <ul className='flex flex-wrap gap-4'>
            {listSet.slice(0, 2).map((item, index) => (
              <CardSet item={item} key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {listClass.length ? (
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg text-[#2E3856] font-bold dark:text-white'>
              Classes
            </h3>
            <Link
              to={`/search?query=${stringSearch}&type=users}`}
              onClick={() => {
                window.location.href = `/search?query=${stringSearch}&type=classes`;
              }}
              className='font-semibold text-blue-700 dark:text-white'
            >
              View all
            </Link>
          </div>
          <ul className='flex flex-wrap gap-4'>
            {listClass.slice(0, 2).map((item, index) => (
              <CardClass item={item} key={index} />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
