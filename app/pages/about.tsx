import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

export default function About(): React.ReactElement {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('About')} showHeader={true} showFooter={true}>
      <div>
        <h1>{t('About')}</h1>
        <p>
          Favicon:{' '}
          <Link href="https://www.vecteezy.com/free-vector/event-icon">
            Event Icon Vectors by Vecteezy
          </Link>
        </p>
        <p>
          <Link href="/">
            <a>&larr; {t('Back')}</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
