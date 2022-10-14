import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import timezones from '@/lib/data/timezones.json';
import { TimezoneContext } from '@/contexts/timezone-context';
import { addHoursToCurrentDate } from '@/lib/utils/functions';

export default function TimezoneDropdown({ className }) {
  const { t } = useTranslation('common');
  const { state, dispatch } = useContext(TimezoneContext);

  useEffect(() => {
    toast.success(
      `${t('timezone.Simulated_local_time_is_now')}:\n${addHoursToCurrentDate(
        parseInt(state.timezone.currentOffset, 10) -
          parseInt(state.timezone.realOffset, 10)
      ).toLocaleString()}`,
      {
        toastId: 'success',
      }
    );
  }, [state?.timezone?.currentOffset]);

  const timezoneHandler = (e) => {
    dispatch({
      type: 'TIMEZONE_UPDATE',
      payload: { timezone: e.target.value },
    });
  };

  return (
    <div
      className={`flex flex-row flex-nowrap items-center justify-center gap-1 ${className}`}
    >
      <div>{t('timezone.Timezone')}</div>
      <select
        id="timezone-selector"
        className="w-full lg:w-2/3"
        value={state.timezone?.timezone}
        onChange={timezoneHandler}
      >
        <option value="null">{t('timezone.let_browser_detect')}</option>
        {timezones &&
          Object.keys(timezones).map((timezone) => (
            <option key={timezone} value={timezone}>
              {`[${timezones[timezone]?.GMT}] ${timezone}`}
            </option>
          ))}
      </select>
    </div>
  );
}
