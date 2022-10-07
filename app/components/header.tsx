import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const { t } = useTranslation('common');
  const [ratio, setRatio] = useState(16 / 9);
  return (
    <header>
      <nav>
        {/* Logo */}
        <Link href="/">
          <a>
            <Image
              src="/images/LUDO-demo-company-logo.png"
              alt="shopper-logo"
              width={64 * ratio}
              height={64}
              onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                setRatio(naturalWidth / naturalHeight);
              }}
            />
          </a>
        </Link>
        <div>
          <Link href="/" className="p-2">
            {t('Home')}
          </Link>
          <Link href="/about" className="p-2">
            {t('About')}
          </Link>
          <Link href="/login" className="p-2">
            {t('Login')}
          </Link>
          <Link href="/help" className="p-2">
            {t('Help')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
