import { testApiHandler } from 'next-test-api-route-handler';
// Import the handler under test from the pages/api directory
import eventIdHandler from '@/pages/api/events/[eventId]';
import eventsHandler from '@/pages/api/events/index';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import apiMessages from '@/lib/api/api-messages.json';

describe('/api/events/[eventId]', () => {
  describe('methods', () => {
    const cases = [
      { method: 'POST' },
      { method: 'PUT' },
      { method: 'PATCH' },
      { method: 'OPTIONS' },
    ];
    it.each(cases)(
      'should return 400 if method is $method',
      async ({ method }) => {
        await testApiHandler({
          handler: eventIdHandler,
          test: async ({ fetch }) => {
            const res = await fetch({ method });
            expect(res.status).toBe(405);
          },
        });
      }
    );
  });

  it('should return the event data associated with the given id', async () => {
    const eventId = 0;
    await testApiHandler({
      handler: eventIdHandler,
      paramsPatcher: (params) => (params.eventId = eventId),
      test: async ({ fetch }) => {
        //generate a fake product
        const { fakeEvents } = await readFakeData();
        const fakeEvent = fakeEvents[0];
        fakeEvent.id = eventId;

        const res = await fetch({ method: 'GET' });
        expect(res.status).toBe(200);
        const json = await res.json();

        expect(json).toHaveProperty('event');
        expect(json.event).toHaveProperty('id');
        expect(json.event.id).toEqual(eventId);
        expect(json.event).toEqual(fakeEvent);
      },
    });
  });

  it('should return 404 if no event is associated with the given id', async () => {
    const eventId = 9999;
    await testApiHandler({
      handler: eventIdHandler,
      paramsPatcher: (params) => (params.eventId = eventId),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        expect(res.status).toBe(404);
        const json = await res.json();

        expect(json).toHaveProperty('message');
        expect(json.message).toEqual(apiMessages.events.Not_found);
      },
    });
  });
});

