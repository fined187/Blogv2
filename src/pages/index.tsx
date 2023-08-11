import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import homeStyles from '../styles/Home.module.css';
import { GetStaticProps } from 'next';
import { getSortedPostData } from '@/lib/post';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ allPostsData }: { allPostsData: {
  date: string,
  title: string,
  id: string
}[]}) {
  return (
    <div className={homeStyles.container} >
      <Head>
        <title>LEE WOO TAIK</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[성장하는 프론트엔드 개발자!]</p>
        <p className={homeStyles.padding1px}>
          Main Blog
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData?.map(({ id, date, title }) => 
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/post/${id}`}>
                {title}
              </Link>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
              <br />
            </li>
          )}
        </ul>
      </section>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData
    }
  }
}