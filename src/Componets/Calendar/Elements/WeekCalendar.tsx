import Box from '@mui/material/Box';
import cn from 'classnames';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { ControlPageCalendar } from './ControlPageCalendar';
import { getWeekTasks } from '../actions';
import { priorityStyling, workHours } from '@/server/constants';
import Link from 'next/link';

const formatedWorkHours = [...workHours.map(hour => `${hour}:00`)];

type WeekCalendarType = {
    date?: string;
    authEmail: string;
    locale: string;
};

export const WeekCalendar: React.FC<WeekCalendarType> = async ({ date, authEmail, locale }) => {
    const currentDate = dayjs(date);
    const tasks = await getWeekTasks(currentDate.format('YYYY-MM-DD'), authEmail);

    const renderHeader = (): JSX.Element[] => {
        const days = [] as JSX.Element[];
        for (let index = 1; index < 6; index++) {
            const targetDay = currentDate.day(index);
            const monthName = targetDay.format('dddd');
            const formattedName = monthName[0].toUpperCase() + monthName.substring(1);
            const numberOfDay = targetDay.date();

            days.push(
                <HeaderDayItem
                    key={index}
                    numberOfDay={numberOfDay}
                    monthName={formattedName}
                />
            );
        }
        return days;
    };

    const renderColumnContent = (numberOfLine: number): JSX.Element[] => {
        const items = [] as JSX.Element[];
        const dayTasks = tasks.filter(item => item.dueDate === dayjs().day(numberOfLine - 1).format('DD.MM.YYYY'));

        for (let index = 0; index < formatedWorkHours.length; index++) {
            items.push(
                <Stack
                    key={index}
                    className={cn(
                        styles.innerColumn__item,
                        styles.border
                    )}
                >

                </Stack>
            )
        }
        return items;
    };

    const renderColumn = (numberOfLine: number): JSX.Element => {
        const dayTasks = tasks.filter(item => item.dueDate === dayjs().day(numberOfLine + 1).format('DD.MM.YYYY'));

        return (
            <Grid
                className={styles.tableRow__td}
                item xs={2}
                sx={{}}
            >
                <Stack sx={{ py: 4 }}>
                    <Box className={styles.innerColumn}>
                        {renderColumnContent(numberOfLine)}
                        {dayTasks.map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task.name}
                                fromHour={task.fromHour}
                                toHour={task.toHour}
                                primaryColor={priorityStyling[task.priority].primaryColor}
                                secondaryColor={priorityStyling[task.priority].secondaryColor}
                                taskId={task._id.toString()}
                            />
                        ))}
                        {/* <Box position={'absolute'} top={0}>
                        </Box> */}
                        <Typography variant="subtitle2" sx={{
                            borderRadius: 2,
                            px: 1,
                            mb: 0.5,
                            position: 'absolute',
                            top: 0,
                        }}>
                        </Typography>
                    </Box>
                </Stack>
            </Grid>
        );
    };

    const renderTable = () => {
        const rows = [] as JSX.Element[];
        for (let index = 0; index < 5; index++) {
            rows.push(
                renderColumn(index)
            );
        }
        return (
            <Grid container columns={10} height={'100%'}>
                {rows}
            </Grid>
        );
    };

    return (
        <>
            <Grid container columns={10}>
                <Grid container columns={10} sx={{ pl: '40px' }}>
                    {renderHeader()}
                </Grid>
                <Grid item xs={10}>
                    <Stack direction={'row'}>
                        <HoursColumn />
                        <Paper sx={{
                            width: '100%',
                            borderRadius: 8,
                        }}>
                            {renderTable()}
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
            <Box pt={2}>
                <ControlPageCalendar
                    locale={locale}
                    calendarType='week'
                    nextPath={currentDate.add(1, 'week').format('YYYY-MM-DD')}
                    previousPath={currentDate.subtract(1, 'week').format('YYYY-MM-DD')}
                />
            </Box>
        </>
    );
};

type HoursColumnType = {
};

export const HoursColumn: React.FC<HoursColumnType> = ({ }) => {

    return (
        <Box sx={{}}>
            <Stack sx={{ py: 4 }}>
                <Box className={styles.innerColumn}
                    sx={{ borderTop: 'none' }}
                >
                    {
                        formatedWorkHours.map((hour, index) => (
                            <Stack
                                key={index}
                                className={cn(styles.innerColumn__item)}
                            >
                                <Typography variant="body1" sx={{ marginTop: -1.5, pr: 0.5 }}>
                                    {hour}
                                </Typography>
                            </Stack>
                        ))
                    }
                </Box>
            </Stack>
        </Box>
    );
};

type HeaderDayItemType = {
    numberOfDay: number,
    monthName: string,
};

export const HeaderDayItem: React.FC<HeaderDayItemType> = ({ numberOfDay, monthName }) => {

    return (
        <Grid item xs={2}>
            <Stack alignItems={'center'} justifyContent={'center'}>
                <Typography variant="h5" fontWeight={600}>{numberOfDay}</Typography>
                <Typography variant="h6">{monthName}</Typography>
            </Stack>
        </Grid>
    );
};

type TaskItemType = {
    primaryColor: string,
    secondaryColor: string,
    task: string,
    fromHour: number,
    toHour: number,
    taskId: string
};

export const TaskItem: React.FC<TaskItemType> = ({ primaryColor, secondaryColor, task, taskId, fromHour, toHour }) => {
    return (
        <Box
            sx={{

                mb: 0.5,
                position: 'absolute',
                top: ((fromHour - workHours[0]) * 90) - 8,
                height: ((toHour - fromHour) * 90) + 8 + 'px',
                width: '100%',
                px: 1,
            }}
        ><Link href={'/app/my-tasks/' + taskId}>
                <Typography variant="subtitle2" sx={{
                    backgroundColor: secondaryColor,
                    color: primaryColor,
                    p: 1,
                    height: '100%',
                    borderColor: '#F6EFA7',
                    borderRadius: 4,
                    borderWidth: 1,
                    borderStyle: 'solid',
                }}>
                    {task}
                </Typography >
            </Link>
        </Box>
    );
};