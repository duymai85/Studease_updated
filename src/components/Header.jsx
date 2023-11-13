import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupIcon from '@mui/icons-material/Group';

import { flashCardService } from '../services';
import { KEY_LS } from '../utils/constant';
import { checkUserLogin } from '../utils/index';
import { requestForToken, onMessageListener } from '../config/firebase';

const ITEM_HEIGHT = 48;

export const Header = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [listClass, setListClass] = useState([]);
  const [listSet, setListSet] = useState([]);
  const [search, setSearch] = useState('');

  const open = Boolean(anchorEl);
  const openEl1 = Boolean(anchorEl1);
  const openEl2 = Boolean(anchorEl2);
  const openAdd = Boolean(anchorAdd);

  const handleClick = (event) => {
    const isLogged = checkUserLogin();

    if (isLogged) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login');
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickEl1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseEl1 = () => {
    setAnchorEl1(null);
  };
  const handleClickEl2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseEl2 = () => {
    setAnchorEl2(null);
  };
  const handleClickAdd = (event) => {
    setAnchorAdd(event.currentTarget);
  };
  const handleCloseAdd = () => {
    setAnchorAdd(null);
  };

  const getListClass = async () => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      await flashCardService
        .getClassByUserId(userInfo.id)
        .then((res) => {
          if (res.data.length) {
            setListClass(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getListSet = async () => {
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      await flashCardService
        .getSetByUserId(userInfo.id)
        .then((res) => {
          if (res.data.length) {
            setListSet(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(KEY_LS.USER_INFO);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  useEffect(() => {
    getListClass();
    getListSet();
  }, []);

  useEffect(() => {
    requestForToken();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => console.log('failed: ', err));
  }, []);

  return (
    <>
      <div className='fixed h-16 bg-blue-800 top-0 right-0 left-0 flex items-center px-10 justify-between z-50'>
        <div className='flex items-center justify-center'>
          <Link
            to='/home'
            className='text-xl font-semibold text-white font-mono d-block pl-2 pr-3'
          >
            StudEase
          </Link>
          <div className='flex items-center px-2'>
            <Link to='/about' className='text-base text-white font-medium mx-3'>
              About
            </Link>
            <div className='relative'>
              <div
                aria-controls={openEl1 ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openEl1 ? 'true' : undefined}
                onClick={handleClickEl1}
                className='text-white text-base inline-flex items-center mx-3 font-medium whitespace-nowrap cursor-pointer'
              >
                Your Sets
                <svg
                  className='w-2.5 h-2.5 ml-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </div>
              <Menu
                id='long-menu'
                anchorEl={anchorEl1}
                open={openEl1}
                onClose={handleCloseEl1}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {listSet.length ? (
                  listSet.map((item, index) => (
                    <MenuItem onClick={handleCloseEl1} key={index}>
                      <Link
                        to={`/set/${item.id}`}
                        onClick={() => {
                          window.location.href = `/set/${item.id}`;
                        }}
                        className='inline-block w-full'
                      >
                        <h4 className='font-semibold text-lg'>{item.name}</h4>
                        <p className='text-sm'>{item.data.length} Terms</p>
                      </Link>
                    </MenuItem>
                  ))
                ) : (
                  <p className='text-center py-3'>No data set</p>
                )}
              </Menu>
            </div>
            <div className='relative'>
              <div
                aria-controls={openEl2 ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openEl2 ? 'true' : undefined}
                onClick={handleClickEl2}
                className='text-white text-base inline-flex items-center mx-3 font-medium whitespace-nowrap cursor-pointer'
              >
                Your Class
                <svg
                  className='w-2.5 h-2.5 ml-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </div>
              <Menu
                id='long-menu-class'
                anchorEl={anchorEl2}
                open={openEl2}
                onClose={handleCloseEl2}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    minWidth: '20ch',
                  },
                }}
              >
                {listClass.length ? (
                  listClass.map((item, index) => (
                    <MenuItem onClick={handleCloseEl2} key={index}>
                      <Link
                        to={`/class/${item.id}`}
                        onClick={() => {
                          window.location.href = `/class/${item.id}`;
                        }}
                        className='inline-block w-full'
                      >
                        <h4 className='font-semibold text-lg'>{item.name}</h4>
                        <p className='text-sm'>{item.setIds.length} Sets</p>
                      </Link>
                    </MenuItem>
                  ))
                ) : (
                  <p className='text-center py-3'>No data class</p>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <div className='w-full px-6'>
          <div className='flex items-center'>
            <form className='w-11/12' onSubmit={handleSearch}>
              <label
                htmlFor='default-search'
                className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
              >
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Flash cards, quizzes, questions...'
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit' hidden='hidden'></button>
              </div>
            </form>
          </div>
        </div>
        <div className='flex items-center justify-center gap-5 px-2'>
          <div className='bg-white rounded-full w-10 h-10 inline-flex justify-center items-center'>
            <button
              className='bg-white rounded-full w-10 h-10 inline-flex justify-center items-center'
              onClick={handleClickAdd}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={openAdd ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openAdd ? 'true' : undefined}
            >
              <AddIcon />
            </button>
            {checkUserLogin() && (
              <Menu
                anchorEl={anchorAdd}
                id='account-menu'
                open={openAdd}
                onClose={handleCloseAdd}
                onClick={handleCloseAdd}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleCloseAdd}>
                  <Link className='flex items-center w-full' to='/create-set'>
                    <ListItemIcon>
                      <ContentCopyIcon fontSize='small' />
                    </ListItemIcon>
                    Study set
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAdd}>
                  <Link className='flex items-center w-full' to='/create-class'>
                    <ListItemIcon>
                      <GroupIcon fontSize='small' />
                    </ListItemIcon>
                    Class
                  </Link>
                </MenuItem>
              </Menu>
            )}
          </div>
          <div className='bg-white rounded-full w-10 h-10 inline-flex justify-center items-center'>
            <NotificationsNoneIcon />
          </div>
          <div className='relative'>
            <button
              className='bg-white rounded-full w-10 h-10 inline-flex justify-center items-center'
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <PersonIcon />
            </button>
            {checkUserLogin() && (
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    className='flex items-center justify-center'
                    to='/profile/me'
                  >
                    <Avatar /> Profile
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Link
                    className='flex items-center justify-center'
                    to='/settings'
                  >
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <button
                    className='flex items-center justify-center'
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </button>
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </>
  );
};