import Stack from '@mui/material/Stack';
import { createTask } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TaskForm } from '@/Componets/Add/TaskForm';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { CommentBox } from '@/Componets/Add/Elements/CommentBox';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        locale: string;
    };
    searchParams: {
        task_directory_required?: string;
    };
};

const Page: React.FC<PageType> = async ({ params, searchParams }) => {
    const { locale } = params;
    const { task_directory_required: isDirectoryRequired } = searchParams;
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'}>
            <div>
                <Content authEmail={authEmail} locale={locale} isDirectoryRequired={Boolean(isDirectoryRequired)} />
            </div>
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
    isDirectoryRequired: boolean;
};

const Content: React.FC<ContentType> = ({ authEmail, locale, isDirectoryRequired }) => {
    const translation = useTranslations('MyTasks');
    return (
        <>
            <MiddlePaperWrapper
                title={translation('new_task')}
                pathBack={`/${locale}/app/add`}
            >
                <form action={createTask} >
                    <TaskForm
                        labelConfirm='create'
                        UnderFormSlot={<CommentBox />}
                        authEmail={authEmail}
                        locale={locale}
                        isDirectoryRequired={isDirectoryRequired}
                    />
                </form>
            </MiddlePaperWrapper>
        </>
    );
};

export default Page;