import Button from '@mui/material/Button';
import styles from '@/Componets/Add/styles.module.scss';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { UIInputField } from '../UI/UIInputField';
import { useTranslations } from 'next-intl';

type DirectoryCreateFormType = {
    locale: string;
    formAction: (formData: FormData) => void;
    title: string;
    type: 'create' | 'update';
    defaultValues?: {
        name: string;
        id: string;
    };
};

export const DirectoryCreateForm: React.FC<DirectoryCreateFormType> = ({ locale, formAction, title, type, defaultValues }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper
            pathBack={type==='create'?`/${locale}/app/add`:`/${locale}/app/add/directories`}
            title={translation(title)}
        >
            <form className={styles.formCreating} action={formAction}>
                {defaultValues?.id && <input type="hidden" name="directory_id" value={defaultValues.id} />}
                <UIInputField
                    label={translation('directory.directory_placeholder')}
                    name="new_directory"
                    defaultValue={defaultValues?.name}
                />
                <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                    {translation(type)}
                </Button>
            </form>
        </MiddlePaperWrapper>
    );
};