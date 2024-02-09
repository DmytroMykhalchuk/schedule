import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { Search } from './Elements/Search';

type HomeHeaderType = {
};

export const HomeHeader: React.FC<HomeHeaderType> = ({ }) => {
    const authUser = JSON.parse(cookies().get('auth')?.value || '{}');

    return (
        <Grid container pb={2}>
            <Grid item xs={12} md={4}>
                <Typography variant="h6">
                    Welcome {authUser?.name && `, ${authUser?.name}!`}
                </Typography>
                <Typography variant="h6">
                    Here is your agenda for today
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Search />
                    <Image className={styles.avatar} src={authUser.picture} alt="" width={80} height={80} />
                </Stack>
            </Grid>
        </Grid>
    );
};