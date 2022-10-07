//translated
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Unauthorized() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title={t('Unauthorized_Page')} showHeader={true} showFooter={true}>
      <h1 className="text-xl">{t('Access_denied')}</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
