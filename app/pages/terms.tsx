import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Terms() {
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('terms.Terms_of_Service')}
      showHeader={true}
      showFooter={true}
    >
      <h1 className="text-3xl">{t('terms.Terms_of_Service')}</h1>
      <p>{t('terms.Terms_of_Service')}</p>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
