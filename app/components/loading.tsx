//translated
import React from 'react';
import { useTranslation } from 'next-i18next';
import {
  // Audio,
  BallTriangle,
  // Bars,
  // Circles,
  // Grid,
  // Hearts,
  //MutatingDots,
  // Oval,
  // Plane,
  // RevolvingDot,
  //Rings,
  // TailSpin,
  // Triangle,
  // Watch
} from 'react-loader-spinner';

export default function Loading({ size = 30 }) {
  const { t } = useTranslation('common');

  return (
    <div>
      {/*{t('loading')}*/}
      <BallTriangle height={size} width={size} radius="3" color="grey" />
    </div>
  );
}
