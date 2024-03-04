import Button from '@mui/material/Button';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { UIInputField } from '../UI/UIInputField';
import { useTranslations } from 'next-intl';

type InviteInputFormType = {
    locale: string;
};

export const InviteInputForm: React.FC<InviteInputFormType> = ({ locale }) => {
    const translation = useTranslations('Auth');

    return (
        <>
            <Typography variant="h6" color="warning" sx={{ color: 'warning.main' }} textAlign={'center'}>
                <Link href={`/${locale}/sign-in/create-project`}>{translation('create_project')}</Link>
            </Typography>
            <Typography variant="subtitle1" textAlign={'center'}>{translation('or')}</Typography>
            <Stack justifyContent={'center'} alignItems={'center'} mb={2}>
                <form className={styles.formEntering} action={''}>
                    <UIInputField
                        label={translation('invite_code')}
                        name="invite_id"
                        required
                    />
                    <Button variant="outlined" color="warning" sx={{ textTransform: 'none' }}>
                        {translation('confirm')}
                    </Button>
                </form>
            </Stack>
        </>
    );
};