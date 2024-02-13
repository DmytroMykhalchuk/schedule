import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { ControlPageCalendar } from './ControlPageCalendar';
import { getWeekTasks } from '../actions';
import { priorityStyling, workHours } from '@/server/constants';

const formatedWorkHours = ['', ...workHours.map(hour => `${hour}:00`)];
const weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
type WeekCalendarType = {
    date?: string
};

export const WeekCalendar: React.FC<WeekCalendarType> = async ({ date }) => {
    const currentDate = dayjs(date);
    const tasks = await getWeekTasks(currentDate.format('YYYY-MM-DD'));

    const renderHeader = (): JSX.Element[] => {
        const days = [] as JSX.Element[];
        for (let index = 1; index < 6; index++) {
            const targetDay = currentDate.day(index);
            const monthName = weekdays[index];
            const formattedName = monthName[0].toUpperCase() + monthName.substring(1);
            const numberOfDay = targetDay.date();

            days.push(
                <HeaderDayItem
                    key={index}
                    numberOfDay={numberOfDay}
                    monthName={formattedName}
                />
            )
        }
        return days;
    };

    const renderRow = (numberOfLines: number): JSX.Element[] => {
        const items = [] as JSX.Element[];
        for (let index = 1; index < 6; index++) {
            const dayTasks = tasks.filter(item => item.dueDate === dayjs().day(index).format('DD.MM.YYYY'));

            items.push(
                <Grid className={styles.tableRow__td} item key={index} xs={2}
                    sx={{
                        px: 1,
                    }}
                >
                    {
                        index === 0
                            ? <>{formatedWorkHours[numberOfLines]}</>
                            : formatedWorkHours[numberOfLines] && numberOfLines !== formatedWorkHours.length - 1 && <>
                                {
                                    dayTasks.map(task => (
                                        <TaskItem
                                            task={task.name}
                                            primaryColor={priorityStyling[task.priority].primaryColor}
                                            secondaryColor={priorityStyling[task.priority].secondaryColor}
                                        />
                                    ))
                                }
                            </>
                    }
                </Grid>
            );
        }
        return items;
    };

    const renderTable = () => {
        const rows = [] as JSX.Element[];
        for (let index = 0; index < formatedWorkHours.length; index++) {
            rows.push(
                <Grid container key={index} className={styles.tableRow + ' ' + styles.weekCalendar} data-time={formatedWorkHours[index]} columns={10}>
                    {renderRow(index)}
                </Grid>)
        }
        return rows;
    }
    return (
        <>
            <Grid container columns={10}
                sx={{
                    //calculated from data-time left attribute
                    marginLeft: '50px',
                }}
            >
                {renderHeader()}
                <Paper sx={{
                    width: '100%',
                    borderRadius: 8,
                }}>
                    {renderTable()}
                </Paper>
            </Grid>
            <Box pt={2}>
                <ControlPageCalendar
                    calendarType='week'
                    nextPath={currentDate.add(1, 'week').format('YYYY-MM-DD')}
                    previousPath={currentDate.subtract(1, 'week').format('YYYY-MM-DD')}
                />
            </Box>
        </>
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
    primaryColor: string
    secondaryColor: string
    task: string
};

export const TaskItem: React.FC<TaskItemType> = ({ primaryColor, secondaryColor, task }) => {

    return (
        <Typography variant="subtitle2" sx={{
            backgroundColor: secondaryColor,
            color: primaryColor,
            borderRadius: 2,
            px: 1,
            mb: 0.5,
        }}>
            {task}
        </Typography>
    );
};