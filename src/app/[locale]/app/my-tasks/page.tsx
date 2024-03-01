import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { getMyTasks } from './actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { HeaderLayout } from '@/Componets/Layouts/HeaderLayout';
import { PaperWrapper } from '@/Componets/MyTasks/PaperWrapper';
import { TaskShortType } from '@/server/actions/types';

dayjs.extend(customParseFormat)

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail, session } = await getUserSessionAndEmail();
    const tasks = await getMyTasks(authEmail);

    const taskFiltered = {
        today: {
            dateStamp: dayjs(),
            tasks: [] as TaskShortType[],
        },
        tomorrow: {
            dateStamp: dayjs().add(1, 'day'),
            tasks: [] as TaskShortType[],
        },
        next: {
            dateStamp: dayjs().add(2, 'day'),
            tasks: [] as TaskShortType[],
        },
        previous: {
            dateStamp: dayjs(),
            tasks: [] as TaskShortType[],
        },
    };

    tasks.forEach(task => {
        const dueDate = dayjs(task.dueDate, 'DD.MM.YYYY');

        if (dueDate.isSame(taskFiltered.today.dateStamp, 'day')) {
            //today
            taskFiltered.today.tasks.push(task);
        } else if (dueDate.isSame(taskFiltered.tomorrow.dateStamp, 'day')) {
            //tomorrow
            taskFiltered.tomorrow.tasks.push(task);
        } else if (taskFiltered.previous.dateStamp.diff(dueDate) > 0) {
            //prev
            taskFiltered.previous.tasks.push(task);
        } else {
            //next
            taskFiltered.next.tasks.push(task);
        }
    });

    return (
        <>
            <HeaderLayout title="My tasks" subtitle=""
                authUser={{
                    name: session?.user?.name || '',
                    image: session?.user?.image || '',
                }}
            />
            <Stack spacing={4}>
                <PaperWrapper tasks={taskFiltered.today.tasks} title="Today" />
                <PaperWrapper tasks={taskFiltered.tomorrow.tasks} title="Tommorow" />
                <PaperWrapper tasks={taskFiltered.next.tasks} title="This week"
                    subtasks={taskFiltered.previous.tasks.length ? {
                        tasks: taskFiltered.previous.tasks,
                        title: 'Later'
                    } : undefined} isGeneralTask />

            </Stack>
        </>
    );
};

export default Page;