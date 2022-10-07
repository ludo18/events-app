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
    <footer className="flex flex-col justify-center items-center shadow-inner mt-10 mb-2">
      <div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 pb-2">
          <Link href="/">
            <a>
              <Image
                src="/images/misc/linkedin.svg"
                alt="linkedin"
                width={30}
                height={30}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Image
                src="/images/misc/facebook.svg"
                alt="facebook"
                width={30}
                height={30}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Image
                src="/images/misc/twitter.svg"
                alt="twitter"
                width={30}
                height={30}
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 pb-2">
          <Link href="/terms">
            <a>{t('terms.Terms')}</a>
          </Link>
          <Link href="/terms">
            <a>{t('terms.Privacy')}</a>
          </Link>
          <Link href="/terms">
            <a>{t('terms.Security')}</a>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 whitespace-nowrap">
          <div>
            {t('terms.Copyright')} © {getCopyrightYears}&nbsp;
            <Link href="/">
              <a>{process.env.NEXT_PUBLIC_COMPANY}</a>
            </Link>
            .
          </div>
          <div>{t('terms.AllRightsReservedWorldwide')}</div>
        </div>
      </div>
    </footer>
  );
}
