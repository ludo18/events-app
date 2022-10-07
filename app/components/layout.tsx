import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position="bottom-center" limit={1} />
      <Background>
        <div className="flex min-h-screen flex-col justify-between mx-1">
          {showHeader !== false && <Header />}
          <main className="container m-auto text-center">{children}</main>
          {showFooter !== false && <Footer />}
        </div>
      </Background>
    </div>
  );
}
