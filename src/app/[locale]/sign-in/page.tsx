import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from '@/configs/auth';
import { NotificationInvite } from '@/Componets/Enter/NotificationInvite';
import { projectIdCookieKey } from '@/server/constants';
import { redirect } from 'next/navigation';
import { AvailbleProjects } from '@/Componets/Enter/AvailbleProjects';
import { NextPageContext } from 'next';

type PageType = {
    searchParams: { project_id?: string }
};

const Page: React.FC<PageType> = async ({ searchParams }) => {
    const session = await getServerSession(nextAuthConfig);
    const authEmail = session?.user?.email;
    
    authEmail || redirect('/auth');

    const projectId = cookies().get(projectIdCookieKey)?.value;
    projectId && authEmail && redirect('/app/');

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <NotificationInvite />
            <Paper sx={{
                p: 2,
                borderRadius: 4,
                minWidth: { xs: 320, md: 600 }
            }}>
                <Box mb={2}>
                    <Typography variant="h3" textAlign={'center'}>Welcome!</Typography>
                    <Typography variant="body1" textAlign={'center'}>To use our service you need to have access to some projects.</Typography>
                </Box>
                <Typography variant="h6" color="warning" sx={{ color: 'warning.main' }} textAlign={'center'}>
                    <Link href={'/sign-in/create-project'}>Create project</Link>
                </Typography>
                <Typography variant="subtitle1" textAlign={'center'}>or</Typography>
                <Stack justifyContent={'center'} alignItems={'center'} mb={2}>
                    <form className={styles.formEntering} action={''}>
                        <TextField
                            label="Input invite id"
                            variant="outlined"
                            name="invite_id"
                            type="text" size="small" color="warning"
                            sx={{ textAlign: 'center' }}
                        />
                        <Button variant="outlined" color="warning" sx={{ textTransform: 'none' }}>
                            Confirm
                        </Button>
                    </form>
                </Stack>
                <Box>
                    <Typography variant="h6">Availble projects</Typography>
                    <AvailbleProjects authEmail={authEmail as string} />
                </Box>
            </Paper>
        </Stack>
    );
};


export default Page;