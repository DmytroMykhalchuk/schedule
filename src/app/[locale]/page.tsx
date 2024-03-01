import styles from './page.module.css';
import { authCookieKey, projectIdCookieKey } from '@/server/constants';
import { availableLanguages } from '@/configs/constants';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { TestClientComponent } from '@/Componets/Common/TestClientComponent';
import { TestSessionComponent } from '@/Componets/Common/TestSessionComponent';

type PageType = {
  params: { locale: string };
};

const Page: React.FC<PageType> = ({ params }) => {
  const locale = params?.locale;
  if (!locale || !availableLanguages.includes(locale)) {
    //@ts-ignore
    return notFound();
  }
  const aithId = cookies().get(authCookieKey)?.value
  !aithId && redirect('/auth');

  const projectId = cookies().get(projectIdCookieKey)?.value;
  projectId && redirect('/app');



  return (
    <main className={styles.main}>
      Homeh
      <TestClientComponent />
      <TestSessionComponent />
    </main>
  );
}
export default Page;

