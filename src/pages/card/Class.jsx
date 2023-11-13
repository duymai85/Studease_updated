import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import SchoolIcon from '@mui/icons-material/School';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

import { KEY_LS } from '../../utils/constant';
import { flashCardService } from '../../services';

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

export const Class = () => {
  const [classes, setClasses] = useState({});
  const [listSet, setListSet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log('failed to copy', err.mesage);
      }
    );
  };

  const btnStyle = copied ? 'bg-blue-700 text-white' : '';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getListSet = async (sets) => {
    const result = [];
    if (sets.length) {
      for (const item of sets) {
        await flashCardService
          .getSetById(item)
          .then((res) => {
            if (res.data) {
              result.push(res.data);
            }
          })
          .catch((error) => {});
      }
    }
    return result;
  };

  const getClassById = async () => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setIsLoading(true);
      await flashCardService
        .getClassById(id)
        .then(async (res) => {
          if (res.data.length) {
            const sets = await getListSet(res.data[0].setIds || []);
            setClasses(res.data[0]);
            setListSet(sets);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getClassById();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <section className='w-10/12 m-auto pt-4 text-[#2E3856]'>
      <h2 className='font-bold text-[38px]'>
        <GroupIcon
          className='mr-2'
          fontSize='large'
          sx={{ color: '#939bb4' }}
        ></GroupIcon>
        {classes.name || ''}
      </h2>
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-[#d9dde8]'>
          <Link to={`/create-set?inClass=${classes.id}`}>
            <AddIcon sx={{ color: '#586380' }}></AddIcon>
          </Link>
        </div>
        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-[#d9dde8]'>
          <PersonAddAltIcon sx={{ color: '#586380' }}></PersonAddAltIcon>
        </div>
        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-[#d9dde8]'>
          <FolderOpenIcon sx={{ color: '#586380' }}></FolderOpenIcon>
        </div>
        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-[#d9dde8]'>
          <MoreHorizIcon sx={{ color: '#586380' }}></MoreHorizIcon>
        </div>
      </div>
      <Box sx={{ width: '100%', marginTop: '40px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Sets' {...a11yProps(0)} sx={{ fontWeight: '600' }} />
            <Tab label='Members' {...a11yProps(1)} sx={{ fontWeight: '600' }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className='flex flex-col lg:flex-row gap-10'>
            {listSet.length ? (
              <ul className='mt-4 lg:w-9/12 w-full'>
                {listSet.map((item, index) => (
                  <li
                    className='rounded border border-[#eaeaea] px-4 py-3 mb-3 hover:shadow-md'
                    key={index}
                  >
                    <Link to={`/set/${item.id}`}>
                      <div className='flex items-center gap-4 font-medium'>
                        <p>{item.data.length || 0} Terms</p>
                        <span className='text-[#939bb4]'>|</span>
                        <p className='text-[#939bb4]'>{classes.name || ''}</p>
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
              <div className='flex items-center justify-center lg:w-9/12 w-full mt-4'>
                No data available
              </div>
            )}
            <div className='lg:w-3/12 w-full mt-4'>
              <div>
                <h4 className='uppercase text-sm tracking-wide font-medium mb-2'>
                  Invitation link
                </h4>
                <div className='flex items-center'>
                  <input
                    type='text'
                    value={window.location.href}
                    className='w-full border-2 border-[#2e3856] rounded px-4 py-2 cursor-auto mr-2'
                    disabled
                  />
                  <button
                    onClick={copyToClipboard}
                    className={
                      btnStyle +
                      ' text-sm border w-36 border-gray-500 rounded p-2 transition'
                    }
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className='mt-4'>
                <h4 className='uppercase text-sm tracking-wide font-medium mb-2'>
                  Class details
                </h4>
                <ul>
                  <li className='flex items-center mb-3 text-sm'>
                    <SchoolIcon sx={{ marginRight: '12px' }}></SchoolIcon>
                    {classes.school}
                  </li>
                  <li className='flex items-center mb-3 text-sm'>
                    <ContentCopyIcon
                      sx={{ marginRight: '12px' }}
                    ></ContentCopyIcon>
                    {classes.school} set
                  </li>
                  <li className='flex items-center mb-3 text-sm'>
                    <CardMembershipIcon
                      sx={{ marginRight: '12px' }}
                    ></CardMembershipIcon>
                    0 member
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='flex flex-col lg:flex-row gap-10'>
            <div className='flex items-center justify-center mt-4 lg:w-9/12 w-full'>
              No data members
            </div>
            <div className='lg:w-3/12 w-full mt-4'>
              <div>
                <h4 className='uppercase text-sm tracking-wide font-medium mb-2'>
                  Invitation link
                </h4>
                <div className='flex items-center'>
                  <input
                    type='text'
                    value={window.location.href}
                    className='w-full border-2 border-[#2e3856] rounded px-4 py-2 cursor-auto mr-2'
                    disabled
                  />
                  <button
                    onClick={copyToClipboard}
                    className={
                      btnStyle +
                      ' text-sm border w-36 border-gray-500 rounded p-2 transition'
                    }
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className='mt-4'>
                <h4 className='uppercase text-sm tracking-wide font-medium mb-2'>
                  Class details
                </h4>
                <ul>
                  <li className='flex items-center mb-3 text-sm'>
                    <SchoolIcon sx={{ marginRight: '12px' }}></SchoolIcon>
                    {classes.school}
                  </li>
                  <li className='flex items-center mb-3 text-sm'>
                    <ContentCopyIcon
                      sx={{ marginRight: '12px' }}
                    ></ContentCopyIcon>
                    {classes.school} set
                  </li>
                  <li className='flex items-center mb-3 text-sm'>
                    <CardMembershipIcon
                      sx={{ marginRight: '12px' }}
                    ></CardMembershipIcon>
                    0 member
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </section>
  );
};
