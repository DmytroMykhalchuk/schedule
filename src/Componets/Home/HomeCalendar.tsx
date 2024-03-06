import Paper from "@mui/material/Paper";
import 'react-calendar/dist/Calendar.css';
import Typography from '@mui/material/Typography'
import { LinkedDateCalendar } from "./LinkedDateCalendar";
import { useTranslations } from "next-intl";

type HomeCalendarType = {
    authEmail: string;
    locale: string;
};

export const HomeCalendar: React.FC<HomeCalendarType> = ({ authEmail, locale }) => {
    const translation = useTranslations('Calendar');

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="subtitle2">
                {translation('page_title')}
            </Typography>
            <LinkedDateCalendar authEmail={authEmail} locale={locale} />
        </Paper>
    );
};