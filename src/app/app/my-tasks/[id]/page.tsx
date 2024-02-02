import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { getTask, updateTask } from './actions';
import { HeaderLayout } from '@/app/Componnets/Layouts/HeaderLayout';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TaskForm } from '@/app/Componnets/Add/TaskForm';

type PageType = {
    params: {
        id: string
    },
};

const Page: React.FC<PageType> = async ({ params, ...props }) => {
    const { id: taskId } = params;

    const task = await getTask(taskId);

    console.log(task)

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
                        <input type="hidden" name="task_id" value={task._id} />
                        <TaskForm
                            defaultValues={{
                                title: task.name,
                                assignee: task.assignee,
                                description: task.description,
                                directory: task.directory,
                                dueDate: task.dueDate,
                                priority: task.priority,
                                status: task.status,
                                subtasks: task.subtasks,
                                comments: task.comments,
                            }}
                            labelConfirm='Update'
                        />
                    </form>
                </MiddlePaperWrapper>
            </Stack>
        </>
    );
};

export default Page;