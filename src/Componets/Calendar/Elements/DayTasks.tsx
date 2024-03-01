import Typography from '@mui/material/Typography'
import { redirect } from 'next/navigation';
type DayTasksType = {
    authEmail: string
};

export const DayTasks: React.FC<DayTasksType> = ({ }) => {
    redirect('/app/add/')
    return (
        <>
            <Typography variant="h6">Tasks</Typography>
        </>
    );
};