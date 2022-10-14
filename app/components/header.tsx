import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import DropdownLink from '@/components/dropdown-link';
import { config } from '../config';
import DarkModeToggle from './darkmode-toggle';
import {
  HomeIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import TimezoneDropdown from './timezone-dropdown';

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
      <nav className="flex h-16 justify-between items-center gap-2">
        {/* Logo */}
        <Link href="/">
          <a>
            <Image
              src="/images/LUDO-LOGO-light_rgb_148-163-184.webp"
              alt="shopper-logo"
              width={48 * ratio}
              height={48}
              onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                setRatio(naturalWidth / naturalHeight);
              }}
            />
          </a>
        </Link>
        {/* Timezone */}
        <TimezoneDropdown className="hidden sm:flex" />
        {/* Right Zone */}
        <div className="flex flex-row justify-end content-center items-center gap-3">
          <Link href="/">
            <a>
              <div className="hidden sm:flex">{t('Home')}</div>
              <HomeIcon className="w-7 h-7 sm:hidden" />
            </a>
          </Link>
          <Link href="/events">
            <a>
              <div className="hidden sm:flex">{t('events.Events')}</div>
              <CalendarDaysIcon className="w-7 h-7 sm:hidden" />
            </a>
          </Link>
          {/* dark mode */}
          <DarkModeToggle />
          {/* Language Menu */}
          <Menu as="div" className="relative inline-block z-10">
            <Menu.Button className="flex justify-start items-center">
              <span
                className={`fi fi-${config.flags[
                  router?.locale?.toLowerCase()
                ]?.toLowerCase()} bg-contain bg-no-repeat bg-left pl-6 opacity-70`}
              ></span>
              {router?.locale?.toUpperCase()}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-auto origin-top-right shadow-lg bg-slate-400 dark:bg-slate-700 p-2">
              {config.supportedLanguages.sort().map((lang) => (
                <Menu.Item key={lang}>
                  <DropdownLink
                    className="dropdown-link"
                    href={router?.asPath}
                    locale={lang}
                  >
                    <div className="flex flex-row flex-nowrap items-center justify-center gap-2">
                      <span
                        className={`fi fi-${config.flags[
                          lang.substring(0, 2).toLowerCase()
                        ].toLowerCase()} fib bg-contain bg-no-repeat bg-left pl-5 `}
                      ></span>
                      <span>{selectedLang(lang)}</span>
                    </div>
                  </DropdownLink>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <Link href="/about">
            <a className="whitespace-nowrap">
              <div className="hidden sm:flex">{t('About')}</div>
              <QuestionMarkCircleIcon className="w-7 h-7 sm:hidden" />
            </a>
          </Link>
        </div>
      </nav>
      {/* Timezone */}
      <TimezoneDropdown className="sm:hidden max-w-sm mx-auto" />
    </header>
  );
}
