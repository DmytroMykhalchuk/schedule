import Box from '@mui/material/Box';
import cn from 'classnames';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { getUrgantTasks } from '../actions';
import { dateMap } from '@/server/constants';

type UrgentTasksType = {
    authEmail: string
};

export const UrgentTasks: React.FC<UrgentTasksType> = async ({ authEmail }) => {
    const tasks = await getUrgantTasks(authEmail);
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