import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function Maintenance(): React.ReactElement {
  const { t } = useTranslation('common');
  return (
    <Layout
      title={t('maintenance.SiteInMaintenance')}
      showFooter={true}
      showHeader={false}
    >
      <div>
        <h1>{t('maintenance.Maintenance_Mode_On')}</h1>
        <p>{t('maintenance.Site_under_maintenance')}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
