import { rest } from 'msw';
import { readFakeData } from '../fakeData';

export const handlers = [
  rest.get(
    'http://localhost:3000/api/events/:eventId',
    async (req, res, ctx) => {
      const { fakeEvents } = await readFakeData();
      const { eventId } = req.params;
      return res(
        ctx.json({
          event: fakeEvents.filter(
            (event) => event.id === Number(eventId)?.[0]
          ),
        })
      );
    }
  ),
  rest.get('http://localhost:3000/api/events', async (req, res, ctx) => {
    const { fakeEvents } = await readFakeData();
    return res(ctx.json({ events: fakeEvents }));
  }),
];
