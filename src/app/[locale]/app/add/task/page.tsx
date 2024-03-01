import Stack from '@mui/material/Stack';
import { CommentField } from '@/Componets/Add/Elements/CommentField';
import { createTask } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TaskForm } from '@/Componets/Add/TaskForm';
import { getUserSessionAndEmail } from '@/Componets/actions';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'}>
            <MiddlePaperWrapper
                title='New task'
                pathBack='/app/add'
            >
                <form action={createTask} >
                    <Stack direction={'row'} sx={{ p: 2, pt: 0 }}>
                    </Stack>
                    <TaskForm defaultValues={{}}
                        labelConfirm='Confirm'
                        UnderFormSlot={<CommentField />}
                        authEmail={authEmail}
                    />
                </form>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;