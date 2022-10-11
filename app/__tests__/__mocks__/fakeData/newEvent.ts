import { CustomEvent } from '@/lib/features/events/types';

export const generateNewEvent = (eventId: number): CustomEvent => ({
  id: eventId,
  startAt: '2023-06-28T22:00:00.000Z',
  endAt: '2023-06-29T02:00:00.000Z',
  name: 'Designing The Metaverse',
  description:
    'The Metaverse is being built at the speed of thought. Leading fashion designer brands like Gucci, Louis Vuitton, Balenciaga, Tommy Hilfiger, Dolce & Gabbana, and Burberry have embraced the Metaverse. Digital fashion is not limited to clothing for avatars. It’s a growing fashion subculture that includes the digital design and modeling of real-world clothing, the uploading of designs for real and digital clothing onto the blockchain (so these digital assets can be sold as NFTs), and even digital clothes rendered onto real people.',
  image: 'eventD.webp',
});
