import { TaskShortType } from "@/server/actions/TaskActions";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import { TaskRowItem } from "./TaskRowItem";
import { StyleRangeType, priorityStyling, statusStyling, taskDayPropertyStyle } from "@/server/constants";

const datePointStyle = {
    [dayjs().format('YYYY.MM.DD')]: taskDayPropertyStyle.today,
    [dayjs().add(1, 'day').format('YYYY.MM.DD')]: taskDayPropertyStyle.today,
    ...taskDayPropertyStyle,
};

const weekMapNames = {
    [dayjs().day(1).format('YYYY.MM.DD')]: 'monday',
    [dayjs().day(2).format('YYYY.MM.DD')]: 'tuesday',
    [dayjs().day(3).format('YYYY.MM.DD')]: 'wednesday',
    [dayjs().day(4).format('YYYY.MM.DD')]: 'thursday',
    [dayjs().day(5).format('YYYY.MM.DD')]: 'friday',

};

const relativePointNames = {
    [dayjs().format('YYYY.MM.DD')]: 'today',
    [dayjs().add(1, 'day').format('YYYY.MM.DD')]: 'tomorrow',
};

type PaperWrapperType = {
    title: string,
    tasks: TaskShortType[],
    subtasks?: {
        title: string,
        tasks: TaskShortType[],
    },
    isGeneralTask?: boolean
};

export const PaperWrapper: React.FC<PaperWrapperType> = ({ title, tasks, subtasks, isGeneralTask }) => {

    const renderSubtasks = () => {
        return (
            <>
                <Divider variant="fullWidth" orientation="horizontal" flexItem sx={{ fontSize: '1.25em' }} >
                    {subtasks?.title}
                </Divider>
                <Stack spacing={2} pt={2}>
                    {subtasks?.tasks.map((task, index) => {
                        const priorityProps = priorityStyling[task.priority] as StyleRangeType;
                        const styleProps = statusStyling[task.status] as StyleRangeType;
                        //@ts-ignore
                        const dateColor = (isGeneralTask ? datePointStyle[task.priority] : datePointStyle[task.dueDate]) as string;
                        const dateName = isGeneralTask ? weekMapNames[task.dueDate] : relativePointNames[task.dueDate];

                        return (
                            <TaskRowItem key={index}
                                taskId={task.taskId}
                                datePoint={{ color: dateColor, label: dateName }}
                                name={task.name}
                                priority={priorityProps}
                                status={styleProps}
                            />
                        )
                    })}
                </Stack>
            </>
        );
    };

    return (
        <>
            <Paper sx={{ p: 2, borderRadius: 4 }}>
                <Typography variant="h5" fontWeight={600}>{title}</Typography>
                {
                    tasks?.length > 0
                        ? <Stack spacing={2}>
                            {tasks.map((task, index) => {
                                const priorityProps = priorityStyling[task.priority] as StyleRangeType;
                                const styleProps = statusStyling[task.status] as StyleRangeType;
                                //@ts-ignore
                                const dateColor = (isGeneralTask ? datePointStyle[task.priority] : datePointStyle[task.dueDate]) as string;
                                const dateName = isGeneralTask ? weekMapNames[task.dueDate] : relativePointNames[task.dueDate];
                                console.log(task)
                                return (
                                    <TaskRowItem key={index}
                                        taskId={task.taskId}
                                        datePoint={{ color: dateColor, label: dateName }}
                                        name={task.name}
                                        priority={priorityProps}
                                        status={styleProps}
                                    />
                                )
                            })}
                            {subtasks?.tasks && renderSubtasks()}
                        </Stack>
                        : <>
                            <Stack justifyContent={'center'} alignItems={'center'} p={3}>
                                <Typography variant="h6">{'No tasks'}</Typography>
                            </Stack>
                            {subtasks?.tasks && renderSubtasks()}
                        </>
                }
            </Paper>
        </>
    );
};

