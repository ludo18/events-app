import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Header from './header';
import Footer from './footer';
import styles from '../styles/Home.module.css';

export default function Layout({ title, children, showFooter, showHeader }) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? title : t('default_website_name')}</title>
        <meta name="description" content="Web application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showHeader !== false && <Header />}
      <main>{children}</main>
      {showFooter !== false && <Footer />}
    </div>
  );
}
