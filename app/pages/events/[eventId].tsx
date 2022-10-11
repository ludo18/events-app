import Layout from '@/components/layout';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getEventById } from '@/lib/features/events/queries';
import { EventCard } from '@/components/event-card';

export default function EventScreen({ event }) {
  const { t } = useTranslation('common');
  return (
    <Layout
      title={`${t('events.Event_detail')} - ${event.name}`}
      showHeader={true}
      showFooter={true}
    >
      <h1 className="break-words">{event.name}</h1>
      <EventCard
        key={event.id}
        id={event.id}
        name={event.name}
        description={event.description}
        startAt={event.startAt}
        endAt={event.endAt}
        image={event.image}
      ></EventCard>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params, locale } = context;
  const { eventId } = params;
  const event = await getEventById(parseInt(eventId, 10));

  return {
    props: { event, ...(await serverSideTranslations(locale, ['common'])) },
  };
}
