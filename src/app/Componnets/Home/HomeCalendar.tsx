import Paper from "@mui/material/Paper";

type HomeCalendarType = {
};

export const HomeCalendar: React.FC<HomeCalendarType> = ({ }) => {

    return (
        <>
            <Paper elevation={4} sx={{ p: 2 }}>Calendar</Paper>
        </>
    );
};