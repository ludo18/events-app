import type { NextApiRequest, NextApiResponse } from 'next';
import apiMessages from '@/lib/api/api-messages.json';
import { createHandler } from '@/lib/api/handler';
import { addEvent, getEvents } from '@/lib/features/events/queries';
import { isOlderThan } from '@/lib/utils/functions';

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let events = await getEvents();
  return res.status(200).json({ events });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { newEvent } = req.body;
  //#region validation
  if (!newEvent) {
    return res.status(400).json({ message: apiMessages.events.Invalid_event });
  }
  if (
    !newEvent.name ||
    !newEvent.description ||
    !newEvent.startAt ||
    !newEvent.endAt
  ) {
    return res.status(400).json({ message: apiMessages.events.Invalid_event });
  }
  if (newEvent.name.length > 32) {
    return res
      .status(400)
      .json({ message: apiMessages.events.Event_name_too_long });
  }
  if (
    isNaN(Date.parse(newEvent.startAt)) ||
    isNaN(Date.parse(newEvent.endAt))
  ) {
    return res
      .status(400)
      .json({ message: apiMessages.events.Event_date_format_invalid });
  }
  if (!isOlderThan(newEvent.endAt, newEvent.startAt)) {
    return res
      .status(400)
      .json({ message: apiMessages.events.Event_date_values_invalid });
  }
  //#endregion

  const addedEvent = await addEvent(newEvent);
  console.log(addedEvent);
  return res.json({ event: addedEvent });
});

export default handler;
