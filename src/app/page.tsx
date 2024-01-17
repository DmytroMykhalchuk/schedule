import Image from 'next/image'
import styles from './page.module.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default function Home({ page }: any) {
  if (!cookies().get('auth_id')) {
    redirect('/auth');
  }
  return (
    <main className={styles.main}>
      Homeh
    </main>
  )
}

