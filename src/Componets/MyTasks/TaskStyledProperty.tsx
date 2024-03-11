import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

type TaskStyledPropertyType = {
    label: string
    colorPrimary: string
    colorSecondary: string
};

export const TaskStyledProperty: React.FC<TaskStyledPropertyType> = ({ label, colorPrimary, colorSecondary }) => {

    return (
        <Stack alignItems={'center'}>
            <Typography variant="body2"
                sx={{
                    color: colorPrimary,
                    backgroundColor: colorSecondary,
                    p: 1,
                    px:2,
                    borderRadius: 8,
                }}
                textAlign={'center'}
            >
                {label}
            </Typography>
        </Stack>
    );
};