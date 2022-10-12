import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import DropdownLink from '@/components/dropdown-link';
import { config } from '../config';
import timezones from '@/lib/data/timezones.json';
import { TimezoneContext } from '@/contexts/timezone-context';
import { addHoursToCurrentDate } from '@/lib/utils/functions';
import { toast } from 'react-toastify';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { state, dispatch } = useContext(TimezoneContext);
  const [ratio, setRatio] = useState(16 / 9);

  const selectedLang = (lang) => {
    return router?.locale === lang ? (
      <b>{lang.toUpperCase()}</b>
    ) : (
      lang.toUpperCase()
    );
  };

  useEffect(() => {
    toast.success(
      `${t('timezone.Simulated_local_time_is_now')}:\n${addHoursToCurrentDate(
        parseInt(state.timezone.currentOffset, 10) -
          parseInt(state.timezone.realOffset, 10)
      ).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      {
        toastId: 'success',
      }
    );
  }, [state?.timezone?.currentOffset]);

  const timezoneHandler = (e) => {
    dispatch({
      type: 'TIMEZONE_UPDATE',
      payload: { timezone: e.target.value },
    });
  };

  return (
    <header>
      <nav className="flex h-16 justify-between items-center">
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
        <div className="flex flex-row flex-nowrap items-center justify-center gap-1">
          <div>{t('timezone.Timezone')}</div>
          <select
            id="timezone-selector"
            className="w-full lg:w-2/3"
            value={state.timezone?.timezone}
            onChange={timezoneHandler}
          >
            <option value="null">{t('timezone.let_browser_detect')}</option>
            {timezones &&
              Object.keys(timezones).map((timezone) => (
                <option key={timezone} value={timezone}>
                  {`[${timezones[timezone]?.GMT}] ${timezone}`}
                </option>
              ))}
          </select>
        </div>
        {/* Right Zone */}
        <div className="flex flex-row justify-end content-center items-center gap-3">
          <Link href="/">
            <a>{t('Home')}</a>
          </Link>
          <Link href="/events">
            <a>{t('events.Events')}</a>
          </Link>
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
            <Menu.Items className="absolute right-0 w-auto origin-top-right shadow-lg bg-slate-700 p-2">
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
            <a className="whitespace-nowrap">{t('About')}</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
