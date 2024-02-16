import Image from 'next/image'
import styles from './page.module.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { authCookieKey, projectIdCookieKey } from '@/server/constants';

export const Home = () => {
  const aithId = cookies().get(authCookieKey)?.value
  !aithId && redirect('/auth');

  const projectId = cookies().get(projectIdCookieKey)?.value;
  projectId && redirect('/app');

  return (
    <main className={styles.main}>
      Homeh
    </main>
  );
}

export default Home;

