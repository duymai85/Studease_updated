import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import CircularProgress from '@mui/material/CircularProgress';

import { flashCardService } from '../../services';
import { KEY_LS } from '../../utils/constant';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Profile = () => {
  const [value, setValue] = useState(0);
  const [listClass, setListClass] = useState([]);
  const [listSet, setListSet] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getListClass = async () => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setIsLoading(true);
      await flashCardService
        .getClassByUserId(userInfo.id)
        .then((res) => {
          if (res.data.length) {
            setListClass(res.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const getListSet = async () => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setIsLoading(true);
      await flashCardService
        .getSetByUserId(userInfo.id)
        .then((res) => {
          if (res.data.length) {
            setListSet(res.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setUserInfo(userInfo);
    }
    getListClass();
    getListSet();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <section className='pt-4'>
      <div className='flex items-center px-12'>
        <div className='flex items-center justify-center'>
          <img
            src='https://picsum.photos/300/300'
            className='w-16 h-16 object-cover rounded-full'
            alt='Avatar'
          />
        </div>
        <div className='ml-6 text-black'>
          <h3 className='font-bold text-lg'>{userInfo.username}</h3>
          <p className='font-medium'>{userInfo.name}</p>
        </div>
      </div>
      <Box sx={{ width: '100%' }} className='mt-12 pl-12 pr-60'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Sets' {...a11yProps(0)} sx={{ fontWeight: '600' }} />
            <Tab label='Classes' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {listSet.length ? (
            <ul className='mt-4'>
              {listSet.map((item, index) => (
                <li
                  className='rounded border border-[#eaeaea] px-4 py-3 mb-3 hover:shadow-md'
                  key={index}
                >
                  <Link to={`/set/${item.id}`}>
                    <div className='flex items-center gap-4 font-medium'>
                      <p>{item.data ? item.data.length : 0} Term</p>
                      <span className='text-[#939bb4]'>|</span>
                      <p className='text-[#939bb4]'>{item.description || ''}</p>
                    </div>
                    <h4 className='font-bold text-xl'>
                      <GroupIcon className='mr-2'></GroupIcon>
                      {item.name}
                    </h4>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex items-center justify-center'>
              No data avaliable
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {listClass.length ? (
            <ul className='mt-4'>
              {listClass.map((item, index) => (
                <li
                  className='rounded border border-[#eaeaea] px-4 py-3 mb-3 hover:shadow-md'
                  key={index}
                >
                  <Link to={`/class/${item.id}`}>
                    <div className='flex items-center gap-4 font-medium'>
                      <p>{item.setIds.length || 0} Sets</p>
                      <span className='text-[#939bb4]'>|</span>
                      <p className='text-[#939bb4]'>{item.school}</p>
                    </div>
                    <h4 className='font-bold text-xl'>
                      <GroupIcon className='mr-2'></GroupIcon>
                      {item.name}
                    </h4>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex items-center justify-center mt-8'>
              No data available
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </section>
  );
};
