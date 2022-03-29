import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WeekCalendar from '../components/weekCalendar';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>StV events</title>
        <meta name="description" content="Present events of the week" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <WeekCalendar />
    </div>
  )
}

export default Home
