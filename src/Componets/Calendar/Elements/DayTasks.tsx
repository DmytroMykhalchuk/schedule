import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';

type DayTasksType = {
    authEmail: string;
    locale: string;
};

export const DayTasks: React.FC<DayTasksType> = ({ locale }) => {
    redirect(`/${locale}/app/add/`)
    return (
        <>
            <Typography variant="h6">Tasks</Typography>
        </>
    );
};