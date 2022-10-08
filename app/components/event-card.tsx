import React, { FunctionComponent, useState } from 'react';
import { Event } from '@/lib/features/events/types';
import Image from 'next/image';

export const EventCard: FunctionComponent<Event> = ({
  id,
  name,
  description,
  image,
  startAt,
  endAt,
}) => {
  const [ratio, setRatio] = useState(16 / 9);
  const size = 600;

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
        <h2>{name}</h2>
      </div>
      <div>{description}</div>
      <div>
        <div>{startAt}</div>
        <div>{endAt}</div>
      </div>
    </div>
  );
};
