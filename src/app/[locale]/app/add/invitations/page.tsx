import { MiddlePaperWrapper } from "@/ui/MiddlePaperWrapper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'
import styles from '@/Componets/Add/styles.module.scss';
import { generateInvite, getInvitations, removeInvite } from "./actions";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserSessionAndEmail } from "@/Componets/actions";
import { useTranslations } from "next-intl";

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
            <Content authEmail={authEmail} locale={locale} />
            <MiddlePaperWrapper>
                <Stack>
                    {
                        ivitiations.map((item, index) => (
                            <Stack direction={'row'} key={index} alignItems={'center'}>
                                <Typography variant="body1" fontWeight={600} flex={1}>{item}</Typography>
                                <form action={removeInvite}>
                                    <input type="hidden" name="auth_email" value={authEmail} />
                                    <input type="hidden" name={'invite'} value={item} />
                                    <IconButton aria-label="delete invite code" type="submit" color='warning'>
                                        <DeleteIcon />
                                    </IconButton>
                                </form>
                            </Stack>
                        ))
                    }
                </Stack>
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