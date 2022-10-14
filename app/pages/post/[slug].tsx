import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import Layout from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  files.push('README.md');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug }, locale }) {
  const fileName = fs.readFileSync(
    slug === 'README' ? `${slug}.md` : `posts/${slug}.md`,
    'utf-8'
  );
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <Layout title={frontmatter.title} showHeader={true} showFooter={true}>
      <div className="prose-invert prose mx-auto  text-left font-serif">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </Layout>
  );
}
