import AdjustIcon from '@mui/icons-material/Adjust';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { TaskStyledProperty } from './TaskStyledProperty';


type TaskRowItemType = {
    url: string
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

export const TaskRowItem: React.FC<TaskRowItemType> = ({ url, name, status, datePoint, priority }) => {
    return (
        <Grid container spacing={1} pr={2} columns={9}>
            <Grid item xs={3} sx={{overflow:'hidden'}}>
                <Link className={styles.truncate} href={url} style={{flex:1}}>
                    <Stack direction={'row'} spacing={1} flex={1}className={styles.elipsis_1}>
                        <AdjustIcon />
                        <Typography className={styles.elipsis_1}  variant="body1" >{name}</Typography>
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
            {/* <Grid item xs={3}>
                <Stack direction={'row'}>
                    <Typography variant="body2" flex={1}></Typography>
                    <span>avatars</span>
                </Stack>
            </Grid> */}
        </Grid>
    );
};

//todo-soon multiple attachment