import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import styles from './../styles.module.scss';


const workHours = ['', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

type WeekCalendarType = {
};

export const WeekCalendar: React.FC<WeekCalendarType> = ({ }) => {
    const renderHeader = (): JSX.Element[] => {
        const days = [] as JSX.Element[];
        for (let index = 1; index < 6; index++) {
            const targetDay = dayjs().day(index);
            const monthName = targetDay.format('MMMM');
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
            items.push(
                <Grid className={styles.tableRow__td} item key={index} xs={2}
                    sx={{
                        px: 1,
                    }}
                >
                    {
                        index === 0
                            ? <>{workHours[numberOfLines]}</>
                            : workHours[numberOfLines] && numberOfLines !== workHours.length - 1 && <>
                                <TaskItem
                                    color='#0f0'
                                    task='Lorem ipsim dolor sit amet consectetur'
                                />
                            </>
                    }
                </Grid>
            )
        }
        return items;
    };

    const renderTable = () => {
        const rows = [] as JSX.Element[];
        for (let index = 0; index < workHours.length; index++) {
            rows.push(
                <Grid container key={index} className={styles.tableRow + ' ' + styles.weekCalendar} data-time={workHours[index]} columns={10}>
                    {renderRow(index)}
                </Grid>)
        }
        return rows;
    }
    return (
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
    color: string
    task: string
};

export const TaskItem: React.FC<TaskItemType> = ({ color, task }) => {

    return (
        <Typography variant="subtitle2" sx={{
            backgroundColor: color,
            borderRadius: 2,
            px: 1,
            // position: 'absolute',
            // top: 0,
            // left: 8, right: 8,
            // height:'10%',
        }}>
            {task}
        </Typography>
    );
};