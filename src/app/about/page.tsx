import { authCookieKey } from '@/server/constants';
import Cookies from 'js-cookie';
import { GetServerSideProps, GetStaticProps } from 'next';
import { cookies } from 'next/headers'

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    if (!Cookies.get(authCookieKey)) {
        // redirect('/auth');
    }
    return (
        <>
            about
            {

            }
        </>
    );
};

export default Page;
