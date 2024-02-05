import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AdjustIcon from '@mui/icons-material/Adjust';
import Typography from '@mui/material/Typography'
import { TaskStyledProperty } from './TaskStyledProperty';
import Link from 'next/link';



type TaskRowItemType = {
    taskId: string
    name: string
    datePoint: {
        label: string,
        color: string
    },
    status: {
        label: string
        primaryColor: string
        secondaryColor: string
    },
    priority: {
        label: string
        primaryColor: string
        secondaryColor: string
    }
};

export const TaskRowItem: React.FC<TaskRowItemType> = ({ taskId, name, status, datePoint, priority }) => {
    return (
        <Grid container spacing={1} pr={2}>
            <Grid item xs={3}>
                <Link href={taskId}>
                    <Stack direction={'row'} spacing={1}>
                        <AdjustIcon />
                        <Typography variant="body1">{name}</Typography>
                    </Stack>
                </Link>
            </Grid>
            <Grid item xs={2}>
                <TaskStyledProperty colorPrimary={datePoint.color} colorSecondary='' label={datePoint.label} />
            </Grid>
            <Grid item xs={2}>
                <TaskStyledProperty colorPrimary={status.primaryColor} colorSecondary={status.secondaryColor} label={status.label} />
            </Grid>
            <Grid item xs={2}>
                <TaskStyledProperty colorPrimary={priority?.primaryColor} colorSecondary={priority?.secondaryColor} label={priority?.label} />
            </Grid>
            <Grid item xs={3}>
                <Stack direction={'row'}>
                    <Typography variant="body2" flex={1}></Typography>
                    <span>todo avatars</span>
                </Stack>
            </Grid>
        </Grid>
    );
};