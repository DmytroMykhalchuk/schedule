import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AvailbleProjects } from '@/Componets/Enter/AvailbleProjects';
import { cookies } from 'next/headers';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { InviteInputForm } from '@/Componets/SignIn/InviteInputForm';
import { NotificationInvite } from '@/Componets/Enter/NotificationInvite';
import { projectIdCookieKey } from '@/server/constants';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LogoutButton } from '@/Componets/Layouts/Elements/LogoutButton';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type PageType = {
    searchParams: {
        project_id?: string;
        reached_max_users?: string;
        not_found?: string;
    };
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ searchParams, params }) => {
    const { locale } = params;

    const { authEmail } = await getUserSessionAndEmail();

    const {
        reached_max_users: reachedMaxUsers,
        not_found: notFound,
    } = searchParams;

    authEmail || redirect(`/${locale}/auth`);

    const projectId = cookies().get(projectIdCookieKey)?.value;
    projectId && authEmail && redirect(`/${locale}/app/`);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'} spacing={2}>
            <NotificationInvite />
            <Content authEmail={authEmail} locale={locale} isReachedMaxUsers={Boolean(reachedMaxUsers)} isNotFound={Boolean(notFound)} />
            <MiddlePaperWrapper>
                <Stack alignItems={'center'}>
                    <LogoutButton locale={locale} />
                </Stack>
            </MiddlePaperWrapper>
        </Stack>
    );
};

type ContentType = {
    locale: string;
    authEmail: string;
    isReachedMaxUsers: boolean;
    isNotFound: boolean;
};

export const Content: React.FC<ContentType> = ({ locale, authEmail, isReachedMaxUsers, isNotFound }) => {
    const translation = useTranslations('Auth');

    return (
        <MiddlePaperWrapper>
            <Box mb={2}>
                <Typography variant="h3" textAlign={'center'}>{translation('welcome')}</Typography>
                <Typography variant="body1" textAlign={'center'}>{translation('welocme_subtitle')}</Typography>
            </Box>
            <InviteInputForm locale={locale} authEmail={authEmail} isReachedMaxUsers={isReachedMaxUsers} isNotFound={isNotFound} />
            <Box>
                <Typography variant="h6" fontWeight={600}>{translation('avalable_projects')}</Typography>
                <AvailbleProjects authEmail={authEmail as string} locale={locale} />
            </Box>
        </MiddlePaperWrapper>
    );
};

export default Page;