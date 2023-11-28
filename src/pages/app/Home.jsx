import { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { DayPicker, Row } from 'react-day-picker';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { KEY_LS, AVATAR_EMPTY } from '../../utils/constant';
import { flashCardService } from '../../services';
import { CircleProgressWithLabel } from '../../components';
import { checkUserLogin, parseJwt } from '../../utils';

const listDay = JSON.parse(localStorage.getItem(KEY_LS.DATE_LOGIN)) || [];
const bookedDays = listDay.map((item) => {
  const date = new Date(item);
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
});

export const Home = (props) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [listSet, setListSet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listProgress, setListProgress] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const isPastDate = (date) => {
    return (
      differenceInCalendarDays(date, new Date()) < -2 ||
      differenceInCalendarDays(date, new Date()) > 4
    );
  };

  const OnlyFutureRow = (props) => {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  };

  const getListSet = async () => {
    setIsLoading(true);
    await flashCardService
      .getAllSet()
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
    getListSet();
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (accessToken) {
      const userInfo = parseJwt(accessToken);
      setUserInfo(userInfo);
    }
    const listProgress = JSON.parse(localStorage.getItem(KEY_LS.LIST_PROGRESS));
    if (listProgress) {
      setListProgress(listProgress);
    }
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <div className='flex justify-between lg:flex-row flex-col lg:gap-20 gap-4'>
        <div className='w-full bg-green-200 text-black flex rounded-full py-2 items-center lg:justify-center'>
          <div className='font-bold h-full flex items-center px-3'>
            <AddIcon />
          </div>
          <Link to='/create-set'>
            <h1 className='font-bold text-xl'>Create flashcards</h1>
            <p>Create & customize your own flashcards</p>
          </Link>
        </div>
        <div className='w-full bg-pink-300 text-black flex rounded-full py-2 items-center lg:justify-center'>
          <div className='font-bold h-full flex items-center px-3'>
            <SaveIcon />
          </div>
          <Link to='/create-class'>
            <h1 className='font-bold text-xl'>Create classes</h1>
            <p>Create & customize your own classes</p>
          </Link>
        </div>
      </div>
      <div className='mb-8'>
        <div className='font-bold text-2xl mt-5 mb-2'>
          <h2 className='dark:text-white'>Achievement</h2>
        </div>
        <div className='rounded-lg bg-blue-300 py-10 px-10 dark:bg-secondary-color dark:text-white'>
          <div className='flex items-center flex-col lg:flex-row gap-10'>
            <div className='w-full lg:w-6/12 flex justify-start items-center lg:justify-end'>
              <div>
                <h1 className='font-bold text-xl'>
                  {bookedDays.length || 0}-day streak
                </h1>
                <p className=''>Study tomorrow to get the streak going!</p>
              </div>
            </div>
            <div className='w-full lg:w-6/12 flex justify-start'>
              <DayPicker
                mode='single'
                required
                selected={selectedDay}
                onSelect={setSelectedDay}
                components={{ Row: OnlyFutureRow }}
                hidden={isPastDate}
                disableNavigation
                modifiers={{ booked: bookedDays }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='pb-20'>
        <div className='mt-5'>
          <h2 className='text-2xl font-bold mb-4'>Recent</h2>
          {listSet.length && (
            <ul className='flex items-center gap-4 flex-wrap lg:flex-row flex-col'>
              {listSet.slice(0, 6).map((item, index) => (
                <li
                  key={index}
                  className='p-4 border shadow border-gray-300 rounded-xl lg:w-[32%] w-full dark:bg-secondary-color dark:text-white dark:border-none'
                >
                  <Link to={`/set/${item.id}`} className='w-full block'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>{item.name}</h4>
                        <div className='bg-gray-200 rounded-3xl inline-flex items-center justify-center text-[10px] py-1 px-2 font-medium dark:bg-white dark:text-black'>
                          <span>{item.data ? item.data.length : 0} Terms</span>
                        </div>
                      </div>
                      {checkUserLogin() && listProgress[userInfo.sub] && (
                        <div className='dark:text-white'>
                          <CircleProgressWithLabel
                            value={listProgress[userInfo.sub][item.id] || 0}
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex items-center gap-1 mt-12'>
                      <img
                        src={item?.user?.photo || AVATAR_EMPTY}
                        alt='Avatar'
                        className='w-6 h-6 rounded-full mr-2'
                        onError={(e) => {
                          e.target['onerror'] = null;
                          e.target['src'] = AVATAR_EMPTY;
                        }}
                      />
                      <h5 className='font-medium text-xs'>
                        {item?.user?.name || ''}
                      </h5>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
