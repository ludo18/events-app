import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Terms() {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <Layout
      title={t('terms.Terms_of_Service')}
      showHeader={true}
      showFooter={true}
    >
      <div className="flex flex-row justify-between items-start">
        <div>
          <h1 className="text-3xl">{t('terms.Terms_of_Service')}</h1>
          <p>{t('terms.Terms_of_Service')}</p>
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
