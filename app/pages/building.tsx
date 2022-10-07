import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Building(): React.ReactElement {
  const { t } = useTranslation('common');
  return (
    <Layout
      title={t('maintenance.SiteInConstruction')}
      showFooter={true}
      showHeader={false}
    >
      <div>
        <h1>{t('maintenance.SiteInConstruction')}</h1>
        <p>{t('maintenance.SoonOnline')}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
