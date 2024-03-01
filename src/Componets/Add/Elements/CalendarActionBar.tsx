import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PickersActionBarProps } from '@mui/x-date-pickers';

export const CalendarActionBar: React.FC<PickersActionBarProps> = ({ onAccept, onCancel, className }) => {
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
