import styles from '@/Componets/Add/styles.module.scss';
import { ControlDirectoryForm } from './Elements/ControlDirectoryForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
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
    directoriesCount?: number;
    authEmail: string;
};

export const DirectoryCreateForm: React.FC<DirectoryCreateFormType> = ({ locale, formAction, title, authEmail, type, defaultValues, directoriesCount = 0, }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper
            pathBack={type === 'create' ? `/${locale}/app/add` : `/${locale}/app/add/directories`}
            title={translation(title)}
        >
            <form className={styles.formCreating} action={formAction}>
                {defaultValues?.id && <input type="hidden" name="directory_id" value={defaultValues.id} />}
                <input type="hidden" name="auth_email" value={authEmail} />
                <ControlDirectoryForm
                    directoryName={defaultValues?.name}
                    dictionary={{
                        confirm: translation(type),
                        directoryPlaceholder: translation('directory.directory_placeholder'),
                    }}
                    directoriesCount={directoriesCount}
                />
            </form>
        </MiddlePaperWrapper>
    );
};