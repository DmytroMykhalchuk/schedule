import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import { BigCalendarWrapper } from './Elements/BigCalendarWrapper';
import { CalendarType, HeaderNavigation } from './HeaderNavigation';
import { getUserSessionAndEmail } from '../actions';
import { HeaderLayout } from '../Layouts/HeaderLayout';

dayjs.locale(uk)

type CalendarLayoutType = {
    type?: CalendarType;
    date?: string;
    locale: string;
};

export const CalendarLayout: React.FC<CalendarLayoutType> = async ({ type, date, locale }) => {
    const { authEmail, session } = await getUserSessionAndEmail();

    return (
        <>
            <Box>
                <HeaderLayout
                    title="page_title"
                    pageName="Calendar"
                    subtitle={{ isNeedTranslate: false, text: dayjs().format('MMMM D, YYYY') }}
                    slot={<HeaderNavigation type={type} locale={locale} />}
                    authUser={{
                        name: session?.user?.name as string,
                        image: session?.user?.image as string,
                    }}
                />
            </Box>
            <BigCalendarWrapper type={type} date={date} authEmail={authEmail} locale={locale} />
        </>
    );
};