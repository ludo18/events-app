import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '@/components/layout';
import { getError } from '@/lib/utils/error';
import Loading from '@/components/loading';
import { config } from '@/config';
import { addDaysToCurrentDate } from '@/lib/utils/functions';
//import ProductImage from '@/components/ProductImage';
//import { PRODUCT_IMAGES_FOLDER } from '@/const';

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DESTROY_REQUEST':
      return {
        ...state,
        loadingUpload: true,
        //loadingImageIndex: action.payload,
        error: '',
      };
    case 'DESTROY_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        error: '',
        //loadingImageIndex: undefined,
      };
    case 'DESTROY_FAIL':
      return {
        ...state,
        loadingUpload: false,
        error: action.payload,
        //loadingImageIndex: undefined,
      };

    case 'UPLOAD_REQUEST':
      return {
        ...state,
        loadingUpload: true,
        loadingImageIndex: action.payload,
        error: '',
      };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        error: '',
        loadingImageIndex: undefined,
      };
    case 'UPLOAD_FAIL':
      return {
        ...state,
        loadingUpload: false,
        error: action.payload,
        loadingImageIndex: undefined,
      };

    default:
      return state;
  }
}

function EventAddScreen() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [
    { loading, error, loadingCreate, loadingUpload, loadingImageIndex },
    dispatch,
  ] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  //const [stateImages, setStateImages] = useState([]);
  //const [visualArrayOfImages, setVisualArrayOfImages] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('startAt', data.startAt);
        setValue('endAt', data.endAt);
        setStateImages(data.image); //setValue('image', data.image);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [eventId, setValue]);

  useEffect(() => {
    //console.log('Setting `images` to state:', stateImages);
    setValue('image', stateImages);
    setVisualArrayOfImages([
      ...Array(
        Math.min(stateImages.length + 1, config.MAX_NB_OF_IMAGES_PER_PRODUCT)
      ).keys(),
    ]);
  }, [stateImages.length, JSON.stringify(stateImages)]);
