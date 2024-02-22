'use client';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { UIPaper } from '@/ui/UIPaper';
import { useMemo, useRef, useState } from 'react';
import { WorkHours } from '@/server/actions/types';
import { WorkHoursChart } from './Elements/WorkHoursChart';
import { weekLength, yearMonthLength } from '@/server/constants';

dayjs.locale(uk);

const currentDate = dayjs();
const days = Array.from({ length: weekLength }).map((_, index) => currentDate.day(index + 1).format('dd'))
const months = Array.from({ length: yearMonthLength }).map((_, index) => currentDate.subtract(index, 'month').format('MMM')).reverse()

const weekAxisHours = [0, 2, 4, 6, 8];
const monthAxisHours = [0, 40, 80, 120, 160, 200];


type TotalWorkingHoursType = {
    weekWorkHours?: WorkHours,
    monthWorkHours?: WorkHours,
};

export const TotalWorkingHours: React.FC<TotalWorkingHoursType> = ({ weekWorkHours, monthWorkHours }) => {
    const [length, setLength] = useState(weekLength as typeof weekLength | typeof yearMonthLength);
    const [subtitles, setSubtitles] = useState(days as string[]);

    const monthHours = useMemo(() => {
        let total = 0;
        let count = 0;

        for (const monthNumber in monthWorkHours) {
            if (Object.prototype.hasOwnProperty.call(monthWorkHours, monthNumber)) {
                const element = monthWorkHours[monthNumber];
                total += element;
                count++;
            }
        }

        return { total, avarage: total / count };
    }, [monthWorkHours]);

    const weekHours = useMemo(() => {
        let total = 0;
        let count = 0;
        for (const numberOfDay in weekWorkHours) {
            if (Object.prototype.hasOwnProperty.call(weekWorkHours, numberOfDay)) {
                const element = weekWorkHours[numberOfDay];
                total += element;
                count++;
            }
        }
        return { total, avarage: total / count };
    }, [weekWorkHours]);

    const handleChange = (event: SelectChangeEvent) => {
        const choosedValue = +event.target.value;

        if (choosedValue === weekLength) {
            setSubtitles(days);
            setLength(choosedValue);
        } else if (choosedValue === yearMonthLength) {
            setSubtitles(months);
            setLength(choosedValue);
        }
    };

    const renderSelect = (): JSX.Element => {
        return (
            <Select
                value={length.toString()}
                onChange={handleChange}
                size='small'
                color='warning'
            >
                <MenuItem value={weekLength}>Week</MenuItem>
                <MenuItem value={yearMonthLength}>Year</MenuItem>
            </Select>
        );
    };

    return (
        <>
            <UIPaper title="Total working hours"
                titleSlot={renderSelect()}
            >
                <Stack direction={'row'} spacing={3}>
                    <Typography variant="h4">{length === weekLength ? weekHours.total : monthHours.total} hours</Typography>
                    <Typography variant="caption" component={'div'} sx={{ p: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'warning.main', backgroundColor: 'peachy.main', borderRadius: 4 }} >
                        Avg. {monthHours.avarage}h/month
                    </Typography>
                </Stack>
                <WorkHoursChart
                    length={length}
                    subtitles={subtitles}
                    workinkgHours={(length === weekLength ? weekWorkHours : monthWorkHours) || {}}
                    axisHours={length === weekLength ? weekAxisHours : monthAxisHours}
                />
            </UIPaper>
        </>
    );
};

