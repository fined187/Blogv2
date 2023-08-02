import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import homeStyles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
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

        </ul>
      </section>
    </div>
  )
};
