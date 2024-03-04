import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePickerToolbarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export const CalendarToolbar: React.FC<DatePickerToolbarProps<Dayjs>> = ({ value, className, dictionary }) => {

    return (
        <Box className={className}>
            <Stack p={2}>
                <Typography variant="body1">{dictionary?.title || 'Selected date'}</Typography>
                <Typography variant="h4">{value?.format('DD MMMM')}</Typography>
            </Stack>
        </Box>
    );
};