import Image from 'next/image'
import styles from './page.module.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { authCookieKey } from '@/server/constants';

export default function Home({ page }: any) {
  if (!cookies().get(authCookieKey)?.value) {
    redirect('/auth');
  }
  return (
    <main className={styles.main}>
      Homeh
    </main>
  )
}

