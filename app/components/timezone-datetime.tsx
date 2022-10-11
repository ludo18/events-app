import { TimezoneContext } from '@/contexts/timezone-context';
import { addHoursToDate } from '@/lib/utils/functions';
import React, { useContext } from 'react';

export default function TimezoneDatetime({ datetime }) {
  const { state, dispatch } = useContext(TimezoneContext);

  const adjustedDatetime = addHoursToDate(
    datetime,
    parseInt(state.timezone.currentOffset, 10) -
      parseInt(state.timezone.realOffset, 10)
  );
  return (
    <div className="whitespace-nowrap">
      {adjustedDatetime.toLocaleDateString() +
        ' ' +
        adjustedDatetime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
    </div>
  );
}
