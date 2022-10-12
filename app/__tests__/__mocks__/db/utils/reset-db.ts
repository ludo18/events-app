import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

export const resetDB = async () => {
  //failsafe against resetting production db!!
  const safeToReset = process.env.NODE_ENV === 'test' || process.env.CYPRESS;
  if (!safeToReset) {
    console.log(
      'WARNING: database reset unavailable outside test environment!'
    );
    return;
  }

  const { fakeEvents } = await readFakeData();

  //overwrite data in files
  await Promise.all([writeJSONToFile(filenames.events, fakeEvents)]);
};
