import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import DropdownLink from '@/components/dropdown-link';
import { config } from '../config';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [ratio, setRatio] = useState(16 / 9);

  const selectedLang = (lang) => {
    return router?.locale === lang ? (
      <b>{lang.toUpperCase()}</b>
    ) : (
      lang.toUpperCase()
    );
  };

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
          {/* Language Menu */}
          <Menu as="div" className="relative inline-block z-10">
            <Menu.Button className="flex justify-start items-center">
              <span
                className={`fi fi-${config.flags[
                  router?.locale?.toLowerCase()
                ]?.toLowerCase()} bg-contain bg-no-repeat bg-left pl-6`}
              ></span>
              {router?.locale?.toUpperCase()}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-auto origin-top-right bg-white shadow-lg">
              {config.supportedLanguages.sort().map((lang) => (
                <Menu.Item key={lang}>
                  <DropdownLink
                    className="dropdown-link"
                    href={router?.asPath}
                    locale={lang}
                  >
                    <span
                      className={`fi fi-${config.flags[
                        lang.substring(0, 2).toLowerCase()
                      ].toLowerCase()} fib bg-contain bg-no-repeat bg-left pl-5 `}
                    ></span>
                    {selectedLang(lang)}
                  </DropdownLink>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
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
