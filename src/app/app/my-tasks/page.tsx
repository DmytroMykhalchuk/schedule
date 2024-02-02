import { HeaderLayout } from "@/app/Componnets/Layouts/HeaderLayout";
import { getMyTasks } from "./actions";
import dayjs from "dayjs";
import { PaperWrapper } from "@/app/Componnets/MyTasks/PaperWrapper";
import { TaskShortType } from "@/server/actions/TaskActions";
import Stack from "@mui/material/Stack";

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {

    const tasks = await getMyTasks();

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
            dateStamp: dayjs().add(1, 'day'),
            tasks: [] as TaskShortType[],
        },
        previous: {
            dateStamp: dayjs(),
            tasks: [] as TaskShortType[],
        },
    };

    tasks.forEach(task => {
        const dueDate = dayjs(task.dueDate);

        if (dueDate.isSame(taskFiltered.today.dateStamp, 'day')) {
            //today
            taskFiltered.today.tasks.push(task);
        } else if (dueDate.isSame(taskFiltered.tomorrow.dateStamp, 'day')) {
            //tomorrow
            taskFiltered.tomorrow.tasks.push(task);
        } else if (dueDate.diff(taskFiltered.next.dateStamp.diff(dueDate))) {
            //prev
            taskFiltered.previous.tasks.push(task);
        } else {
            //next
            taskFiltered.next.tasks.push(task);
        }
    });

    return (
        <>
            <HeaderLayout title="My tasks" subtitle="" />
            <Stack spacing={4}>
                <PaperWrapper tasks={taskFiltered.today.tasks} title="Today" />
                <PaperWrapper tasks={taskFiltered.tomorrow.tasks} title="Tommorow" />
                <PaperWrapper tasks={taskFiltered.next.tasks} title="This week" subtasks={{
                    tasks:taskFiltered.previous.tasks,
                    title:'Later'
                }} isGeneralTask />

            </Stack>
        </>
    );
};

export default Page;