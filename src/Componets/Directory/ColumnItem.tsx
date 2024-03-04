import Button from '@mui/material/Button';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import { ByDirectoryTaskRecord } from '@/server/actions/types';
import { TaskItem } from './Elements/TaskItem';

type ColumnItemType = {
    tasks?: ByDirectoryTaskRecord[];
    title: string;
    locale: string;
    createTaskLabel: string;
};

export const ColumnItem: React.FC<ColumnItemType> = ({ tasks, title, locale, createTaskLabel }) => {

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
                        <TaskItem key={task._id} task={task} locale={locale} />
                    ))
                }
            </Stack>
            <Paper elevation={0} sx={{ position: 'sticky', bottom: -1, p: 2 }}>
                <Stack alignItems={'center'} >
                    <Link href={`/${locale}/app/add/tasks`}>
                        <Button variant="outlined" color='inherit' sx={{ p: 1, textTransform: 'none', fontSize: '1.25em' }}>
                            + {createTaskLabel}
                        </Button>
                    </Link>
                </Stack>
            </Paper>
        </Paper>
    );
};