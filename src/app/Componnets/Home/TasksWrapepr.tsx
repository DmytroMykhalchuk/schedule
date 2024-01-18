
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography'
import { UrgentTasks } from "./Elements/UrgentTasks";

type TasksWrapeprType = {
};

export const TasksWrapepr: React.FC<TasksWrapeprType> = ({ }) => {

    return (
        <>
            <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">Urgent Tasks</Typography>
                <UrgentTasks />
            </Paper>
        </>
    );
};