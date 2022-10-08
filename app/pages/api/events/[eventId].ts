import type { NextApiRequest, NextApiResponse } from 'next';

import { createHandler } from '@/lib/api/handler';
import { getEventById } from '@/lib/features/events/queries';

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  const event = await getEventById(Number(eventId));
  return res.status(200).json({ event });
});

export default handler;
