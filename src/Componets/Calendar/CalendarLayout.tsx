import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import { BigCalendarWrapper } from './Elements/BigCalendarWrapper';
import { CalendarType, HeaderNavigation } from './HeaderNavigation';
import { getUserSessionAndEmail } from '../actions';
import { HeaderLayout } from '../Layouts/HeaderLayout';


type CalendarLayoutType = {
    type?: CalendarType;
    date?: string;
    locale: string;
};

export const CalendarLayout: React.FC<CalendarLayoutType> = async ({ type, date, locale }) => {
    dayjs.locale(locale === 'uk' ? uk : undefined);

    const { authEmail, session } = await getUserSessionAndEmail();

    return (
        <>
            <Box>
                <div>
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
                </div>
            </Box>
            <BigCalendarWrapper type={type} date={date} authEmail={authEmail} locale={locale} />
        </>
    );
};