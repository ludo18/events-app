import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Help({ locale }) {
  const { t } = useTranslation('common');

  return (
    <Layout title={t('help.Help')} showHeader={true} showFooter={true}>
      <div className="flex flex-row justify-between items-start">
        <div>
          <h1 className="text-3xl">{t('help.Need_help')}</h1>
          <p>{t('help.How_can_we_help')}</p>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
