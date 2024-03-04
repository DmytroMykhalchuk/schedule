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
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'}>
            <Content authEmail={authEmail} locale={locale} />
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
};

const Content: React.FC<ContentType> = ({ authEmail, locale }) => {
    const translation = useTranslations('MyTasks');
    return (
        <>
            <MiddlePaperWrapper
                title={translation('new_task')}
                pathBack={`/${locale}/app/add`}
            >
                <form action={createTask} >
                    <Stack direction={'row'} sx={{ p: 2, pt: 0 }}>
                    </Stack>
                    <TaskForm
                        labelConfirm='create'
                        UnderFormSlot={<CommentBox />}
                        authEmail={authEmail}
                    />
                </form>
            </MiddlePaperWrapper>
        </>
    );
};

export default Page;