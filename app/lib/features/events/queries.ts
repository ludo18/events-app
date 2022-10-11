import {
  filenames,
  getItemById,
  getJSONfromFile,
  writeJSONToFile,
} from '@/lib/db/db-utils';

import type { CustomEvent } from './types';

export async function writeEvents(
  newEventsArray: CustomEvent[]
): Promise<void> {
  await writeJSONToFile(filenames.events, newEventsArray);
}

export async function getEvents(): Promise<CustomEvent[]> {
  return getJSONfromFile<CustomEvent>(filenames.events);
}

export async function getEventById(eventId: number): Promise<CustomEvent> {
  return getItemById<CustomEvent>(eventId, filenames.events, 'event');
}

export async function addEvent(newEvent: CustomEvent): Promise<CustomEvent> {
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
