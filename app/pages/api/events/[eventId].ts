import type { NextApiRequest, NextApiResponse } from 'next';
import { createHandler } from '@/lib/api/handler';
import { getEventById } from '@/lib/features/events/queries';
import apiMessages from '@/lib/api/api-messages.json';

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { eventId } = req.query;
    const event = await getEventById(Number(eventId));
    if (!event) {
      return res.status(404).json({ message: apiMessages.events.Not_found });
    }
    return res.status(200).json({ event });
  } catch (error) {
    return res.status(404).json({ message: apiMessages.events.Not_found });
  }
});

export default handler;
