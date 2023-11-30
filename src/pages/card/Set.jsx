import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';

import { flashCardService } from '../../services';
import { Cards } from '../../components/Cards';
import { AVATAR_EMPTY, KEY_LS } from '../../utils/constant';
import { parseJwt } from '../../utils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const Set = () => {
  const [set, setSet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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

  const getSetById = async () => {
    if (id) {
      setIsLoading(true);
      await flashCardService
        .getSetById(id)
        .then((res) => {
          if (res.data) {
            setSet(res.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const accesToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
    if (userInfo) {
      const user = parseJwt(accesToken);
      setUserInfo(user);
    }
    getSetById();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <section className='lg:w-[70%] w-full m-auto px-5 pb-40 dark:text-white'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold mb-2'>{set.name || ''}</h2>
        <span className='text-gray-700 font-semibold dark:text-white'>
          {set.data && (set.data.length || 0)} Terms
        </span>
      </div>
      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='w-full lg:w-9/12'>
          <Cards listTerm={set.data} id={id} />
          <div className='flex items-center pt-8 justify-between'>
            <div className='flex items-center'>
              <div>
                <img
                  src={set?.user?.photo || AVATAR_EMPTY}
                  alt='Avatar'
                  className='w-12 h-12 rounded-full mr-2'
                  onError={(e) => {
                    e.target['onerror'] = null;
                    e.target['src'] = AVATAR_EMPTY;
                  }}
                />
              </div>
              <div>
                <span className='text-xs text-gray-500 dark:text-white'>
                  Created by
                </span>
                <h5 className='font-bold'>{set?.user?.name || ''}</h5>
              </div>
            </div>
            <div>
              <button
                className='flex items-center py-2 px-4 border-2 border-gray-300 rounded-md text-sm font-semibold text-gray-600 dark:text-white dark:bg-secondary-color'
                onClick={handleClickOpen}
              >
                <IosShareIcon style={{ marginRight: '8px' }} />
                Share
              </button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
              >
                <DialogTitle
                  sx={{ m: 0, p: 2 }}
                  id='customized-dialog-title'
                  className='dark:bg-primary-color dark:text-white'
                >
                  Share this set
                </DialogTitle>
                <IconButton
                  aria-label='close'
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent className='dark:bg-primary-color dark:text-white'>
                  <div className='flex items-center mb-6'>
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
                  <FacebookShareButton
                    url={window.location.href}
                    style={{
                      marginBottom: '24px',
                      maxWidth: '500px',
                      width: '100%',
                    }}
                  >
                    <button className='flex items-center justify-center w-full border-2 border-gray-300 rounded-md py-4 px-8'>
                      <FacebookIcon size={32} style={{ marginRight: '12px' }} />
                      Share on Facebook
                    </button>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    style={{
                      marginBottom: '24px',
                      maxWidth: '500px',
                      width: '100%',
                    }}
                  >
                    <button className='flex items-center justify-center w-full border-2 border-gray-300 rounded-md py-4 px-8'>
                      <TwitterIcon size={32} style={{ marginRight: '12px' }} />
                      Share on Twitter
                    </button>
                  </TwitterShareButton>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </div>
          {set.data && set.data.length && (
            <div className='mt-12'>
              <h4 className='font-semibold text-lg'>
                Terms in this set ({set.data && (set.data.length || 0)})
              </h4>
              <span className='text-sm text-gray-700 dark:text-white'>
                You've begun learning these terms. Keep up the good work!
              </span>
              <ul>
                {set.data.map((item, index) => (
                  <li className='mt-4 dark:bg-secondary-color' key={index}>
                    <div className='flex items-center shadow p-4 justify-between'>
                      <p className='text-gray-700 text-sm dark:text-white'>
                        {item.front || ''}
                      </p>
                      <span className='text-gray-300'>|</span>
                      <p className=''>{item.back || ''}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {set?.user?.id === userInfo.sub ? (
            <div className='flex items-center justify-center mt-12'>
              <Link
                to={`/set/edit/${id}`}
                className='py-4 px-8 bg-blue-700 text-white rounded-md font-bold dark:bg-secondary-color'
              >
                Add or Remove Terms
              </Link>
            </div>
          ) : null}
        </div>
        <div className='w-3/12 mt-3'>
          {/* <img
            className='w-full h-auto object-cover'
            src='https://innhanhpro.com/images/upload/images/43bdbda7edc4a569cdc0e33775bf5fd4.jpg'
            alt='banner'
          /> */}
        </div>
      </div>
    </section>
  );
};
