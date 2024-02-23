'use client'
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import useDebounce from '@/utlis/useDebounce';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authCookieKey, projectIdCookieKey, workHours } from '@/server/constants';
import { getCookieValue } from '@/utlis/getCookieValue';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useEffect, useRef, useState } from 'react';
import { HourSelect } from './HourSelect';
import { CalendarActionBar } from './CalendarActionBar';
import { CalendarToolbar } from './CalendarToolbar';
import { getCheckedWeekDay } from '@/utlis/getCheckedWeekDay';
import { translateDateToDayjs } from '@/utlis/translateDateToDayjs';
import { useSelector } from 'react-redux';
import { getTaskFormAssignee } from '@/redux/task/taskSelector';

dayjs.locale(uk)

type WorkHoursType = {
    fromHour: number,
    toHour: number,
};

const getAllowedHours = (date: Dayjs, userId?: string | null, taskId?: string) => {

    const projectId = getCookieValue(projectIdCookieKey);
    const sessionJson = getCookieValue(authCookieKey) || '';
    const session = JSON.parse(decodeURIComponent(sessionJson) || '{}');
    const sessionId = session?.sessionId || '';

    return axios.get('/api/tasks-alowed-hours/', {
        params: {
            project_id: projectId,
            session_id: sessionId,
            date: date.format('DD.MM.YYYY'),
            task_id: taskId,
            user_id: userId,
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return {
            code: 500,
            error,
        };
    })

};

type FormElementDateType = {
    defaultDueDate?: string
    fromHour?: number,
    toHour?: number,
    taskId?: string
};

export const FormElementDate: React.FC<FormElementDateType> = ({ defaultDueDate, fromHour, toHour, taskId }) => {
    const isAllowedMakeHoursRequest = useRef(false);

    const assignee = useSelector(getTaskFormAssignee);

    const [date, setDate] = useState(getCheckedWeekDay(defaultDueDate ? translateDateToDayjs(defaultDueDate) : dayjs()));
    const [hasForbiddenDate, setHasForbiddenDate] = useState({ isError: false, formattedDay: '' });
    const [allowedHours, setAllowedHours] = useState(workHours.slice(0, 2));
    const [selectedWorkHours, setSelectedWorkHours] = useState({ fromHour: fromHour || 0, toHour: toHour || 0 })
    const [isFetchedHours, setIsFetchedHours] = useState(false);
    const [chunkHours, setChunkHours] = useState([] as number[][]);

    const debounceDate = useDebounce(date, 1000);

    useEffect(() => {
        if (!debounceDate || !isAllowedMakeHoursRequest.current) {
            if (!isAllowedMakeHoursRequest.current) {
                isAllowedMakeHoursRequest.current = true;
            }
            return;
        }

        const fetchData = async () => {
            const response = await getAllowedHours(date, assignee, taskId);
            if (!(response?.code === 200 && response?.data)) return;
            deChunkAllowedHours(response.data);
            setAllowedHours(response.data);
            setIsFetchedHours(true);

            selectedWorkHours.fromHour === 0 && setSelectedWorkHours({
                fromHour: response.data[0],
                toHour: response.data[1],
            });
        };

        fetchData();

    }, [debounceDate]);

    useEffect(() => {

    }, []);

    const deChunkAllowedHours = (hours: number[]) => {
        const ranges = [] as number[][];
        let subrange = [] as number[];

        let nextValue = hours[0];
        // debugger;
        for (let index = 0; index < hours.length; index++) {
            if (hours[index] !== nextValue) {
                if (subrange.length) {
                    ranges.push(subrange);
                    subrange = [hours[index]];
                }
                nextValue = hours[index] + 1;
                continue;
            }
            nextValue = hours[index] + 1;
            subrange.push(hours[index]);
        }
        if (subrange.length) {
            ranges.push(subrange);
            subrange = [];
        }

        setChunkHours(ranges);
    };

    const onChangeDate = (selectedDay: dayjs.Dayjs | null) => {
        if (!selectedDay) {
            return;
        }

        if (selectedDay.day(0).isSame(selectedDay, 'day') || selectedDay.day(6).isSame(selectedDay, 'day')) {
            setHasForbiddenDate({
                isError: true,
                formattedDay: date.format('DD.MM.YYYY'),
            });
            if (!selectedDay.isSame(date, 'day'))
                setDate(getCheckedWeekDay(selectedDay));
            return;
        }
        hasForbiddenDate.isError && setHasForbiddenDate({ isError: false, formattedDay: '' })
        setDate(selectedDay);
    };

    const onChangeHourFrom = (fromHour: number) => {
        const chunk = chunkHours.find(chunk => chunk.includes(fromHour)) || [];
        let toHour: number;

        if (chunk.indexOf(selectedWorkHours.toHour) === -1) {
            toHour = chunk[chunk.indexOf(fromHour) + 1];
        } else {
            toHour = fromHour < selectedWorkHours.toHour
                ? selectedWorkHours.toHour
                : fromHour + 1;
        }

        setSelectedWorkHours((prev: WorkHoursType) => ({
            fromHour,
            toHour: toHour,
        }));
    };

    const onChangeHourTo = (toHour: number) => {
        setSelectedWorkHours((prev: WorkHoursType) => ({
            toHour,
            fromHour: prev.fromHour >= toHour
                ? allowedHours.indexOf(toHour - 1) != -1 ? toHour - 1 : toHour
                : prev.fromHour,
        }));
    };

    const getAllowedToHourValues = () => {
        const allowedValues = [];
        let prevValue = selectedWorkHours.fromHour;
        for (let index = allowedHours.indexOf(selectedWorkHours.fromHour) + 1; index < allowedHours.length; index++) {
            if (prevValue + 1 !== allowedHours[index]) {
                break;
            }
            prevValue = allowedHours[index];
            allowedValues.push(allowedHours[index]);
        }
        return allowedValues;
    };

    const getAllowedFromHourValues = () => {
        const allowedValues = [] as number[];
        for (let index = 0; index < allowedHours.length - 1; index++) {

            if (allowedHours[index + 1] !== allowedHours[index] + 1) {
                continue;
            }
            allowedValues.push(allowedHours[index]);
        }

        return allowedValues;
    };


    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>Due date</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <Stack direction={'row'} spacing={1}>
                    <Stack alignItems={'start'}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
                            <MobileDatePicker
                                name="due_date"
                                minDate={taskId ? undefined : dayjs()}
                                value={date}
                                onChange={onChangeDate}
                                closeOnSelect
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        color: 'warning',
                                    },
                                    day: {
                                        sx: {
                                            '&.Mui-selected': {
                                                background: 'green',
                                            },
                                        },
                                    },
                                    dialog: {
                                        sx: {
                                            borderRadius: 36,
                                            '& .MuiDialog-container>.MuiPaper-root': {
                                                borderRadius: 5,
                                            },
                                        },
                                    },
                                    layout: {
                                        sx: {
                                            borderRadius: 36,
                                        },
                                    },
                                }}
                                slots={{
                                    actionBar: CalendarActionBar,
                                    toolbar: CalendarToolbar,
                                }}
                            />
                        </LocalizationProvider>
                        {hasForbiddenDate.isError && <Typography variant="caption" color="error">This date: {hasForbiddenDate.formattedDay} not allowed</Typography>}
                    </Stack>
                    {
                        isFetchedHours &&
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <HourSelect allowedHours={getAllowedFromHourValues()} onChange={onChangeHourFrom} value={selectedWorkHours.fromHour || allowedHours[0]} name="from_hour" />
                            <Typography variant="body1" component='div'>-</Typography>
                            <HourSelect allowedHours={getAllowedToHourValues()} onChange={onChangeHourTo} value={selectedWorkHours.toHour || allowedHours[1]} name="to_hour" />
                        </Stack>
                    }
                </Stack>
            </Grid>
        </Grid>
    );
};
