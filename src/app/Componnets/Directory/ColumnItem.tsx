import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ByDirectoryTaskRecord } from '@/server/actions/types';
import { TaskItem } from './Elements/TaskItem';
import styles from './styles.module.scss';
import Button from '@mui/material/Button'
import Link from 'next/link';

type ColumnItemType = {
    tasks?: ByDirectoryTaskRecord[],
    title: string
};

export const ColumnItem: React.FC<ColumnItemType> = ({ tasks, title }) => {

    return (
        <Paper
            className={styles.paperOverflow}
            elevation={2}
            sx={{
                p: 2,
                borderRadius: 4,
                pb: 0,
            }}
        >
            <Typography variant="h5" mb={2}>{title}</Typography>
            <Stack spacing={2}>
                {
                    tasks && tasks.map(task => (
                        <TaskItem key={task._id} task={task} />
                    ))
                }
            </Stack>
            <Paper elevation={0} sx={{ position: 'sticky', bottom: -1, p: 2 }}>
                <Stack alignItems={'center'} >
                    <Link href='/app/add/tasks'>
                    <Button variant="outlined" color='inherit' sx={{ p: 1, textTransform: 'none',fontSize:'1.25em' }}>
                        + Add task
                    </Button>
                    </Link>
                </Stack>
            </Paper>
        </Paper>
    );
};