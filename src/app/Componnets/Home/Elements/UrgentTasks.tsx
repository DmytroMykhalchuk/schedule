import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { onCheck } from '../../Layouts/actions';
import cn from 'classnames';

type UrgentTasksType = {
};

export const UrgentTasks: React.FC<UrgentTasksType> = ({ }) => {
    return (
        <>
            <form action={onCheck}>
                <button className={styles.unstyledButton} type='submit'>
                    <Stack direction={'row'} spacing={1} width={'100%'}>
                        <Box
                            className={cn(styles.checkMark, true && styles.active)}
                        >
                            <span className={styles.checkMark__check}></span>
                        </Box>
                        <Typography variant="body2" textAlign={'start'} flex={1}>Finsihe something somewhere</Typography>
                        <Typography className={styles.targetDay} variant="body2">Today</Typography>
                    </Stack>
                </button>
            </form>
        </>
    );
};