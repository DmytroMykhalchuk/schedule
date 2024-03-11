import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '@/Componets/Add/styles.module.scss';
import Typography from '@mui/material/Typography';
import { generateInvite, getInvitations, removeInvite } from './actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { useTranslations } from 'next-intl';
import { InvitationsList } from '@/Componets/Add/InvitationsList';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail } = await getUserSessionAndEmail();

    const ivitiations = await getInvitations(authEmail);

    return (
        <Stack justifyContent={'center'} alignItems={'center'} spacing={2}>
            <div>
                <Content authEmail={authEmail} locale={locale} />
            </div>
            <MiddlePaperWrapper>
                <InvitationsList authEmail={authEmail} ivitiations={ivitiations}/>
            </MiddlePaperWrapper>
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
};

export const Content: React.FC<ContentType> = ({ authEmail, locale }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper pathBack={`/${locale}/app/add`} title={translation('invitation_form.add_title')}>
            <Stack alignItems={'center'} mb={2}>
                <form className={styles.formCreating} action={generateInvite}>
                    <input type="hidden" name="auth_email" value={authEmail} />
                    <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                        {translation('generate')}
                    </Button>
                </form>
            </Stack>
        </MiddlePaperWrapper>
    );
};

export default Page;