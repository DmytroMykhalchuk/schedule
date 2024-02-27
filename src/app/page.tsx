import Box from '@mui/material/Box';
import styles from './page.module.css';
import Typography from '@mui/material/Typography';
import { authCookieKey, categoryColors, projectIdCookieKey } from '@/server/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TestClientComponent } from './Componnets/Common/TestClientComponent';
import { TestSessionComponent } from './Componnets/Common/TestSessionComponent';

export const Home = () => {
  // const aithId = cookies().get(authCookieKey)?.value
  // !aithId && redirect('/auth');

  // const projectId = cookies().get(projectIdCookieKey)?.value;
  // projectId && redirect('/app');

  // console.log(categoryColorsWithSecondary);


  return (
    <main className={styles.main}>
      Homeh
      <TestClientComponent/>
      <TestSessionComponent/>
    </main>
  );
}
export default Home;

