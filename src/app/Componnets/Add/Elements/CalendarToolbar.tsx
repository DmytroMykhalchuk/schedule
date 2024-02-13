import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePickerToolbarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export const CalendarToolbar: React.FC<DatePickerToolbarProps<Dayjs>> = ({ value, className }) => {
    return (
        <Box className={className}>
            <Stack p={2}>
                <Typography variant="body1">Selected date</Typography>
                <Typography variant="h4">{value?.format('DD MMMM')}</Typography>
            </Stack>
        </Box>
    );
};