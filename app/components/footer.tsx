import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  const getCopyrightYears = useMemo(() => {
    //const currentYear = new Date().getFullYear();
    //console.log('recomputing');
    const startYear = 2022;
    if (startYear !== currentYear) {
      return `${startYear}-${currentYear}`;
    } else {
      return currentYear;
    }
  }, [currentYear]);

  return (
    <footer className="flex flex-col justify-center items-center shadow-inner ">
      <div className="flex flex-row flex-wrap justify-center items-center gap-3 pb-5">
        <Link href="/">
          <Image
            src="/images/misc/linkedin.svg"
            alt="linkedin"
            width={30}
            height={30}
          />
        </Link>
        <Link href="/">
          <Image
            src="/images/misc/facebook.svg"
            alt="facebook"
            width={30}
            height={30}
          />
        </Link>
        <Link href="/">
          <Image
            src="/images/misc/twitter.svg"
            alt="twitter"
            width={30}
            height={30}
          />
        </Link>
        <Link href="/terms">{t('terms.Terms')}</Link>
        <Link href="/terms">{t('terms.Privacy')}</Link>
        <Link href="/terms">{t('terms.Security')}</Link>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          <div>
            {t('terms.Copyright')} © {getCopyrightYears}&nbsp;
            <Link href="/">{process.env.NEXT_PUBLIC_COMPANY}</Link>.
          </div>
          <div>{t('terms.AllRightsReservedWorldwide')}</div>
        </div>
      </div>
    </footer>
  );
}
