import Cookies from 'js-cookie';
import { GetServerSideProps, GetStaticProps } from 'next';
import { cookies } from 'next/headers'

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    if (!Cookies.get('auth_id')) {
        // redirect('/auth');
    }
    console.log(
        1,
        Cookies.get('auth_id'),
    )
    return (
        <>
            about
            {

            }
        </>
    );
};

export default Page;
