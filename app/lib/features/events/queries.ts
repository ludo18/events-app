import {
  filenames,
  getItemById,
  getJSONfromFile,
  writeJSONToFile,
} from '@/lib/db/db-utils';

import type { Event } from './types';

export async function writeEvents(newEventsArray: Event[]): Promise<void> {
  await writeJSONToFile(filenames.events, newEventsArray);
}

export async function getEvents(): Promise<Event[]> {
  return getJSONfromFile<Event>(filenames.events);
}

export async function getEventById(eventId: number): Promise<Event> {
  return getItemById<Event>(eventId, filenames.events, 'event');
}

export async function addEvent(newEvent: Event): Promise<Event> {
  const events = await getEvents();

  // get the max id from the existing ids
  const ids: number[] = Object.values(events).map((e) => e.id);
  const maxId = ids.reduce(
    (tempMaxId: number, itemId: number) =>
      itemId > tempMaxId ? itemId : tempMaxId,
    0
  );

  // the new event will have an id of the max id plus 1
  const newEventId = maxId + 1;
  const newEventData = { ...newEvent, id: newEventId };
  events.push(newEventData);
  await writeEvents(events);
  return newEventData;
}
