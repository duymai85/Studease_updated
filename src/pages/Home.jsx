import { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { DayPicker, Row } from 'react-day-picker';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { KEY_LS } from '../utils/constant';
import { flashCardService, userService } from '../services';

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
    const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
    if (userInfo) {
      setIsLoading(true);
      await flashCardService
        .getAllSet()
        .then(async (res) => {
          if (res.data) {
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
    }
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
      <div className='flex justify-between'>
        <div className='w-2/5 bg-green-200 text-black flex rounded-full py-2'>
          <div className='font-bold h-full flex items-center px-3'>
            <AddIcon />
          </div>
          <Link to='/create-set'>
            <h1 className='font-bold text-xl'>Create flashcards</h1>
            <p>Create & customize your own flashcards</p>
          </Link>
        </div>
        <div className='w-2/5 bg-pink-300 text-black flex rounded-full py-2'>
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
          <h2>Achievement</h2>
        </div>
        <div className='rounded-lg bg-blue-300 py-10 px-10'>
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
            <ul className='flex items-center gap-4 justify-between flex-wrap lg:flex-row flex-col'>
              {listSet.slice(0, 5).map((item, index) => (
                <li
                  key={index}
                  className='p-4 border shadow border-gray-300 rounded-xl lg:w-[32%] w-full'
                >
                  <Link to={`/set/${item.id}`} className='w-full'>
                    <h4 className='font-medium'>{item.name}</h4>
                    <div className='bg-gray-200 rounded-3xl inline-flex items-center justify-center text-[10px] pt-1 px-2 font-medium'>
                      <span>{item.data ? item.data.length : 0} Terms</span>
                    </div>
                    <div className='flex items-center gap-1 mt-12'>
                      <img
                        src='https://picsum.photos/300/300'
                        alt='Avatar'
                        className='w-6 h-6 rounded-full mr-2'
                      />
                      <h5 className='font-medium text-xs'>
                        {item.userName || ''}
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
