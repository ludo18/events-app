import { readFakeData } from '@/__tests__/__mocks__/fakeData/index';
import { getByTestId, render, screen } from '@testing-library/react';
import EventScreen from '@/pages/events/[eventId]';
import { TimezoneContextProvider } from '@/contexts/timezone-context';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Event details page', () => {
  it('has correct heading & details', async () => {
    const { fakeEvents } = await readFakeData();
    const event = fakeEvents[0];

    render(
      <TimezoneContextProvider>
        <EventScreen event={event} />
      </TimezoneContextProvider>
    );
    expect(
      getByTestId(document.documentElement, 'h1-event-name')
    ).toBeInTheDocument();

    const desc = await screen.findByText(event.description);
    expect(desc).toBeInTheDocument();
  });
});
