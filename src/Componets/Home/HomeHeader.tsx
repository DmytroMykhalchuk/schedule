import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { Search } from './Elements/Search';
import { useTranslations } from 'next-intl';

type HomeHeaderType = {
    userName: string;
    userPicture: string;
    authEmail: string;
    locale: string;
};

export const HomeHeader: React.FC<HomeHeaderType> = ({ userName, userPicture, authEmail, locale }) => {
    const translation = useTranslations('AppHome');

    return (
        <Grid container pb={2}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h5" fontWeight={600}>
                    {translation('header.title', { name: userName })}
                </Typography>
                <Typography variant="h6">
                    {translation('header.subtitle', { name: userName })}
                </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Search
                        dictionary={{
                            categoryTitle: translation('search.category_title'),
                            commentTitle: translation('search.comment_title'),
                            directoryTitle: translation('search.directory_title'),
                            taskTitle: translation('search.task_title'),
                            inviteTitle: translation('search.invite_title'),
                            userTitle: translation('search.user_title'),
                            search: translation('search.searching'),
                            notFound: translation('search.not_found'),
                        }}
                        locale={locale}
                        authEmail={authEmail}
                    />
                    <Image className={styles.avatar} src={userPicture} alt="" width={80} height={80} />
                </Stack>
            </Grid>
        </Grid>
    );
};