import type { NextApiRequest, NextApiResponse } from 'next';

import { createHandler } from '@/lib/api/handler';
import { addEvent, getEvents } from '@/lib/features/events/queries';

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let events = await getEvents();
  return res.status(200).json({ events });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // an endpoint to demonstrate on-demand ISR revalidation
  //   https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
  // in an actual app, this would have a UI, and it would need authorization
  //   to check the user is authorized to make changes to events
  // in this app, this endpoint will be hit by testing directly to test on-demand ISR revalidation

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid revalidation token' });
  }

  // add event (here is where authorization would be validated)
  const { newEvent } = req.body;
  if (!newEvent) {
    return res.status(400).json({ message: 'Invalid event' });
  }

  //console.log('adding new event', newEvent);
  const addedEvent = await addEvent(newEvent);

  // revalidate events page for ISR
  // note: this will change to `res.revalidate` when
  // this feature is out of beta
  await res.revalidate('/events');
  return res.json({ event: addedEvent, revalidated: true });
});

export default handler;