describe('/api/events', () => {
  describe('methods', () => {
    const cases = [
      { method: 'PUT' },
      { method: 'PATCH' },
      { method: 'OPTIONS' },
    ];
    it.each(cases)(
      'should return 400 if method is $method',
      async ({ method }) => {
        await testApiHandler({
          handler: eventsHandler,
          test: async ({ fetch }) => {
            const res = await fetch({ method });
            expect(res.status).toBe(405);
          },
        });
      }
    );
  });

  it('should return all the events', async () => {
    await testApiHandler({
      handler: eventsHandler,
      test: async ({ fetch }) => {
        //generate a fake event
        const { fakeEvents } = await readFakeData();
        const fakeEvent = fakeEvents[0];

        const res = await fetch({ method: 'GET' });
        expect(res.status).toBe(200);
        const json = await res.json();

        expect(json).toHaveProperty('events');
        expect(json.events).toBeInstanceOf(Array);
        expect(json.events.length).toEqual(3);
        expect(json.events[0]).toEqual(fakeEvent);
      },
    });
  });

  // it('should return 404 if no event is associated with the given id', async () => {
  //   const eventId = 9999;
  //   await testApiHandler({
  //     handler: eventIdHandler,
  //     paramsPatcher: (params) => (params.eventId = eventId),
  //     test: async ({ fetch }) => {
  //       const res = await fetch({ method: 'GET' });
  //       expect(res.status).toBe(404);
  //       const json = await res.json();

  //       expect(json).toHaveProperty('message');
  //       expect(json.message).toEqual(apiMessages.events.Not_found);
  //     },
  //   });
  // });

  it('should create a new event', async () => {
    await testApiHandler({
      handler: eventsHandler,
      test: async ({ fetch }) => {
        //generate a fake event
        const newEvent = {
          startAt: '2023-06-28T22:00:00.000Z',
          endAt: '2023-06-29T02:00:00.000Z',
          name: 'Paint the house',
          description: 'The walls have to be painted everywhere in the house.',
          image: 'eventD.webp',
          id: 3,
        };

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            newEvent: {
              startAt: newEvent.startAt,
              endAt: newEvent.endAt,
              name: newEvent.name,
              description: newEvent.description,
              image: newEvent.image,
            },
          }),
        });
        //expect(res.status).toBe(200);
        const json = await res.json();
        console.log(json);
        expect(res.status).toBe(200);

        expect(json).toHaveProperty('event');
        expect(json.event).toHaveProperty('id');
        expect(json.event).toHaveProperty('name');
        expect(json.event).toHaveProperty('description');
        expect(json.event).toHaveProperty('image');
        expect(json.event).toHaveProperty('startAt');
        expect(json.event).toHaveProperty('endAt');
        expect(json.event.id).toEqual(newEvent.id);
        expect(json.event.name).toEqual(newEvent.name);
        expect(json.event.description).toEqual(newEvent.description);
        expect(json.event.image).toEqual(newEvent.image);
        expect(json.event.startAt).toEqual(newEvent.startAt);
        expect(json.event.endAt).toEqual(newEvent.endAt);
      },
    });
  });

  describe("event won't be created", () => {
    it('should not create a new event if event name is too long', async () => {
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = {
            startAt: '2023-06-28T22:00:00.000Z',
            endAt: '2023-06-29T02:00:00.000Z',
            name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
            description:
              'The walls have to be painted everywhere in the house.',
            image: 'eventD.webp',
            id: 3,
          };

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: {
                startAt: newEvent.startAt,
                endAt: newEvent.endAt,
                name: newEvent.name,
                description: newEvent.description,
                image: newEvent.image,
              },
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Event_name_too_long);
        },
      });
    });

    it('should not create a new event if body is missing', async () => {
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = undefined;

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: undefined,
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Invalid_event);
        },
      });
    });

    it('should not create a new event if event mandatory properties are missing', async () => {
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = {
            startAt: '2023-06-28T22:00:00.000Z',
            endAt: '2023-06-29T02:00:00.000Z',
            name: 'test name',
            description:
              'The walls have to be painted everywhere in the house.',
            image: 'eventD.webp',
            id: 3,
          };

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: {
                startAt: undefined,
                endAt: newEvent.endAt,
                name: newEvent.name,
                description: newEvent.description,
                image: newEvent.image,
              },
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Invalid_event);
        },
      });
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = {
            startAt: '2023-06-28T22:00:00.000Z',
            endAt: '2023-06-29T02:00:00.000Z',
            name: 'test name',
            description:
              'The walls have to be painted everywhere in the house.',
            image: 'eventD.webp',
            id: 3,
          };

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: {
                startAt: newEvent.startAt,
                endAt: undefined,
                name: newEvent.name,
                description: newEvent.description,
                image: newEvent.image,
              },
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Invalid_event);
        },
      });
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = {
            startAt: '2023-06-28T22:00:00.000Z',
            endAt: '2023-06-29T02:00:00.000Z',
            name: 'test name',
            description:
              'The walls have to be painted everywhere in the house.',
            image: 'eventD.webp',
            id: 3,
          };

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: {
                startAt: newEvent.startAt,
                endAt: newEvent.endAt,
                name: undefined,
                description: newEvent.description,
                image: newEvent.image,
              },
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Invalid_event);
        },
      });
      await testApiHandler({
        handler: eventsHandler,
        test: async ({ fetch }) => {
          //generate a fake event
          const newEvent = {
            startAt: '2023-06-28T22:00:00.000Z',
            endAt: '2023-06-29T02:00:00.000Z',
            name: 'test name',
            description:
              'The walls have to be painted everywhere in the house.',
            image: 'eventD.webp',
            id: 3,
          };

          const res = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              newEvent: {
                startAt: newEvent.startAt,
                endAt: newEvent.endAt,
                name: newEvent.name,
                description: undefined,
                image: newEvent.image,
              },
            }),
          });
          expect(res.status).toBe(400);
          const json = await res.json();

          expect(json).toHaveProperty('message');
          expect(json.message).toEqual(apiMessages.events.Invalid_event);
        },
      });
    });
  });

  it('should not create a new event if dates are invalid', async () => {
    await testApiHandler({
      handler: eventsHandler,
      test: async ({ fetch }) => {
        //generate a fake event
        const newEvent = {
          startAt: 'mardi 12 janvier 2003 16h31min',
          endAt: '2023-06-29T02:00:00.000Z',
          name: 'test name',
          description: 'The walls have to be painted everywhere in the house.',
          image: 'eventD.webp',
          id: 3,
        };

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            newEvent: {
              startAt: newEvent.startAt,
              endAt: newEvent.endAt,
              name: newEvent.name,
              description: newEvent.description,
              image: newEvent.image,
            },
          }),
        });
        expect(res.status).toBe(400);
        const json = await res.json();

        expect(json).toHaveProperty('message');
        expect(json.message).toEqual(
          apiMessages.events.Event_date_format_invalid
        );
      },
    });
    await testApiHandler({
      handler: eventsHandler,
      test: async ({ fetch }) => {
        //generate a fake event
        const newEvent = {
          startAt: '2023-06-28T22:00:00.000Z',
          endAt: 'mardi 12 janvier 2003 16h31min',
          name: 'test name',
          description: 'The walls have to be painted everywhere in the house.',
          image: 'eventD.webp',
          id: 3,
        };

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            newEvent: {
              startAt: newEvent.startAt,
              endAt: newEvent.endAt,
              name: newEvent.name,
              description: newEvent.description,
              image: newEvent.image,
            },
          }),
        });
        expect(res.status).toBe(400);
        const json = await res.json();

        expect(json).toHaveProperty('message');
        expect(json.message).toEqual(
          apiMessages.events.Event_date_format_invalid
        );
      },
    });
  });

  it('should not create a new event if start date is greater or equal to end date', async () => {
    await testApiHandler({
      handler: eventsHandler,
      test: async ({ fetch }) => {
        //generate a fake event
        const newEvent = {
          startAt: '2026-06-29T02:00:00.000Z',
          endAt: '2023-06-29T02:00:00.000Z',
          name: 'test name',
          description: 'The walls have to be painted everywhere in the house.',
          image: 'eventD.webp',
          id: 3,
        };

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            newEvent: {
              startAt: newEvent.startAt,
              endAt: newEvent.endAt,
              name: newEvent.name,
              description: newEvent.description,
              image: newEvent.image,
            },
          }),
        });
        expect(res.status).toBe(400);
        const json = await res.json();

        expect(json).toHaveProperty('message');
        expect(json.message).toEqual(
          apiMessages.events.Event_date_values_invalid
        );
      },
    });
  });
});
