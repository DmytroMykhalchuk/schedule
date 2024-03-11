import Box from '@mui/material/Box';
import cn from 'classnames';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { dateMap } from '@/server/constants';
import { getUrgantTasks } from '../actions';
import { UrgentTask } from '@/server/actions/types';
import { useTranslations } from 'next-intl';

type UrgentTasksType = {
    authEmail: string;
    locale: string;
};

export const UrgentTasks: React.FC<UrgentTasksType> = async ({ authEmail, locale }) => {
    const tasks = await getUrgantTasks(authEmail);

    return (
        <Content tasks={tasks} />
    );
};

type ContentType = {
    tasks: UrgentTask[],
};

const Content: React.FC<ContentType> = ({ tasks }) => {
    const translation = useTranslations('MyTasks');

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
                            <Typography className={styles.targetDay} variant="body2">{translation(dateMap[item.dueDate])}</Typography>
                        </Stack>
                    </Box>
                ))
            }
        </>
    );
};