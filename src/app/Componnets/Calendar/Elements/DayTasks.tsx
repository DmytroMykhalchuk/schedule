import Typography from '@mui/material/Typography'
import { redirect } from 'next/navigation';
type DayTasksType = {
};

export const DayTasks: React.FC<DayTasksType> = ({ }) => {
    redirect('/app/add/')
    return (
        <>
            <Typography variant="h6">Tasks</Typography>
        </>
    );
};