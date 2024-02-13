import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { CommentContainer } from '@/app/Componnets/Add/Elements/CommentsBox';
import { CommentDialog } from '@/app/Componnets/Comment/CommentDialog';
import { cookies } from 'next/headers';
import { getTask, updateTask } from './actions';
import { HeaderLayout } from '@/app/Componnets/Layouts/HeaderLayout';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { projectIdCookieKey } from '@/server/constants';
import { TaskForm } from '@/app/Componnets/Add/TaskForm';

type PageType = {
    params: {
        id: string
    },
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id: taskId } = params;

    const response = await getTask(taskId);
    const { task, comments } = response;

    const handledComments = comments.map(item => {
        return {
            _id: item._id.toString(),
            name: item.name,
            picture: item.picture,
            userId: item.userId,
            isOwner: item.isOwner,
            text: item.text,
            replyId: item.replyId,
        };
    });

    return (
        <>
            <HeaderLayout
                title="Task"
                subtitle=""
                isCenter
            />
            <Stack alignItems={'centre'} justifyContent={'center'}>
                <MiddlePaperWrapper>
                    <Stack direction={'row'} sx={{ p: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            {/* <IconButton aria-label="delete" href='#'>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" href='#'>
                            <EditIcon />
                        </IconButton> */}
                        </Box>
                        {/* <Link href={'/app/add'}>
                            <IconButton aria-label="edit">
                                <CloseIcon />
                            </IconButton>
                        </Link> */}
                    </Stack>
                    <form action={updateTask}>
                        <TaskForm
                            defaultValues={{
                                taskId: task?._id.toString(),
                                title: task.name,
                                assignee: task.assignee,
                                description: task.description,
                                directory: task.directory,
                                dueDate: task.dueDate,
                                priority: task.priority,
                                status: task.status,
                                subtasks: task.subtasks,
                                fromHour: task.fromHour,
                                toHour: task.toHour,
                            }}
                            labelConfirm='Update'
                        />
                        <input type="hidden" name="task_id" value={task?._id?.toString() || ''} />
                    </form>
                    <Box px={2}>
                        <CommentDialog
                            comments={handledComments}
                            taskId={task._id.toString()}
                            projectId={cookies().get(projectIdCookieKey)?.value as string}
                        />
                    </Box>
                </MiddlePaperWrapper>
            </Stack>
        </>
    );
};

export default Page;