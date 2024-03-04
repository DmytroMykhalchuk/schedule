import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { UIInputField } from '../UI/UIInputField';
import { useTranslations } from 'next-intl';
import { createProject } from '@/app/[locale]/sign-in/create-project/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type ProjectFormType = {
    authEmail: string;
    locale: string;
};

export const ProjectForm: React.FC<ProjectFormType> = ({ authEmail, locale }) => {
    const translation = useTranslations("Form");

    return (
        <MiddlePaperWrapper pathBack={`/${locale}/sign-in`} title={translation('project_form.title')} >
            <form className={styles.formCreating} action={createProject}>
                <input type="hidden" name="auth_email" value={authEmail} />
                <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
                    <UIInputField
                        label={translation('project_form.project_name')}
                        name='new_project_name'
                        required
                    />
                    <Button variant="outlined" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                        {translation('confirm')}
                    </Button>
                </Stack>
            </form>
        </MiddlePaperWrapper>
    );
};