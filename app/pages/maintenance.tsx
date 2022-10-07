import styles from '../styles/Home.module.css';
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
      <main className={styles.main}>
        <h1>{t('maintenance.Maintenance_Mode_On')}</h1>
        <p className={styles.description}>
          {t('maintenance.Site_under_maintenance')}
        </p>
      </main>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
