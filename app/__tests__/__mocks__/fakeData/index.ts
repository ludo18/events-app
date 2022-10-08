import path from 'path';

import { filenames, getJSONfromFile } from '@/lib/db/db-utils';
import type { Event } from '@/lib/features/events/types';
import type { AuthUser } from '@/lib/features/users/types';

// store fake data in JSON files for easier command-line db reset
const JSON_FILEPATH = path.join(__dirname, 'json');

export const readFakeData = async () => {
  const [fakeEvents, fakeUsers] = await Promise.all([
    getJSONfromFile(filenames.events, JSON_FILEPATH),
    getJSONfromFile(filenames.users, JSON_FILEPATH),
  ]);

  return {
    fakeEvents: fakeEvents as Array<Event>,
    fakeUsers: fakeUsers as Array<AuthUser>,
  };
};
