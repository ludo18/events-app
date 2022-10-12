import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { processApiError } from './utils';

// base handler for centralized error and method handling
export const createHandler = () => {
  const handler = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      const { status, message } = processApiError(error);
      res.status(status).json({ message });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    },
  });
  return handler;
};
