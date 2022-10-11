import React, { FunctionComponent, useState } from 'react';
import { CustomEvent } from '@/lib/features/events/types';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import TimezoneDatetime from './timezone-datetime';

export const EventCard: FunctionComponent<CustomEvent> = ({
  id,
  name,
  description,
  image,
  startAt,
  endAt,
}: CustomEvent) => {
  const { t } = useTranslation('common');
  const [ratio, setRatio] = useState(16 / 9);
  const size = 600;

  function generateTooltip(strDate: string): string {
    return `GMT:\t${new Date(
      Date.parse(strDate)
    ).toUTCString()}\nBrowser:\t${new Date(
      Date.parse(strDate)
    ).toLocaleString()}`;
  }

  return (
    <div className="border-4 border-slate-400 rounded-2xl p-2 flex flex-col justify-between gap-10">
      <div>
        <Image
          className="rounded-2xl shadow-xl"
          src={
            image ? `/images/events/${image}` : '/images/default/default.jpg'
          }
          alt={name}
          width={size}
          height={size / ratio}
          layout="intrinsic"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setRatio(naturalWidth / naturalHeight);
          }}
        />
        {/* from / to */}
        <div className="flex flex-col gap-1 mb-4">
          <div title={generateTooltip(startAt)}>
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="whitespace-nowrap">{t('events.startsAt')}</div>
              <TimezoneDatetime datetime={new Date(Date.parse(startAt))} />
            </div>
          </div>
          <div title={generateTooltip(endAt)}>
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="whitespace-nowrap">{t('events.endsAt')}</div>
              <TimezoneDatetime datetime={new Date(Date.parse(endAt))} />
            </div>
          </div>
        </div>
        <h2 className="mb-4">{name}</h2>
      </div>
      <div>{description}</div>
    </div>
  );
};
