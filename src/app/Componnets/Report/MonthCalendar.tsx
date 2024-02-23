'use client';
import { useTheme } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

type MonthCalendarType = {
    defaultValue?: Date
};

export const MonthCalendar: React.FC<MonthCalendarType> = ({ defaultValue }) => {
    const currentDay = dayjs();
    const theme = useTheme();
    //@ts-ignore
    const colorWarning = theme?.palette?.warning.main;

    const [date, setDate] = useState(currentDay);

    const onChangeDate = (value: dayjs.Dayjs | null) => {
        value && setDate(value)
    };

    return (
        <>
            <input type="hidden" name="date" value={date.format('YYYY-MM-DD')} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    defaultValue={dayjs(defaultValue)}
                    views={['month', 'year']}
                    openTo="month"
                    maxDate={currentDay.add(1, 'month')}
                    minDate={currentDay.subtract(1, 'year')}
                    onChange={onChangeDate}
                    slotProps={{
                        textField: { size: 'small', color: 'warning', label: 'Date' },
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