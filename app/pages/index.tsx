import Layout from '@/components/layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';

export default function Home(): React.ReactElement {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('Home')} showHeader={true} showFooter={true}>
      <div className="mainimg">
        <Image src="/images/sekandeya.webp" width={1900} height={300} />
      </div>
      <h1>{t('home.PowerPhrase')}</h1>
      <h2>{t('home.SubPowerPhrase')}</h2>
      <div>{t('home.PowerText')}</div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
