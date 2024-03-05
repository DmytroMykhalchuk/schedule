import Button from '@mui/material/Button';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { UIInputField } from '../UI/UIInputField';
import { useTranslations } from 'next-intl';
import { useCodeInvite } from '@/app/[locale]/sign-in/actions';

type InviteInputFormType = {
    locale: string;
    authEmail: string;
};

export const InviteInputForm: React.FC<InviteInputFormType> = ({ locale, authEmail }) => {
    const translation = useTranslations('Auth');

    return (
        <>
            <Typography variant="h6" color="warning" sx={{ color: 'warning.main' }} textAlign={'center'}>
                <Link href={`/${locale}/sign-in/create-project`}>{translation('create_project')}</Link>
            </Typography>
            <Typography variant="subtitle1" textAlign={'center'}>{translation('or')}</Typography>
            <Stack justifyContent={'center'} alignItems={'center'} mb={2}>
                <form className={styles.formEntering} action={useCodeInvite}>
                    <input type="hidden" name="auth_email" value={authEmail} />
                    <UIInputField
                        label={translation('invite_code')}
                        name="invite_id"
                        required
                    />
                    <Button variant="outlined" color="warning" type='submit' sx={{ textTransform: 'none' }}>
                        {translation('confirm')}
                    </Button>
                </form>
            </Stack>
        </>
    );
};