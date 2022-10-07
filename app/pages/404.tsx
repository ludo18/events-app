import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Custom404() {
  const { t } = useTranslation('common');

  return (
    <Layout title={t('maintenance.404')} showFooter={true} showHeader={false}>
      <h1 className="mb-4 text-xl">{t('maintenance.404')}</h1>
      <div>{t('maintenance.404_This_page_could_not_be_found')}</div>
      <Link href="/">{t('Home')}</Link>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
