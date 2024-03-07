import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { AddTaskButton } from './AddTaskButton';
import { CommentDialog } from '@/Componets/Comment/CommentDialog';
import { CommentType } from '@/server/actions/types';
import { cookies } from 'next/headers';
import { getTask, updateTask } from './actions';
import { getUserSessionAndEmail } from '../actions';
import { HeaderLayout } from '@/Componets/Layouts/HeaderLayout';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { Notification } from '../Common/Notification';
import { projectIdCookieKey } from '@/server/constants';
import { TaskForm } from '@/Componets/Add/TaskForm';
import { useTranslations } from 'next-intl';

type TaskEditPageType = {
    taskId: string;
    locale: string;
    isDirectoryRequired: boolean;
    isUpdated?: boolean;
    isNotAvailableDate: boolean;
};

export const TaskEditPage: React.FC<TaskEditPageType> = async ({ taskId, locale, isDirectoryRequired, isUpdated, isNotAvailableDate }) => {
    const { authEmail, session } = await getUserSessionAndEmail()

    const response = await getTask(taskId, authEmail);
    const { task, comments } = response;

    return (
        <>
            {isUpdated && <NotificationWrapper />}
            <HeaderLayout
                title="task"
                pageName='MyTasks'
                isCenter
                authUser={{
                    name: session?.user?.name!,
                    image: session?.user?.image!,
                }}
            />
            <Stack alignItems={'centre'} justifyContent={'center'} spacing={2}>
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
                                directory: task?.directory || '',
                                dueDate: task.dueDate,
                                priority: task.priority,
                                status: task.status,
                                subtasks: task.subtasks,
                                fromHour: task.fromHour,
                                toHour: task.toHour,
                                categoryId: task.categoryId,
                                comments: [],
                            }}
                            labelConfirm='update'
                            authEmail={authEmail}
                            locale={locale}
                            isDirectoryRequired={isDirectoryRequired}
                            isNotAvailableDate={isNotAvailableDate}
                        />
                        <input type="hidden" name="task_id" value={task?._id?.toString() || ''} />
                    </form>
                    <div>
                        <CommentDialogWrapper
                            authEmail={authEmail}
                            taskId={task._id}
                            comments={comments}
                        />
                    </div>
                </MiddlePaperWrapper >
                <div>
                    <AddTaskButton />
                </div>
            </Stack >
        </>
    );
};

type CommentDialogWrapperType = {
    authEmail: string;
    taskId: string;
    comments: CommentType[];
};

export const CommentDialogWrapper: React.FC<CommentDialogWrapperType> = ({ taskId, authEmail, comments }) => {
    const translation = useTranslations('MyTasks');
    return (
        <Box px={2}>
            <CommentDialog
                comments={comments}
                taskId={taskId}
                projectId={cookies().get(projectIdCookieKey)?.value as string}
                authEmail={authEmail}
                dictionary={{
                    replyToMessage: translation('reply_to_message'),
                    replyToUser: translation('reply_to_user'),
                }}
            />
        </Box>
    );
};

const NotificationWrapper = () => {
    const translation = useTranslations("Notifications");
    return (
        <Notification message={translation('succesfully_updated')} />
    );
};