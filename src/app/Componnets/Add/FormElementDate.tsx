'use client'
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import ShareIcon from '@mui/icons-material/Share';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePickerToolbarProps, LocalizationProvider, PickersActionBarProps, PickersCalendarHeaderProps, PickersDayProps } from "@mui/x-date-pickers";
import uk from 'dayjs/locale/uk';
import 'dayjs/locale/uk';
import { useState } from "react";
import Button from '@mui/material/Button'
import { TextFieldProps, TextField } from "@mui/material";



dayjs.locale(uk)

type FormElementDateType = {
    defaultDueDate?: string
};

const selectCommonDay = (currentDay: Dayjs): Dayjs => {
    if (currentDay.isSame(currentDay.day(0), 'day')) {
        return currentDay.add(1, 'day');
    } else if (currentDay.isSame(currentDay.day(6), 'day')) {
        return currentDay.subtract(1, 'day');
    }
    return currentDay;
}

export const FormElementDate: React.FC<FormElementDateType> = ({ defaultDueDate }) => {
    const [date, setDate] = useState(selectCommonDay(dayjs()));
    const [hasForbiddenDate, setHasForbiddenDate] = useState({ isError: false, formattedDay: '' });

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
                setDate(selectCommonDay(selectedDay));
            return;
        }
        hasForbiddenDate.isError && setHasForbiddenDate({ isError: false, formattedDay: '' })
        setDate(selectedDay);
    };

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>Due date</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <Stack alignItems={'start'}>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
                        <MobileDatePicker
                            // defaultValue={defaultDueDate ? dayjs(defaultDueDate) : dayjs()}
                            name="due_date"
                            minDate={dayjs()}
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
            </Grid>
        </Grid>
    );
};

const CalendarActionBar: React.FC<PickersActionBarProps> = ({ onAccept, onCancel, className }) => {
    return (
        <Box className={className}>
            <Stack alignItems={'end'} p={1} width={'100%'}>
                <Stack direction={'row'} spacing={2} alignItems={'end'}>
                    <Button variant="outlined" color="warning" onClick={onCancel}
                        sx={{ textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="warning" onClick={onAccept}
                        sx={{ textTransform: 'none' }}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

const CalendarToolbar: React.FC<DatePickerToolbarProps<Dayjs>> = ({ value, className }) => {
    return (
        <Box className={className}>
            <Stack p={2}>
                <Typography variant="body1">Selected date</Typography>
                <Typography variant="h4">{value?.format('DD MMMM')}</Typography>
            </Stack>
        </Box>
    );
};
