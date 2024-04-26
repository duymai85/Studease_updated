import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

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
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SnoozeIcon from '@mui/icons-material/Snooze';

import { flashCardService } from '../services';
import { KEY_LS } from '../utils/constant';
import { checkUserLogin, parseJwt } from '../utils/index';

const ITEM_HEIGHT = 48;

export const Header = (props) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [listClass, setListClass] = useState([]);
  const [listSet, setListSet] = useState([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(null);
  const [listNotification, setListNotification] = useState({});
  const [userId, setUserId] = useState('');

  const open = Boolean(anchorEl);
  const openEl1 = Boolean(anchorEl1);
  const openEl2 = Boolean(anchorEl2);
  const openAdd = Boolean(anchorAdd);
  const openNotification = Boolean(anchorNotification);

  const handleClick = (event) => {
    const isLogged = checkUserLogin();

    if (isLogged) {
      setAnchorEl(event.currentTarget);
    } else {
      window.location.href = '/login';
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
  const handleClickNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorNotification(null);
  };

  const getListClass = async () => {
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (accessToken) {
      const userInfo = parseJwt(accessToken);
      await flashCardService
        .getClassByUserId(userInfo.sub)
        .then((res) => {
          if (res.data) {
            setListClass(res.data.classes);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getListSet = async () => {
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (accessToken) {
      const userInfo = parseJwt(accessToken);
      await flashCardService
        .getSetByUserId(userInfo.sub)
        .then((res) => {
          if (res.data) {
            setListSet(res.data.sets);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(KEY_LS.ACCESS_TOKEN);
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const dataLayer = window.dataLayer || [];
    dataLayer.push({'event': 'search'});
    window.location.href = `/search?query=${search}&type=all`;
  };

  const handleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (accessToken) {
      const userInfo = parseJwt(accessToken);
      setUserId(userInfo.sub);
    }
    getListClass();
    getListSet();
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const stringSearch = searchParams.get('query');
    if (stringSearch) {
      setSearch(stringSearch);
    } else {
      setSearch('');
    }
    const listNotification =
      JSON.parse(localStorage.getItem(KEY_LS.LIST_NOTIFICATION)) || [];
    setListNotification(listNotification);
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <div className='fixed h-16 bg-blue-800 top-0 right-0 left-0 flex items-center px-10 justify-between z-50 dark:bg-primary-color dark:border-b-[0.5px] dark:border-[#d9dde8]'>
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
              <button
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
              </button>
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
              <button
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
              </button>
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
                  value={search}
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
          <button
            aria-controls={openNotification ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openNotification ? 'true' : undefined}
            onClick={handleClickNotification}
            className='cursor-pointer'
          >
            <div className='bg-white rounded-full w-10 h-10 inline-flex justify-center items-center relative'>
              <NotificationsNoneIcon />
              {listNotification[userId] && listNotification[userId].length ? (
                <span className='absolute top-[6px] right-[7px] w-[14px] h-[14px] rounded-full inline-flex items-center justify-center text-[10px] font-semibold bg-red-700 text-white '>
                  {listNotification[userId].length}
                </span>
              ) : (
                <></>
              )}
            </div>
          </button>
          <Menu
            id='long-notification'
            anchorEl={anchorNotification}
            open={openNotification}
            onClose={handleCloseNotification}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                paddingLeft: '16px',
                paddingRight: '16px',
                // width: '40ch',
              },
            }}
          >
            {listNotification[userId] && listNotification[userId].length ? (
              listNotification[userId].map((item, index) => (
                <MenuItem
                  onClick={handleCloseNotification}
                  key={index}
                  sx={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <SnoozeIcon />
                    <p className='font-bold'>{item}</p>
                  </div>
                </MenuItem>
              ))
            ) : (
              <p className='text-center py-3'>No notification</p>
            )}
          </Menu>
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
                <MenuItem onClick={handleDarkMode}>
                  <DarkModeOutlinedIcon sx={{ marginRight: '4px' }} /> Dark mode
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
