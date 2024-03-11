import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { addMember } from './actions';
import { MemberForm } from '@/Componets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamList } from '@/Componets/Add/TeamList';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { authEmail } = await getUserSessionAndEmail();
    const { locale } = params;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <div>
                <Content authEmail={authEmail} locale={locale} />
            </div>
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
};

const Content: React.FC<ContentType> = ({ authEmail, locale }) => {
    const translation = useTranslations('Form');
    return (
        <Stack spacing={2}>
            <MiddlePaperWrapper title={translation('team_form.add_title')} pathBack={`/${locale}/app/add`}>
                <div>
                    <MemberForm
                        action={addMember}
                        requiredUniqueUsers
                        buttonConfirmLabel={translation('confirm')}
                        authEmail={authEmail}
                        tranlsateInput={{
                            role: translation('team_form.role'),
                        }}
                    />
                </div>
            </MiddlePaperWrapper>
            <div>
                <TeamList authEmail={authEmail} />
            </div>
        </Stack>
    );
};

export default Page;