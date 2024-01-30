import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UrgentTasks } from './Elements/UrgentTasks';

type TasksWrapeprType = {
};

export const TasksWrapepr: React.FC<TasksWrapeprType> = ({ }) => {

    return (
        <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
            <Link href={'/app/calendar/urgent-tasks'}>
                <Stack direction={'row'}>
                    <Typography variant="h6" fontWeight={600} flex={1}>Urgent Tasks</Typography>
                    <ArrowForwardIosIcon />
                </Stack>
            </Link>
            <UrgentTasks />
        </Paper>
    );
};