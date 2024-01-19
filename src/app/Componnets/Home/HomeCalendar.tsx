import Paper from "@mui/material/Paper";
import 'react-calendar/dist/Calendar.css';
import Typography from '@mui/material/Typography'
// import Calendar from 'react-calendar';
import { LinkedDateCalendar } from "./LinkedDateCalendar";

type HomeCalendarType = {
};

export const HomeCalendar: React.FC<HomeCalendarType> = ({ }) => {
    return (
        <>
            <Paper elevation={4} sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    Calendar
                </Typography>
                <LinkedDateCalendar />
            </Paper>
        </>
    );
};