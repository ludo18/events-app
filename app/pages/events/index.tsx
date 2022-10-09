import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';
import { getEvents } from '@/lib/features/events/queries';
import { EventCard } from '@/components/event-card';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { sortDescEvents } from '@/lib/utils/functions';

export default function Events({ events }) {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('events.Events')} showHeader={true} showFooter={true}>
      <div>
        <div className="flex flex-row items-center justify-evenly flex-wrap mb-1">
          <h1>{t('events.Events')}</h1>
          <Link href="/events/add">
            <a className="minimalistic-button">
              <PlusCircleIcon className="h-8 w-8 sm:h-12 sm:w-12" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              startAt={event.startAt}
              endAt={event.endAt}
              image={event.image}
            ></EventCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const events = await getEvents();
  events.sort(sortDescEvents);

  return {
    props: { events, ...(await serverSideTranslations(locale, ['common'])) },
  };
}
