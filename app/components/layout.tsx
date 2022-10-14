import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Header from './header';
import Footer from './footer';
import Background from './background';

export default function Layout({ title, children, showFooter, showHeader }) {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{title ? title : t('default_website_name')}</title>
        <meta name="description" content="Web application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <div className="flex min-h-screen flex-col justify-between ml-1 mr-5 gap-3 sm:gap-10 transition duration-500">
          {showHeader !== false && <Header />}
          <main className="container m-auto text-center ">{children}</main>
          {showFooter !== false && <Footer />}
        </div>
      </Background>
    </div>
  );
}
