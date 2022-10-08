import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';
import { getEvents } from '@/lib/features/events/queries';
import { EventCard } from '@/components/event-card';

export default function Events({ events }) {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('events.Events')} showHeader={true} showFooter={true}>
      <div>
        <h1>{t('events.Events')}</h1>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard
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

export async function getServerSideProps({ locale }) {
  let events = await getEvents();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      events,
    },
  };
}