*/
  /*
  const removeImageFromCloudStorage = async (urlToRemove) => {
    try {
      if (!urlToRemove) return;

      dispatch({ type: 'DESTROY_REQUEST' });
      //find Cloudinary public id
      let start = urlToRemove.lastIndexOf('/');
      if (start === -1) start = 0;
      else start += 1;
      const tmpSubstr = urlToRemove.substring(start);
      const publicId = tmpSubstr.split('.')?.[0];
      if (!publicId || publicId === '') return;
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;
      const invalidate = true;
      const {
        data: { signature, timestamp },
      } = await axios.post('/api/admin/cloudinary-sign', {
        public_id: publicId,
        invalidate,
      });

      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append('resource_type', 'image');
      formData.append('access_type', 'token');
      formData.append('invalidate', invalidate);
      //note: 'folder' does not have to be specified, to destroy an asset. Just the public_id
      const { data } = await axios.post(url, formData);

      dispatch({ type: 'DESTROY_SUCCESS' });
      toast.success(t('product.Old_file_destroyed_successfully'));
    } catch (error) {
      dispatch({ type: 'DESTROY_FAIL', payload: getError(error) });
      toast.error(getError(error));
    }
  };

  const handleRemoveImage = async (e, index) => {
    //console.log('handleRemoveImage', index);
    e.preventDefault();

    if (!window.confirm(t('Are_you_sure'))) {
      return;
    }

    const tmpImages = stateImages;
    //console.log('tmpImages before', tmpImages);
    const urlToRemove = tmpImages[1];
    tmpImages.splice(index, 1);
    //console.log('tmpImages after', tmpImages);
    setStateImages(tmpImages);
    setValue('images', tmpImages);
    setVisualArrayOfImages([
      ...Array(
        Math.min(tmpImages.length + 1, config.MAX_NB_OF_IMAGES_PER_PRODUCT)
      ).keys(),
    ]);
    await removeImageFromCloudStorage(urlToRemove);
  };

  const uploadHandler = async (e, index) => {
    e.preventDefault();
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      //#region  validation
      if (!e.target.files || e.target.files.length === 0) {
        toast.error(t('product.No_file_to_upload'));
      }

      //first, check if an image already stands at this index. If yes, then destroy the image from Cloudinary
      if (!!stateImages[index]) {
        //console.log('an image will be replaced:', stateImages[index]);
        await removeImageFromCloudStorage(stateImages[index]);
      }

      //then, check if we can add a new image (or if the limit MAX_NB_OF_IMAGES_PER_PRODUCT is reached)
      if (
        !stateImages[index] &&
        stateImages?.length >= config.MAX_NB_OF_IMAGES_PER_PRODUCT
      ) {
        return toast.error(t('product.You_cannot_add_more_images'));
      }
      //#endregion

      //finally, we can upload the new file.
      const file = e.target.files[0];

      dispatch({ type: 'UPLOAD_REQUEST', payload: index });

      const folder = `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/${PRODUCT_IMAGES_FOLDER}`;
      const {
        data: { signature, timestamp },
      } = await axios.post('/api/admin/cloudinary-sign', {
        folder,
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append('resource_type', 'image');
      formData.append('access_type', 'token');
      formData.append('folder', folder);
      console.log(formData);
      const { data } = await axios.post(url, formData);

      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success(t('product.File_uploaded_successfully'));

      let tmpImages = stateImages;
      if (tmpImages?.[index]) {
        tmpImages[index] = data.secure_url;
      } else {
        tmpImages.push(data.secure_url);
      }
      setStateImages(tmpImages);
    } catch (error) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(error) });
      toast.error(getError(error));
    }
  };
*/
  const submitHandler = async ({
    name,
    description,
    image,
    startAt,
    endAt,
  }) => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post('/api/events', {
        name,
        description,
        image,
        startAt,
        endAt,
      });
      if (data?.event?.id) {
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success(t('events.Event_created_successfully'));
        router.push(`/events/${data.id}`);
      } else {
        dispatch({ type: 'CREATE_FAIL' });
        toast.error(getError(data?.message || t('UNEXPECTED_ERROR'))); //TODO: REWRITE
      }
    } catch (error) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(error));
    }
  };

  return (
    <Layout
      title={`${t('events.Create_Event')}`}
      showFooter={true}
      showHeader={true}
    >
      <div className="md:col-span-3">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">{t('events.Create_Event')}</h1>

            <div className="flex flex-row flex-wrap justify-start items-center gap-2">
              <div className="mb-4 w-72">
                <label htmlFor="name">{t('events.form.Name')}</label>
                <input
                  type="text"
                  maxLength={32}
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: t('events.form.Please_enter_name'),
                  })}
                ></input>
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4 w-48">
                <label htmlFor="slug">{t('events.form.Description')}</label>
                <input
                  type="text"
                  maxLength={1000}
                  className="w-full"
                  id="description"
                  {...register('description', {
                    required: t('events.form.Please_enter_description'),
                  })}
                ></input>
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>

              {/**
              <div className="mb-4 w-full">
                <input
                  hidden={true}
                  type="text"
                  className="w-full"
                  id="images"
                  {...register('images', {
                    required: t('events.form.Please_enter_image'),
                  })}
                ></input>
                {errors.images && (
                  <div className="text-red-500">{errors.images.message}</div>
                )}

                <label htmlFor="imageFile">
                  {t('events.form.Upload_image')}{' '}
                  {`(${stateImages?.length || 0}/${
                    config.MAX_NB_OF_IMAGES_PER_PRODUCT
                  })`}
                </label>
                <ol className="flex flex-row flex-wrap justify-start items-center">
                  {visualArrayOfImages.map((x) => (
                    <li
                      className="eventsImageGroup mr-2 mb-2 hover:shadow-2xl"
                      key={x}
                    >
                      <div className="absolute z-20 opacity-0 hover:opacity-100 bottom-0 right-0 top-0 left-0">
                        <button
                          title={t('events.Remove_Image')}
                          hidden={!stateImages[x]}
                          className="absolute z-10 top-1 right-1"
                          onClick={(e) => handleRemoveImage(e, x)}
                        >
                          <XCircleIcon className="h-7 w-7 glow rounded-3xl  bg-amber-400" />
                        </button>
                        <input
                          title=""
                          className="eventsImageInput text-transparent"
                          aria-label={t('events.picture')}
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          id="imageFile"
                          onChange={(e) => uploadHandler(e, x)}
                        />
                      </div>
                      <ProductImage
                        size={120}
                        slug={getValues('id')}
                        url={
                          stateImages[x] ||
                          '/images/default/default-event-image.jpg'
                        }
                        loading={
                          !!(loadingImageIndex && loadingImageIndex === x)
                        }
                      />
                    </li>
                  ))}
                </ol>
                
                {errors.imageFile && (
                  <div className="text-red-500">{errors.imageFile.message}</div>
                )}
              </div>
 */}

              <div className="mb-4 w-full">
                <label htmlFor="startAt">{t('events.form.startAt')}</label>
                <input
                  type="date"
                  className="w-full"
                  value={new Date().toDateString()}
                  min={new Date().toDateString()}
                  max={addDaysToCurrentDate(731).toDateString()}
                  id="startAt"
                  {...register('startAt', {
                    required: t('events.form.Please_enter_startAt'),
                  })}
                />
                {errors.startAt && (
                  <div className="text-red-500">{errors.startAt.message}</div>
                )}
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="endAt">{t('events.form.endAt')}</label>
                <input
                  type="date"
                  className="w-full"
                  value={new Date().toLocaleDateString()}
                  min={new Date().toDateString()}
                  max={addDaysToCurrentDate(731).toDateString()}
                  id="endAt"
                  {...register('endAt', {
                    required: t('events.form.Please_enter_endAt'),
                  })}
                />
                {errors.endAt && (
                  <div className="text-red-500">{errors.endAt.message}</div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <button disabled={loadingCreate} className="primary-button">
                {loadingCreate ? t('loading') : t('Create')}
              </button>
            </div>

            <div className="mb-4">
              <Link href="/events">{t('Back')}</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

/** getStaticPaths does mainly two things:
  - Indicate which paths should be created on build time (returning a paths array)
  - Indicate what to do when a certain page eg: "product/myProduct123" doesn't exist in the NextJS Cache (returning a fallback type) 

  This will avoid 'Error: getStaticPaths is required for dynamic SSG pages and is missing for "xxx". NextJS'
*/
// export const getStaticPaths = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: 'blocking', //indicates the type of fallback
//   };
// };

export default EventAddScreen;
