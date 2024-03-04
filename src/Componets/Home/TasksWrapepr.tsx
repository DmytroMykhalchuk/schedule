import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UrgentTasks } from './Elements/UrgentTasks';
import { useTranslations } from 'next-intl';

type TasksWrapeprType = {
    authEmail: string;
    locale: string;
};

export const TasksWrapepr: React.FC<TasksWrapeprType> = ({ authEmail, locale }) => {
    const translation = useTranslations('AppHome');

    return (
        <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
            <div>
                <Link href={'/app/my-tasks'}>
                    <Stack direction={'row'}>
                        <Typography variant="h6" fontWeight={600} flex={1}>{translation('urgent_tasks')}</Typography>
                        <ArrowForwardIosIcon />
                    </Stack>
                </Link>
                <div>
                    <UrgentTasks authEmail={authEmail} locale={locale} />
                </div>
            </div>
        </Paper>
    );
};