import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UpdateProfile from './partials/UpdateProfile';

import { userService } from '../../services';
import AccountSetting from './partials/AccountSetting';

export const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dataTabs = [
    {
      title: 'Public profile',
      content: <UpdateProfile userInfo={userInfo} setUserInfo={setUserInfo} />,
    },
    {
      title: 'Account settings',
      content: <AccountSetting />,
    },
  ];
  const [visibleTab, setVisibleTab] = useState(dataTabs[0].title);

  const getUserInfo = async () => {
    setIsLoading(true);
    await userService
      .getUserById('me')
      .then((res) => {
        if (res.data) {
          setUserInfo(res.data.user);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <div className='bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-12 md:flex-row text-[#161931] dark:bg-primary-color dark:text-white'>
      <aside className='hidden py-4 md:w-1/3 lg:w-1/4 md:block'>
        <div className='sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12'>
          <h2 className='pl-3 mb-4 text-2xl font-semibold'>Settings</h2>
          <ul>
            {dataTabs.map((item, index) => (
              <li
                className={
                  visibleTab === item.title
                    ? 'flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full cursor-pointer mb-2'
                    : 'flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full cursor-pointer mb-2'
                }
                key={index}
                onClick={() => setVisibleTab(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className='w-full min-h-screen py-1 md:w-2/3 lg:w-3/4'>
        {dataTabs.map((item) => visibleTab === item.title && item.content)}
      </main>
    </div>
  );
};
