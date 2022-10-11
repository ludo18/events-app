import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';
import { getError } from '@/lib/utils/error';
import Loading from '@/components/loading';
import {
  addDaysToCurrentDate,
  addHoursToDate,
  isOlderThan,
} from '@/lib/utils/functions';
import { TimezoneContext } from '@/contexts/timezone-context';

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    default:
      return state;
  }
}

function EventAddScreen() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { state, dispatch: dispatchToTimezoneContext } =
    useContext(TimezoneContext);
  const [{ loading, error, loadingCreate }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  function adjustDatetimesToSimulatedTimezone({
    startAt,
    endAt,
  }: {
    startAt: string;
    endAt: string;
  }) {
    const startAtDate = new Date(Date.parse(startAt));
    const adjustedStart = addHoursToDate(
      startAtDate,
      state.timezone.realOffset - state.timezone.currentOffset
    );
    const endAtDate = new Date(Date.parse(endAt));
    const adjustedEnd = addHoursToDate(
      endAtDate,
      state.timezone.realOffset - state.timezone.currentOffset
    );
    return { adjustedStart, adjustedEnd };
  }

  const submitHandler = async ({
    name,
    description,
    image,
    startAt,
    endAt,
  }) => {
    try {
      console.log(typeof startAt);
      //adjust dates to simulated timezone
      //(in the form, they are recorded as being on browser-detected timezone)
      const { adjustedStart, adjustedEnd } = adjustDatetimesToSimulatedTimezone(
        { startAt, endAt }
      );

      //send the request to create event
      dispatch({ type: 'CREATE_REQUEST' });
      const payload = {
        newEvent: {
          name,
          description,
          image,
          startAt: adjustedStart,
          endAt: adjustedEnd,
        },
      };
      const { data } = await axios.post('/api/events', payload, {
        headers: { 'content-type': 'application/json' },
      });
      if (data?.event?.id) {
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success(t('events.Event_created_successfully'));
        //TODO reactivate
        //router.push(`/events/${data.event.id}`);
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
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <form
          className="mx-auto max-w-screen-md "
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1>{t('events.Create_Event')}</h1>

          <div className="grid sm:grid-cols-3 sm:gap-2 md:gap-5 items-center">
            {/*name*/}
            <div className="sm:col-span-3 mb-4 w-full">
              <label htmlFor="name">{t('events.form.Name')}</label>
              <input
                type="text"
                maxLength={32}
                className="w-full"
                id="name"
                autoFocus
                {...register('name', {
                  required: t('events.form.Please_enter_name'),
                  maxLength: {
                    value: 32,
                    message: t('events.form.32_characters_max'),
                  },
                })}
              ></input>
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            {/*description*/}
            <div className="sm:col-span-2 row-span-2 mb-4 w-full">
              <label htmlFor="description">
                {t('events.form.Description')}
              </label>
              <textarea
                maxLength={2000}
                rows={5}
                className="w-full"
                id="description"
                {...register('description', {
                  required: t('events.form.Please_enter_description'),
                  maxLength: {
                    value: 2000,
                    message: t('events.form.2000_characters_max'),
                  },
                })}
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            {/*startAt*/}
            <div className="mb-4 w-full">
              <label htmlFor="startAt">{t('events.form.startAt')}</label>
              <input
                type="datetime-local"
                className="w-full"
                min={new Date().toDateString()}
                max={addDaysToCurrentDate(731).toDateString()}
                id="startAt"
                {...register('startAt', {
                  required: t('events.form.Please_enter_startAt'),
                  valueAsDate: true,
                })}
              />
              {errors.startAt && (
                <div className="text-red-500">{errors.startAt.message}</div>
              )}
            </div>

            {/*endAt*/}
            <div className="mb-4 w-full">
              <label htmlFor="endAt">{t('events.form.endAt')}</label>
              <input
                type="datetime-local"
                className="w-full"
                min={new Date().toDateString()}
                max={addDaysToCurrentDate(731).toDateString()}
                id="endAt"
                {...register('endAt', {
                  required: t('events.form.Please_enter_endAt'),
                  valueAsDate: true,
                  validate: {
                    olderThanStartDate: (v) =>
                      isOlderThan(v, getValues('startAt')) === true ||
                      t('events.form.End_date_should_be_older_than_start_date'),
                  },
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
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default EventAddScreen;
