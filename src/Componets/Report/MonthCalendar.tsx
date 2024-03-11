'use client';
import { useTheme } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import uk from 'dayjs/locale/uk';

type MonthCalendarType = {
    defaultValue?: Date;
    label: string;
    locale: string;
    value?: Date;
    onChange?: (date: dayjs.Dayjs) => void
};

export const MonthCalendar: React.FC<MonthCalendarType> = ({ defaultValue, label, locale, onChange, value }) => {
    locale === 'uk' && dayjs.locale(uk);

    const currentDay = dayjs();
    const theme = useTheme();
    //@ts-ignore
    const colorWarning = theme?.palette?.warning.main;

    const [date, setDate] = useState(currentDay);

    const onChangeDate = (value: dayjs.Dayjs | null) => {
        if (!value) return;
        setDate(value);
        onChange && onChange(value);
    };

    return (
        <>
            <input type="hidden" name="date" value={date.format('YYYY-MM-DD')} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                <DatePicker
                    defaultValue={dayjs(defaultValue)}
                    value={value ? dayjs(value) : undefined}
                    views={['month', 'year']}
                    openTo="month"
                    maxDate={currentDay.add(1, 'month')}
                    minDate={currentDay.subtract(1, 'year')}
                    onChange={onChangeDate}
                    slotProps={{
                        textField: { size: 'small', color: 'warning', label },
                        day: { sx: { backgroundColor: 'red' } },
                        shortcuts: { sx: { backgroundColor: 'red' } },
                        layout: {

                            sx: {
                                '.Mui-selected': {
                                    backgroundColor: `${colorWarning} !important`,
                                },
                            },
                        }
                    }}
                />
            </LocalizationProvider>
        </>
    );
};