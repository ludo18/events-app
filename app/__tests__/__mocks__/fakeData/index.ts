import path from 'path';

import { filenames, getJSONfromFile } from '@/lib/db/db-utils';
import type { CustomEvent } from '@/lib/features/events/types';

// store fake data in JSON files for easier command-line db reset
const JSON_FILEPATH = path.join(__dirname, 'json');

export const readFakeData = async () => {
  const [fakeEvents] = await Promise.all([
    getJSONfromFile(filenames.events, JSON_FILEPATH),
  ]);

  return {
    fakeEvents: fakeEvents as Array<CustomEvent>,
  };
};
