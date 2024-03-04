import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { MemberForm } from '@/Componets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamActions } from '@/server/actions/TeamActions';
import { getTeamUser, updateMember } from '../actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';


type PageType = {
    params: {
        locale: string;
        id: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id: targetUserId, locale } = params;

    const { authEmail } = await getUserSessionAndEmail();

    const role = await getTeamUser(targetUserId, authEmail);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <Content
                role={role}
                authEmail={authEmail}
                targetUserId={targetUserId}
                locale={locale}
            />
        </Stack>
    );
};

type ContentType = {
    role: string;
    authEmail: string;
    targetUserId: string;
    locale: string;
};

export const Content: React.FC<ContentType> = ({ role, targetUserId, authEmail, locale }) => {
    const translation = useTranslations('Form');

    return (
        <>
            <MiddlePaperWrapper title={translation('team_form.update_title')} pathBack={`/${locale}/app/add/team`}>
                <MemberForm action={updateMember} isDisabled
                    role={role}
                    userId={targetUserId}
                    authEmail={authEmail}
                    buttonConfirmLabel={translation('update')}
                    tranlsateInput={{
                        role: translation('team_form.role'),
                    }}
                />
            </MiddlePaperWrapper>
        </>
    );
};

export default Page;