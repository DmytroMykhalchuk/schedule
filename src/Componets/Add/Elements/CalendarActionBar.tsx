import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PickersActionBarProps } from '@mui/x-date-pickers';

//todo remove ts-ignore
export const CalendarActionBar: React.FC<PickersActionBarProps> = ({ onAccept, onCancel, className, ...props }) => {
    //@ts-ignore
    const confirmLabel = props?.dictionary?.confirm;
    //@ts-ignore
    const cancelLabel = props?.dictionary?.cancel;
    return (
        <Box className={className}>
            <Stack alignItems={'end'} p={1} width={'100%'}>
                <Stack direction={'row'} spacing={2} alignItems={'end'}>
                    <Button variant="outlined" color="warning" onClick={onCancel}
                        sx={{ textTransform: 'none' }}
                    >
                        {cancelLabel || 'Cancel'}
                    </Button>
                    <Button variant="contained" color="warning" onClick={onAccept}
                        sx={{ textTransform: 'none' }}
                    >
                        {confirmLabel || 'Confirm'}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
