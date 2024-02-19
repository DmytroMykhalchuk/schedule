import Stack from '@mui/material/Stack';
import { CommentField } from '@/app/Componnets/Add/Elements/CommentField';
import { createTask } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TaskForm } from '@/app/Componnets/Add/TaskForm';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
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
                    />
                </form>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;