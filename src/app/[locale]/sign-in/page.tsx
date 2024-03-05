import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { NotificationInvite } from '@/Componets/Enter/NotificationInvite';
import { projectIdCookieKey } from '@/server/constants';
import { redirect } from 'next/navigation';
import { AvailbleProjects } from '@/Componets/Enter/AvailbleProjects';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';
import { InviteInputForm } from '@/Componets/SignIn/InviteInputForm';

type PageType = {
    searchParams: {
        project_id?: string;
    };
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ searchParams, params }) => {
    const { locale } = params;

    const { authEmail } = await getUserSessionAndEmail();

    authEmail || redirect(`/${locale}/auth`);

    const projectId = cookies().get(projectIdCookieKey)?.value;
    projectId && authEmail && redirect(`/${locale}/app/`);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <NotificationInvite />
            <Content authEmail={authEmail} locale={locale} />
        </Stack>
    );
};

type ContentType = {
    locale: string;
    authEmail: string;
};

export const Content: React.FC<ContentType> = ({ locale, authEmail }) => {
    const translation = useTranslations('Auth');

    return (
        <Paper sx={{
            p: 2,
            borderRadius: 4,
            minWidth: { xs: 320, md: 600 }
        }}>
            <Box mb={2}>
                <Typography variant="h3" textAlign={'center'}>{translation('welcome')}</Typography>
                <Typography variant="body1" textAlign={'center'}>{translation('welocme_subtitle')}</Typography>
            </Box>
            <InviteInputForm locale={locale} authEmail={authEmail} />
            <Box>
                <Typography variant="h6" fontWeight={600}>{translation('avalable_projects')}</Typography>
                <AvailbleProjects authEmail={authEmail as string} locale={locale} />
            </Box>
        </Paper>
    );
};

export default Page;