import styles from './page.module.css';
import { authCookieKey, categoryColors, projectIdCookieKey } from '@/server/constants';
import Box from '@mui/material/Box';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Typography from '@mui/material/Typography'

export const Home = () => {
  // const aithId = cookies().get(authCookieKey)?.value
  // !aithId && redirect('/auth');

  // const projectId = cookies().get(projectIdCookieKey)?.value;
  // projectId && redirect('/app');

  // console.log(categoryColorsWithSecondary);


  return (
    <main className={styles.main}>
      Homeh
    </main>
  );
}
export default Home;

