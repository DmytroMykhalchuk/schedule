import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { CommentDialog } from '@/app/Componnets/Comment/CommentDialog';
import { cookies } from 'next/headers';
import { getTask, updateTask } from './actions';
import { HeaderLayout } from '@/app/Componnets/Layouts/HeaderLayout';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { projectIdCookieKey } from '@/server/constants';
import { TaskForm } from '@/app/Componnets/Add/TaskForm';
import Link from 'next/link';

type PageType = {
    params: {
        id: string
    },
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id: taskId } = params;

    const response = await getTask(taskId);
    const { task, comments } = response;

    return (
        <>
            <HeaderLayout
                title="Task"
                subtitle=""
                isCenter
            />
            <Stack alignItems={'centre'} justifyContent={'center'}>
                <MiddlePaperWrapper>
                    <form>
                        <Stack direction={'row'} sx={{ p: 2, pt: 0, width: '100%', }} justifyContent={'end'}>
                            <Link href={'delete'}>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="edit" color='warning'>
                                        <DeleteIcon sx={{ fontSize: '1.2em' }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Stack>
                    </form>
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
                                categoryId: task.categoryId,
                            }}
                            labelConfirm='Update'
                        />
                        <input type="hidden" name="task_id" value={task?._id?.toString() || ''} />
                    </form>
                    <Box px={2}>
                        <CommentDialog
                            comments={comments}
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