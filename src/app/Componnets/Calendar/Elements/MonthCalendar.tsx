import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { ReactNode, useRef } from 'react';
import Typography from '@mui/material/Typography';
import styles from './../styles.module.scss';

const weekdaysMin = ['',"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type MonthCalendarType = {
};

export const MonthCalendar: React.FC<MonthCalendarType> = ({ }) => {
    const currentDate = new Date();
    const dateRequested = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-1`
    const startMonthDay = dayjs(dateRequested).date(1).day();
    const totalDays = dayjs(dateRequested).daysInMonth();

    let isBreakRendreWeeks = true;
    let rangeDay = 1;

    const renderRow = (numberOfWeek: number): JSX.Element[] => {
        const items = [] as JSX.Element[];
        for (let index = 1; index <= 7; index++) {

            items.push(
                <Grid className={styles.tableRow__td} item key={rangeDay} xs={1}
                    sx={{
                        px: 1,
                    }}
                >

                    {
                        numberOfWeek === 0
                            ? <HeaderDayItem numberOfDay={startMonthDay <= index ? rangeDay : ''} tasks='' isHeaderIndex={index} />
                            : rangeDay <= totalDays ? <HeaderDayItem numberOfDay={rangeDay} tasks='' /> : ''
                    }

                </Grid>
            );
            if ((numberOfWeek === 0 && startMonthDay <= index) || numberOfWeek != 0) {
                rangeDay++;
            }

        }
        if (rangeDay >= totalDays) {
            isBreakRendreWeeks = false;
        }
        return items;
    };

    const renderTable = () => {
        const rows = [] as JSX.Element[];
        let counter = 0;
        while (isBreakRendreWeeks) {
            rows.push(
                <Grid container key={counter} className={styles.tableRow} columns={7}>
                    {renderRow(counter)}
                </Grid>
            );
            counter++;
        }
        return rows;
    }

    return (
        <Grid container columns={7}
        >
            <Paper sx={{
                width: '100%',
                borderRadius: 6,
            }}>
                {renderTable()}
            </Paper>
        </Grid>
    );
};

type HeaderDayItemType = {
    numberOfDay: number | string,
    tasks: string,
    isHeaderIndex?: number
};

export const HeaderDayItem: React.FC<HeaderDayItemType> = ({ numberOfDay, tasks, isHeaderIndex }) => {

    return (
        <Stack alignItems={'center'} justifyContent={'center'} width={'100%'}>
            {isHeaderIndex && <Typography variant="h6" fontWeight={600} textAlign={'center'}>{weekdaysMin[isHeaderIndex]}</Typography>}
            <Typography variant="subtitle1" textAlign={'center'}>{numberOfDay}</Typography>
            {/* <Typography variant="h6">{tasks}</Typography> */}
        </Stack>
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