import Divider from '@mui/material/Divider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';

type ControlPageCalendarType = {
    previousPath: string;
    nextPath: string;
    calendarType: 'week' | 'month';
    locale: string;
};

export const ControlPageCalendar: React.FC<ControlPageCalendarType> = ({ previousPath, nextPath, calendarType, locale }) => {
    return (
        <Stack direction={'row'} justifyContent={'end'}>
            <Paper className={styles.linkArrowWrapper} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Link href={`/${locale}/app/calendar/${calendarType}/${previousPath}`}><KeyboardArrowLeftIcon sx={{ fontSize: '2.5em' }} /></Link>
                <Divider flexItem orientation="vertical" variant="middle" />
                <Link href={`/${locale}/app/calendar/${calendarType}/${nextPath}`}><KeyboardArrowRightIcon sx={{ fontSize: '2.5em' }} /></Link>
            </Paper>
        </Stack>
    );
};