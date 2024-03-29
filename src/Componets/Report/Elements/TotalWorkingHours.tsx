'use client';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { UIPaper } from '@/ui/UIPaper';
import { useMemo, useState } from 'react';
import { WorkHours } from '@/server/actions/types';
import { WorkHoursChart } from './WorkHoursChart';
import { weekLength, yearMonthLength } from '@/server/constants';
import { UIAvarageCaption } from '../../UI/UIAvarageCaption';

const currentDate = dayjs();

const weekAxisHours = [0, 2, 4, 6, 8];
const monthAxisHours = [0, 40, 80, 120, 160, 200];


type TotalWorkingHoursType = {
    weekWorkHours?: WorkHours;
    monthWorkHours?: WorkHours;
    translate: {
        title: string;
        hours: string;
        hoursShortLetter: string;
        week: string;
        year: string;
        avarage: string;
    };
    locale: string;
};

export const TotalWorkingHours: React.FC<TotalWorkingHoursType> = ({ weekWorkHours, monthWorkHours, translate, locale }) => {
    locale === 'uk' && dayjs.locale(uk);
    const days = Array.from({ length: weekLength }).map((_, index) => currentDate.day(index + 1).format('dd'))
    const months = Array.from({ length: yearMonthLength }).map((_, index) => currentDate.subtract(index, 'month').format('MMM')).reverse()

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

        const avarageValue = Math.round(total / count);
        return {
            total,
            avarage: isNaN(avarageValue) ? 0 : avarageValue,
        };
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

        const avarageValue = Math.round(total / count);
        return {
            total,
            avarage: isNaN(avarageValue) ? 0 : avarageValue,
        };
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
                <MenuItem value={weekLength}>{translate.week}</MenuItem>
                <MenuItem value={yearMonthLength}>{translate.year}</MenuItem>
            </Select>
        );
    };

    return (
        <UIPaper title={translate.title} titleSlot={renderSelect()} >
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Typography variant="h4">{length === weekLength ? weekHours.total : monthHours.total} {translate.hours}</Typography>
                <UIAvarageCaption
                    caption={translate.avarage.replace('value', monthHours.avarage.toString())}
                    fontColor='warning.main'
                    backgroundColor='peachy.main'
                />
            </Stack>
            <WorkHoursChart
                length={length}
                subtitles={subtitles}
                workinkgHours={(length === weekLength ? weekWorkHours : reverseKeyMonthWorkHours(monthWorkHours)) || {}}
                axisHours={length === weekLength ? weekAxisHours : monthAxisHours}
                translate={{
                    hoursLetter: translate.hoursShortLetter,
                }}
                locale={locale}
            />
        </UIPaper >
    );
};

const reverseKeyMonthWorkHours = (monthWorkHours?: WorkHours): WorkHours => {
    const transformedWorkHours = {} as WorkHours;
    if (!monthWorkHours) return transformedWorkHours;

    const throttle = Array.from({ length: 12 }).map((_, index) => dayjs().subtract(index, 'month').month() + 1);

    for (const monthPosition in monthWorkHours) {
        if (Object.prototype.hasOwnProperty.call(monthWorkHours, monthPosition)) {
            const element = monthWorkHours[monthPosition];
            transformedWorkHours[11 - throttle.indexOf(+monthPosition)] = element;
        }
    }

    return transformedWorkHours;
}
