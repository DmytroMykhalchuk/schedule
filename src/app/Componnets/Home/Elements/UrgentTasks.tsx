import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import cn from 'classnames';
import { cookies } from 'next/headers';
import { ProjectActions } from '@/server/actions/ProjectActions';
import dayjs from 'dayjs';
import { getAuthParams } from '../../actions';

const dateMap = {
    [dayjs().format('DD.MM.YYYY')]: 'Today',
    [dayjs().add(1, 'day').format('DD.MM.YYYY')]: 'Tommorow',
    [dayjs().add(2, 'day').format('DD.MM.YYYY')]: 'Day after tomorrow',
};

const getUrgantTasks = async () => {
    const { projectId, sessionId } =  await getAuthParams();

    const tasks = await ProjectActions.getUrgentTasks(projectId, sessionId)
    return tasks;
}

type UrgentTasksType = {
};

export const UrgentTasks: React.FC<UrgentTasksType> = async ({ }) => {
    const tasks = await getUrgantTasks();
    return (
        <>
            {
                tasks.map((item, index) => (
                    <Box py={1} key={item._id + index}>
                        <Stack direction={'row'} spacing={1} width={'100%'}>
                            <Box
                                className={cn(styles.checkMark, true && styles.active)}
                            >
                                <span className={styles.checkMark__check}></span>
                            </Box>
                            <Typography variant="body2" textAlign={'start'} flex={1}>{item.name}</Typography>
                            <Typography className={styles.targetDay} variant="body2">{dateMap[item.dueDate]}</Typography>
                        </Stack>
                    </Box>
                ))
            }
        </>
    );
};