import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import styles from './../styles.module.scss';
import { getDaysWithCurrentMonth } from '../actions';
import { ControlPageCalendar } from './ControlPageCalendar';

type MonthCalendarType = {
    date?: string;
    authEmail: string;
    locale: string;
};

export const MonthCalendar: React.FC<MonthCalendarType> = async ({ date, authEmail, locale }) => {
    const currentDate = dayjs(date);
    const dateRequested = `${currentDate.year()}-${currentDate.month() + 1}-1`
    const startMonthDay = dayjs(dateRequested).date(1).day();
    const totalDays = dayjs(dateRequested).daysInMonth();
    const selectedDays = await getDaysWithCurrentMonth(currentDate.format('DD.MM.YYYY'), authEmail);

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
                            ? <HeaderDayItem numberOfDay={startMonthDay <= index ? rangeDay : ''} hasTask={selectedDays.includes(rangeDay)} isHeaderIndex={index} />
                            : rangeDay <= totalDays ? <HeaderDayItem numberOfDay={rangeDay} hasTask={selectedDays.includes(rangeDay)} /> : ''
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
        <>
            <Grid container columns={7} mb={2}
            >
                <Paper sx={{
                    width: '100%',
                    borderRadius: 6,
                }}>
                    {renderTable()}
                </Paper>
            </Grid>
            <ControlPageCalendar
                locale={locale}
                calendarType='month'
                nextPath={currentDate.add(1, 'month').format('YYYY-MM-DD')}
                previousPath={currentDate.subtract(1, 'month').format('YYYY-MM-DD')}
            />
        </>
    );
};

type HeaderDayItemType = {
    numberOfDay: number | string,
    hasTask: boolean,
    isHeaderIndex?: number
};

export const HeaderDayItem: React.FC<HeaderDayItemType> = ({ numberOfDay, hasTask, isHeaderIndex }) => {
    const currentDate = dayjs();

    return (
        <Stack alignItems={'center'} justifyContent={'center'} width={'100%'}>
            {isHeaderIndex && <Typography variant="h6" fontWeight={600} textAlign={'center'}>{currentDate.day(isHeaderIndex).format('dd')}</Typography>}
            <Typography variant="subtitle1" textAlign={'center'}>{numberOfDay}</Typography>
            {
                hasTask && <Box
                    sx={{
                        backgroundColor: 'warning.main',
                        width: 6,
                        aspectRatio: 1,
                        borderRadius: '50%',
                    }}
                />
            }
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