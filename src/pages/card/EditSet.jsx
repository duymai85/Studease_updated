import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { KEY_LS } from '../../utils/constant';
import { flashCardService } from '../../services';
import { cloudinary } from '../../config/cloudinary';

export const EditSet = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [setItem, setSetItem] = useState({});
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      list: [{ front: '', back: '', image: '' }],
      title: '',
      description: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list',
  });

  const onSubmit = async (data) => {
    const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));

    if (accessToken) {
      const dataSet = {
        ...setItem,
        name: data.title,
        description: data.description,
        data: data.list,
      };
      await flashCardService
        .updateSet(dataSet)
        .then(async (res) => {
          if (res.data) {
            toast.success('Update set successfully.');
            navigate(`/set/${res.data.id}`);
          }
        })
        .catch((error) => {
          toast.error('Update set failed.');
        });
    }
  };

  const handleImage = async (e) => {
    const index = e.target.getAttribute('data-id');
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', cloudinary.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', cloudinary.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append('folder', 'Cloudinary-React');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const res = await response.json();
      if (res.url) {
        setValue(`list.${index}.image`, res.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSetById = async () => {
    if (id) {
      setIsLoading(true);
      await flashCardService
        .getSetById(id)
        .then((res) => {
          if (res.data) {
            setSetItem(res.data);
            setValue('list', res.data.data);
            setValue('title', res.data.name);
            setValue('description', res.data.description);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getSetById();
  }, []);

  return isLoading ? (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <section className='w-[90%] m-auto dark:text-white'>
      <h2 className='font-bold text-xl text-[#2e3856] mb-8 dark:text-white'>
        Edit a study set
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 w-full lg:w-6/12'>
          <input
            type='text'
            id='title'
            className='bg-white border-b-2 border-black text-gray-900 focus:border-blue-800 block w-full py-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none dark:rounded-lg dark:p-2.5'
            placeholder='Enter a title'
            {...register('title', { required: true })}
          />
          <label
            htmlFor='title'
            className='block mt-2 text-sm font-bold uppercase text-[#939bb4] dark:text-white'
          >
            Title
          </label>
          {errors.title && (
            <span className='text-red-600 text-xs'>Title is required</span>
          )}
        </div>
        <div className='mb-12 w-full lg:w-6/12'>
          <input
            type='text'
            id='description'
            className='bg-white border-b-2 border-black text-gray-900 focus:border-blue-800 block w-full py-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none dark:rounded-lg dark:p-2.5'
            placeholder='Add a description'
            {...register('description')}
          />
          <label
            htmlFor='description'
            className='block mt-2 text-sm font-bold uppercase text-[#939bb4] dark:text-white'
          >
            Description
          </label>
        </div>
        {fields.map((field, index) => (
          <div
            className='bg-white rounded shadow py-4 mb-4 relative dark:bg-secondary-color dark:text-white'
            key={field.id}
          >
            <div className='px-8 pb-4 font-semibold border-b border-gray-300 flex items-center justify-between'>
              <h5 className='text-gray-500 dark:text-white'>{index + 1}</h5>
              <button
                onClick={() => remove(index)}
                disabled={index === 0}
                className='disabled:opacity-60'
              >
                <DeleteIcon></DeleteIcon>
              </button>
            </div>
            <div className='flex items-center justify-between px-8 py-4 gap-8'>
              <div className='w-full'>
                <input
                  placeholder='Enter term'
                  className='py-2 border-b-2 border-gray-800 focus:border-blue-800 focus:outline-none w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none dark:rounded-lg dark:p-2.5'
                  {...register(`list.${index}.front`, { required: true })}
                />
                <label className='block mt-2 text-xs font-bold uppercase text-[#939bb4] dark:text-white'>
                  Term
                </label>
                {errors.list && errors.list[index].front && (
                  <span className='text-red-600 text-xs'>Term is required</span>
                )}
              </div>
              <div className='w-full'>
                <input
                  className='py-2 border-b-2 border-gray-800 focus:border-blue-800 focus:outline-none w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:outline-none dark:rounded-lg dark:p-2.5'
                  placeholder='Enter definition'
                  {...register(`list.${index}.back`, { required: true })}
                />
                <label className='block mt-2 text-xs font-bold uppercase text-[#939bb4] dark:text-white'>
                  Definition
                </label>
                {errors.list && errors.list[index].back && (
                  <span className='text-red-600 text-xs'>
                    Definition is required
                  </span>
                )}
              </div>
              <div className='flex'>
                <label className='w-[84px] flex flex-col items-center bg-white text-blue rounded-lg tracking-wide uppercase border border-dashed cursor-pointer hover:border-yellow-300 py-1 dark:text-black'>
                  <CloudUploadIcon></CloudUploadIcon>
                  <span className='text-xs leading-normal'>Image</span>
                  <input
                    data-id={index}
                    type='file'
                    className='hidden'
                    onChange={handleImage}
                  />
                </label>
              </div>
            </div>
            {field.image && (
              <div className='w-[300px] object-cover m-auto shadow mb-4'>
                <img src={field.image} alt='' />
              </div>
            )}
            <div className='btn-box'>
              {fields.length - 1 === index && (
                <button
                  className='w-9 h-9 rounded-full bg-blue-800 flex justify-center items-center absolute left-[50%] translate-x-[-50%]'
                  onClick={() => append({ front: '', back: '', image: '' })}
                >
                  <AddIcon style={{ color: 'white' }}></AddIcon>
                </button>
              )}
            </div>
          </div>
        ))}
        <div className='w-full text-end mt-5'>
          <button className='bg-blue-800 text-white px-6 py-2 rounded-md text-lg mb-20 dark:bg-secondary-color'>
            Edit
          </button>
        </div>
      </form>
    </section>
  );
};
