import type { NextPage } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

export async function getStaticProps() {
  return {
    // returns the default 404 page in production
    notFound: process.env.NODE_ENV === 'production',
    props: {}
  }
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Integral</h1>

        <div className={styles.grid}>
          <Link href='/'>
            <a className={styles.card}>
              <h2>Home Page &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>
          <Link href='/producers'>
            <a className={styles.card}>
              <h2>Producers &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>
          <Link href='/traders'>
            <a className={styles.card}>
              <h2>Traders &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>
          <Link href='/providers'>
            <a className={styles.card}>
              <h2>Providers &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>

          <Link href='/polymers'>
            <a className={styles.card}>
              <h2>Polymers list &rarr;</h2>
              <p>List page</p>
            </a>
          </Link>
          <Link href='/polymers/1'>
            <a className={styles.card}>
              <h2>Single product &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>
          <Link href='/traders/1'>
            <a className={styles.card}>
              <h2>Single trader &rarr;</h2>
              <p>Tab page</p>
            </a>
          </Link>

          <Link href='/find'>
            <a className={styles.card}>
              <h2>Find page &rarr;</h2>
              <p>Search</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
