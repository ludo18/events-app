import { readFakeData } from '@/__tests__/__mocks__/fakeData/index';
import { render, screen } from '@testing-library/react';
import Events from '@/pages/events/index';
import { TimezoneContextProvider } from '@/contexts/timezone-context';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Events list page', () => {
  it('has correct heading & details', async () => {
    const { fakeEvents } = await readFakeData();

    //render(<EventScreen event={event} />);
    render(
      <TimezoneContextProvider>
        <Events events={fakeEvents} />
      </TimezoneContextProvider>
    );
    const heading = await screen.findByRole('heading', {
      name: 'events.Events',
    });
    expect(heading).toBeInTheDocument();
  });
});
