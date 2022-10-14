import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';

export default function About({ posts }): React.ReactElement {
  const { t } = useTranslation('common');

  return (
    <Layout title={t('About')} showHeader={true} showFooter={true}>
      <div>
        <h1>{t('About')}</h1>
        <h2>Contact</h2>
        <div>{process.env.NEXT_PUBLIC_AUTHOR_NAME}</div>
        <Link href={`mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`}>
          <a>{process.env.NEXT_PUBLIC_AUTHOR_EMAIL}</a>
        </Link>
        <h2>Purpose</h2>
        <div>
          <div>
            This app is part of my portfolio, and deployed as demo on Vercel.
          </div>
          <Link href={process.env.NEXT_PUBLIC_APP_REPO_URL}>
            <a target="_blank">GitHub repository</a>
          </Link>
        </div>
        <h2>Documentation</h2>
        <div className="flex flex-row items-center justify-center gap-4 ">
          {posts.map(({ slug, frontmatter }) => (
            <div key={slug} className="overflow-hidden flex flex-col p-1">
              <Link href={`/post/${slug}`}>
                <a>
                  <Image
                    width={100}
                    height={130}
                    alt={frontmatter.title}
                    src={`/${frontmatter.image}`}
                  />
                  <div>{frontmatter.title}</div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <h2>Credits</h2>
        <p>
          <Link href="https://www.vecteezy.com/free-vector/event-icon">
            <a>Event Icon (favicon) Vectors by Vecteezy</a>
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

export const getStaticProps = async ({ locale }) => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });
  posts.push({
    slug: 'README',
    frontmatter: matter(fs.readFileSync(`README.md`, 'utf-8')).data,
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
    },
  };
};
